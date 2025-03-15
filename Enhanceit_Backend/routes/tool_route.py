from fastapi import APIRouter, Query, Depends, HTTPException
from models.tool_model import Tool, ToolSlug
from config.database import tool_collection
from schema.tool_schema import list_serial, individual_serial
from rembg import remove
from fastapi import UploadFile, File
from PIL import Image, ImageFilter, ImageFile
from fastapi.responses import Response
import utils.tools as tools
import torch
import cv2
import numpy as np
from sklearn.cluster import KMeans
from RealESRGAN import RealESRGAN
import facer
import torchvision.transforms as transforms
from config.database import user_collection
from models.auth_model import User
from routes.auth_route import get_current_user
from bson import ObjectId
from models.payment_model import SubscriptionPlan
from models.tool_model import FAQs

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Paths to load the model
PROTOTXT = "train_model/colorization_deploy_v2.prototxt"
POINTS = "train_model/pts_in_hull.npy"
MODEL = "train_model/colorization_release_v2.caffemodel"

router = APIRouter(prefix="/api/tools", tags=["tools"])

@router.get("/")
async def get_all_tools():
    tools = tool_collection.find()
    return list_serial(tools)

@router.get("/{slug}")
async def get_tool_by_slug(slug: str):
    tool = tool_collection.find_one({"slug": slug})
    return individual_serial(tool)

@router.post("/")
async def create_tool(tool: Tool):
    tool_dict = dict(tool)
    exist_tool = tool_collection.find_one({"title": tool_dict["title"]})
    if exist_tool:
        return {"message": "Tool already exists"}
    tool_dict["faqs"] = [dict(faqs) for faqs in tool_dict["faqs"]]
    tool_collection.insert_one(tool_dict)
    return {"message": "Tool created successfully"}

@router.put("/{slug}")
async def update_tool(slug: str, tool: Tool):
    tool_dict = dict(tool)
    tool_dict["faqs"] = [dict(faqs) for faqs in tool_dict["faqs"]]
    tool_collection.find_one_and_update({"slug": slug}, {"$set": tool_dict})
    return {"message": "Tool updated successfully"}

@router.delete("/{slug}")
async def delete_tool(slug: str):
    tool_collection.find_one_and_delete({"slug": slug})
    return {"message": "Tool deleted successfully"}

@router.post("/{tool_slug}/faqs")
async def add_faq(tool_slug: str, faq: FAQs):
    result = tool_collection.update_one(
        {"slug": tool_slug},
        {"$push": {"faqs": dict(faq)}}  # Thêm FAQ vào mảng
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Tool not found")

    return {"message": "FAQ added successfully!"}

@router.put("/tools/{tool_slug}/faqs")
async def update_faq(tool_slug: str, old_faq: FAQs, new_faq: FAQs):
    result = tool_collection.update_one(
        {
            "slug": tool_slug,
            "faqs": {"$elemMatch": {"question": old_faq.question, "answer": old_faq.answer}}
        },
        {
            "$set": {
                "faqs.$.question": new_faq.question,
                "faqs.$.answer": new_faq.answer
            }
        }
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="FAQ not found or tool does not exist.")

    return {"message": "FAQ updated successfully!"}

@router.delete("/{tool_slug}/faqs")
async def delete_faq(tool_slug: str, faq: FAQs):
    result = tool_collection.update_one(
        {"slug": tool_slug},
        {"$pull": {"faqs": dict(faq)}}  # Xóa FAQ khớp cả question & answer
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="FAQ not found or already tool does not exist")

    return {"message": "FAQ deleted successfully"}

@router.post("/process-image")
async def process_image(
    file: UploadFile = File(...), 
    slug: ToolSlug = Query(...), 
    current_user: User = Depends(get_current_user)
):
    if current_user.get("subscription_plan") != SubscriptionPlan.premium:
        current_credits = current_user.get("credits")
        if current_credits <= 0:
            raise HTTPException(status_code=400, detail="Not enough credits")
        user_collection.update_one({"_id": ObjectId(current_user.get("id"))}, {"$set": {"credits": current_credits - 1}})

    image = await tools.get_image(file)

    if (slug == ToolSlug.BACKGROUND_REMOVER):
        result = await remove_background(image)
    elif (slug == ToolSlug.IMAGE_COLORIZATION):
        result = await colorize_image(image)
    elif (slug == ToolSlug.CARTOONIZE):
        result = await cartoonize_image(image)
    elif (slug == ToolSlug.GRAYSCALE):
        result = await gray_scale(image)
    elif (slug == ToolSlug.FACE_RETOUCHING):
        result = await face_retouching(image)
    elif (slug == ToolSlug.IMAGE_BRIGHTENER):
        result = await enhance_light(image)
    elif (slug == ToolSlug.IMAGE_UPSCALER):
        result = await upscale_image(image)
    elif (slug == ToolSlug.IMAGE_DENOISER):
        result = await denoise_image(image)
    elif (slug == ToolSlug.BLUR_BACKGROUND):
        result = await blur_background(image)
    else:
        result = None

    if result is None:
        raise HTTPException(status_code=400, detail="Invalid tool slug")

    return Response(content=result, media_type="image/png")

async def remove_background(image: ImageFile):
    removed_image = remove(image)
    return tools.return_image(removed_image)

async def colorize_image(image: ImageFile):
    net = cv2.dnn.readNetFromCaffe(PROTOTXT, MODEL)
    pts = np.load(POINTS)

    # Load centers for ab channel quantization used for rebalancing.
    class8 = net.getLayerId("class8_ab")
    conv8 = net.getLayerId("conv8_313_rh")
    pts = pts.transpose().reshape(2, 313, 1, 1)
    net.getLayer(class8).blobs = [pts.astype("float32")]
    net.getLayer(conv8).blobs = [np.full([1, 313], 2.606, dtype="float32")]

    image = tools.convert_from_pil_to_cv2(image)
    
    scaled = image.astype("float32") / 255.0
    lab = cv2.cvtColor(scaled, cv2.COLOR_BGR2LAB)

    resized = cv2.resize(lab, (224, 224))
    L = cv2.split(resized)[0]
    L -= 50

    net.setInput(cv2.dnn.blobFromImage(L))
    ab = net.forward()[0, :, :, :].transpose((1, 2, 0))

    ab = cv2.resize(ab, (image.shape[1], image.shape[0]))

    L = cv2.split(lab)[0]
    colorized = np.concatenate((L[:, :, np.newaxis], ab), axis=2)

    colorized = cv2.cvtColor(colorized, cv2.COLOR_LAB2BGR)
    colorized = np.clip(colorized, 0, 1)

    colorized = (255 * colorized).astype("uint8")
    colorized = tools.convert_from_cv2_to_pil(colorized)

    return tools.return_image(colorized)

async def cartoonize_image(image: ImageFile):
    image = tools.convert_from_pil_to_cv2(image)

    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Apply cartoon effect
    gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    gray = cv2.medianBlur(gray, 7)
    outlines = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 7, 7)

    k = 7
    data = image.reshape(-1, 3)

    kmeans = KMeans(n_clusters=k, random_state=42).fit(data)
    img_reduced = kmeans.cluster_centers_[kmeans.labels_]
    img_reduced = img_reduced.reshape(image.shape)
    img_reduced = img_reduced.astype(np.uint8)

    color = cv2.bilateralFilter(img_reduced, 7, 200, 200)
    cartoon = cv2.bitwise_and(color, color, mask=outlines)
    cartoon = cv2.cvtColor(cartoon, cv2.COLOR_RGB2BGR)

    cartoon = tools.convert_from_cv2_to_pil(cartoon)

    return tools.return_image(cartoon)

