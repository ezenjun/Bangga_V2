import * as React from "react";
import { Routes, Route} from "react-router-dom";
import './App.css'
import 'antd/dist/antd.min.css';
// Overall Routes
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginSignupPage from "./pages/SocialLogin/LoginSignupPage";
import Kakao from "./pages/SocialLogin/kakao";
import Google from "./pages/SocialLogin/google";
import DashboardLayout from "./pages/DashBoardPage/Layout/DashboardLayout";

// Nested Routes

import Main from "./pages/DashBoardPage/Main/Main"
import ManageReservartion from "./pages/DashBoardPage/ManageReservation/ManageReservartion";
import ReservationDetail from "./pages/DashBoardPage/ManageReservation/ReservationDetail";
import Customer from "./pages/DashBoardPage/Customer/Customer";
import SpaceManagement from "./pages/DashBoardPage/SpaceManagement/SpaceManagement";
import SpaceDetail from "./pages/DashBoardPage/SpaceManagement/SpaceDetail"
import Analytics from "./pages/DashBoardPage/Analytics/Analytics";
// import SpaceList from './assets/JSON/SpaceList.json'

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="login" element={<LoginSignupPage />}/>
                <Route path="auth2/kakao" element={<Kakao />} />
                <Route path="login/google" element={<Google />} />
                <Route path="dashboard" element={<DashboardLayout />}>
                    <Route path='' element={<Main />} />
                    <Route path='manage_rsv' element={<ManageReservartion />}/>
                    <Route path="manage_rsv/:id" element={<ReservationDetail />}/>
                    <Route path='customer' element={<Customer />} />
                    <Route path='analytics' element={<Analytics />} />
                    <Route path='spacemanagement' element={<SpaceManagement />} />
                    <Route path='spacemanagement/:id' element={<SpaceDetail/>} />
                </Route>
            </Routes>
        </div>
    )
}

export default App