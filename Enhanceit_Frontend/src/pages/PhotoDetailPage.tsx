import { Container } from "@mui/material";
import Image from "../components/common/Image";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPhotoById, getRelatedPhotos } from "../lib/actions/photos";
import Loading from "../components/common/Loading";
import Spacer from "../components/common/Spacer";
import Heading from "../components/common/Heading";
import CustomImageList from "../components/common/CustomImageList";
import PhotoMeta from "../components/photos/PhotoMeta";
import NotFoundPage from "./NotFoundPage";

const PhotoDetailPage = () => {
    const { id } = useParams();

    const {
        data: photo,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["photo", id],
        queryFn: () => getPhotoById(id!),
    });

    const { data: similarPhotos, isLoading: isSimilarPhotosLoading } = useQuery(
        {
            queryKey: ["similar-photos", id],
            queryFn: () => getRelatedPhotos(id!),
        }
    );

    if (isLoading || isSimilarPhotosLoading) return <Loading />;
    if (!photo || !similarPhotos) return;
    if (isError) return <NotFoundPage />;

    return (
        <>
            <Container maxWidth="md">
                <Spacer y={3} />
                <Image src={photo.url} alt={photo.title} />
                <Spacer y={3} />
                <PhotoMeta photo={photo} />
            </Container>
            <Spacer y={10} />
            <Container maxWidth="xl">
                <Heading title="Similar Photos" />
                <Spacer y={10} />
                <CustomImageList photos={similarPhotos} width={161} />
            </Container>
        </>
    );
};

export default PhotoDetailPage;
