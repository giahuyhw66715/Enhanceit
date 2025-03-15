import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/MainLayout";
import ToolPage from "./pages/ToolPage";
import ToolDetailPage from "./pages/ToolDetailPage";
import AdminLayout from "./layout/AdminLayout";
import AdminPage from "./pages/AdminPage";
import AdminToolPage from "./pages/AdminToolPage";
import AdminAddToolPage from "./pages/AdminAddToolPage";
import AdminTagPage from "./pages/AdminTagPage";
import AdminAddTagPage from "./pages/AdminAddTagPage";
import AdminAddPhotoPage from "./pages/AdminAddPhotoPage";
import AdminPhotoPage from "./pages/AdminPhotoPage";
import PhotoPage from "./pages/PhotoPage";
import PhotoDetailPage from "./pages/PhotoDetailPage";
import AdminEditTagPage from "./pages/AdminEditTagPage";
import AdminEditPhotoPage from "./pages/AdminEditPhotoPage";
import AdminEditToolPage from "./pages/AdminEditToolPage";
import AuthLayout from "./layout/AuthLayout";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import PricingPage from "./pages/PricingPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import AdminAddFAQsPage from "./pages/AdminAddFAQsPage";
import AdminFAQsPage from "./pages/AdminFAQsPage";
import AdminUserPage from "./pages/AdminUserPage";
import AdminAddUserPage from "./pages/AdminAddUserPage";
import AdminEditUserPage from "./pages/AdminEditUserPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/photos" element={<PhotoPage />} />
                <Route path="/photos/:id" element={<PhotoDetailPage />} />
                <Route path="/tools" element={<ToolPage />} />
                <Route path="/tools/:slug" element={<ToolDetailPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/profile" element={<UpdateProfilePage />} />
                <Route
                    path="/payment/success"
                    element={<PaymentSuccessPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="/management" element={<AdminLayout />}>
                <Route index element={<AdminPage />} />
                <Route path="/management/tools" element={<AdminToolPage />} />
                <Route
                    path="/management/tools/add"
                    element={<AdminAddToolPage />}
                />
                <Route
                    path="/management/tools/edit/:slug"
                    element={<AdminEditToolPage />}
                />
                <Route path="/management/tags" element={<AdminTagPage />} />
                <Route
                    path="/management/tags/add"
                    element={<AdminAddTagPage />}
                />
                <Route
                    path="/management/tags/edit/:slug"
                    element={<AdminEditTagPage />}
                />
                <Route path="/management/users" element={<AdminUserPage />} />
                <Route
                    path="/management/users/add"
                    element={<AdminAddUserPage />}
                />
                <Route
                    path="/management/users/edit/:id"
                    element={<AdminEditUserPage />}
                />
                <Route path="/management/photos" element={<AdminPhotoPage />} />
                <Route
                    path="/management/photos/add"
                    element={<AdminAddPhotoPage />}
                />
                <Route
                    path="/management/photos/edit/:id"
                    element={<AdminEditPhotoPage />}
                />
                <Route path="/management/faqs" element={<AdminFAQsPage />} />
                <Route
                    path="/management/faqs/edit/:id"
                    element={<AdminFAQsPage />}
                />
                <Route
                    path="/management/faqs/add"
                    element={<AdminAddFAQsPage />}
                />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
                <Route path="/auth/login" element={<SigninPage />} />
                <Route path="/auth/register" element={<SignupPage />} />
            </Route>
        </Routes>
    );
};

export default App;
