import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './App.css';

import OnBoardingPage from './login/OnBoardPage';
import SignupRoleSelection from './login/SignupRoleSelection';
import LoginRoleSelection from './login/LoginRoleSelection';
import OnBoarding from './login/On_Boarding';
import SignIn from './login/Sign_In';
import SignUp from './login/Sign_Up'
import ForgotPass from './login/Forgot_Pass';
import AgeSelection from './login/Age_Selection';
import Home from './pages/DialectChoicesPage';
import HomeStandby from './pages/ContentStandbyPage';
import GameOne from './content/Game_One';
import GameTwo from './content/Game_Two';
import ContentFour from './content/Content_Four';
import AnimalCategory from './category/Animals';
import FoodCategory from './category/Foods';
import HouseholdItems from './category/HouseholdItems';
import BasicPhrases from './category/BasicPhrases';
import ProfilePage from './pages/Profile';
import ProgressPage from './pages/Progress';
import Video from './content/BasicVid';
import AdminHomePage from './dialecto_admin/AdminHome';
import AdminUserPage from './dialecto_admin/AdminUser';
import AdminLogin from './dialecto_admin/AdminLogin';
import AdminSignup from './dialecto_admin/AdminSignup';
import LeaderBoard from './pages/LeaderBoardPage';
import LandingPage from './landing_page/landingPage';
import ContentInteractivePage from './pages/ContentInteractivePage';
import WordShooter from './content/WordShooter';
import FallingTextGame from './content/WordScramble';
import SpeechGame from './content/SpeechGame';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dialecto/onboarding" element={<OnBoarding />} />
        <Route path="/dialecto/signup-role-select" element={<SignupRoleSelection />} />
        <Route path="/dialecto/login-role-select" element={<LoginRoleSelection />} />
        <Route path="/dialecto/sign-in" element={<SignIn />} />
        <Route path="/dialecto/sign-up" element={<SignUp />} />
        <Route path="/dialecto/forgot-pass" element={<ForgotPass />} />
        <Route path="/dialecto/age-selection" element={<AgeSelection />} />
        <Route path="/dialecto/home" element={<Home />} />
        <Route path="/dialecto/home-standby" element={<HomeStandby />} />
        <Route path="/dialecto/game-one" element={<GameOne />} />
        <Route path="/dialecto/game-two" element={<GameTwo />} />
        <Route path="/dialecto/content-four" element={<ContentFour />} />
        <Route path="/dialecto/animal-category" element={<AnimalCategory />} />
        <Route path="/dialecto/food-category" element={<FoodCategory />} />
        <Route path="/dialecto/household-item-category" element={<HouseholdItems />} />
        <Route path="/dialecto/basic-phrases-category" element={<BasicPhrases />} />
        <Route path="/dialecto/profile-page" element={<ProfilePage />} />
        <Route path="/dialecto/progress-page" element={<ProgressPage />} />
        <Route path="/dialecto/leaderboard" element={<LeaderBoard />} />
        <Route path="/dialecto/interactive-page" element={<ContentInteractivePage />} />
        <Route path="/dialecto/word-shooter" element={<WordShooter />} />
        <Route path="/dialecto/word-scramble" element={<FallingTextGame />} />
        <Route path="/dialecto/speech-game" element={<SpeechGame />} />
        <Route path="/dialecto/video" element={<Video />} />
        <Route path="/dialecto/admin-login" element={<AdminLogin />} />
        <Route path="/dialecto/admin-signup" element={<AdminSignup />} />
        <Route path="/dialecto/admin-dashboard" element={<AdminHomePage />} />
        <Route path="/dialecto/admin/students" element={<AdminUserPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);