async def denoise_image(image: ImageFile):
    image = tools.convert_from_pil_to_cv2(image)
    meadian_blur = cv2.medianBlur(image, 5)
    denoised_img = tools.convert_from_cv2_to_pil(meadian_blur)

    return tools.return_image(denoised_img)

async def upscale_image(image: ImageFile):
    image = image.convert("RGB")
    
    model = RealESRGAN(device, scale=4)
    model.load_weights('train_model/RealESRGAN_x4.pth')

    sr_image = model.predict(image)

    return tools.return_image(sr_image)

async def gray_scale(image: ImageFile):
    image = tools.convert_from_pil_to_cv2(image)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray_image = tools.convert_from_cv2_to_pil(gray_image)

    return tools.return_image(gray_image)

async def face_retouching(image: ImageFile):
    image = image.convert("RGB")
    img_array = np.array(image)
    
    # Chuyển đổi NumPy array thành torch.Tensor (định dạng uint8)
    image_tensor = torch.tensor(img_array, dtype=torch.uint8)

    # Chuyển đổi tensor sang định dạng mà facer yêu cầu
    image = facer.hwc2bchw(image_tensor).to(device=device)

    # Phát hiện khuôn mặt
    face_detector = facer.face_detector("retinaface/mobilenet", device=device)
    with torch.inference_mode():
        faces = face_detector(image)

    # Phân vùng khuôn mặt
    face_parser = facer.face_parser("farl/lapa/448", device=device)
    with torch.inference_mode():
        faces = face_parser(image, faces)

    # Chuyển đổi tensor thành NumPy array (đưa về CPU trước khi dùng numpy)
    nose_array = faces["seg"]["logits"][0][6].cpu().numpy()
    nose_array = np.where(nose_array > 0, 1, 0)

    face_array = faces["seg"]["logits"][0][1].cpu().numpy()
    face_array = np.where(face_array > 0, 1, 0)

    # Kết hợp mặt và mũi thành một mask duy nhất
    face_array = np.clip(face_array + nose_array, 0, 1)

    # Làm mịn vùng mặt bằng bộ lọc Bilateral
    smooth_img = cv2.bilateralFilter(img_array, 30, 75, 75)

    # Giữ nguyên vùng không phải khuôn mặt
    smooth_img[face_array == 0] = img_array[face_array == 0]

    # Chuyển đổi smooth_img sang PIL Image
    smooth_img = Image.fromarray(smooth_img)

    return tools.return_image(smooth_img)

async def blur_background(image: ImageFile):
    removed_background_image = remove(image)
    blurred_image = image.filter(ImageFilter.GaussianBlur(10))
    blurred_image.paste(removed_background_image, (0, 0), removed_background_image)

    return tools.return_image(blurred_image)

async def enhance_light(image: ImageFile):
    model = torch.jit.load("train_model/vgg16_enlightengan.pt", map_location=device)
    model.eval()
    
    transform = transforms.Compose([
        transforms.ToTensor(),
    ])
    image_tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        features = model(image_tensor)

    # Chuyển đổi lại về ảnh sáng hơn
    alpha = 0.5
    enhanced_tensor = torch.clamp(image_tensor + alpha * features.mean(), 0, 1)
    enhanced_image = transforms.ToPILImage()(enhanced_tensor.squeeze(0).cpu())

    return tools.return_image(enhanced_image)