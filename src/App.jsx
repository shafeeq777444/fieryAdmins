import { Route, Routes } from "react-router-dom";
import "./App.css";
// import WeeklyMenuManager from "./pages/WeeklyMenus";
import DashBoardLayout from "./Layouts/DashBoardLayout";
import MenuManagement from "./pages/MenuManagment";
import Subscriptions from "./pages/Subscriptions";
import AddOnsPage from "./pages/AddOnsPage";


function App() {
    return (
        <>
       
                <Routes>
                    <Route path="/" element={<DashBoardLayout/>}>
                        {/* <Routes index element={<Home />} /> */}
                        {/* <Route path="/weeklymenu" element={<WeeklyMenuManager />} /> */}
                        <Route path="/menu" element={<MenuManagement />} />
                        <Route path="/subscriptions" element={<Subscriptions/>}/>
                        <Route path="/addons" element={<AddOnsPage/>}/>
                    </Route>
                </Routes>
           
        </>
    );
}

export default App;
