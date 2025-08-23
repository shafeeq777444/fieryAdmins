import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/LeftSideBar";

const DashBoardLayout = () => {
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-gray-100 md:p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default DashBoardLayout;
