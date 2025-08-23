import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashBoardLayout from "./Layouts/DashBoardLayout";
import MenuManagement from "./pages/MenuManagment";
import Subscriptions from "./pages/Subscriptions";
import AddOnsPage from "./pages/AddOnsPage";
import ProfilePage from "./pages/ProfilePage";
import OfferBannerPage from "./pages/OfferBannerPage";
import FaqsPage from "./pages/FaqsPage";
import CustomersPage from "./pages/CustomersPage";
import RequireAuth from "./Layouts/RequireAuth";
import LoginPage from "./components/auth/Login";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Protected */}
            <Route element={<RequireAuth />}>
                <Route path="/" element={<DashBoardLayout />}>
                    <Route index element={<OfferBannerPage />} />
                    <Route path="subscriptions" element={<Subscriptions />} />
                    <Route path="addons" element={<AddOnsPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="faqs" element={<FaqsPage />} />
                    <Route path="customers" element={<CustomersPage />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
