import { Route, Routes } from "react-router-dom";
import "./App.css";
// import WeeklyMenuManager from "./pages/WeeklyMenus";
import DashBoardLayout from "./Layouts/DashBoardLayout";
import MenuManagement from "./pages/MenuManagment";
import Subscriptions from "./pages/Subscriptions";
import AddOnsPage from "./pages/AddOnsPage";
import ProfilePage from "./pages/ProfilePage";
import OfferBannerPage from "./pages/OfferBannerPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<DashBoardLayout />}>
                    {/* <Routes index element={<Home />} /> */}
                    {/* <Route path="/weeklymenu" element={<WeeklyMenuManager />} /> */}
                    {/* <Route index element={<MenuManagement />} /> */}
                    {/* <Route path="/menu" element={<MenuManagement />} /> */}

                    <Route index element={<OfferBannerPage />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/addons" element={<AddOnsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
