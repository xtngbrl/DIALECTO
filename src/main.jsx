import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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

const router = createBrowserRouter([
  {
    path: '/dialecto/',
    element: <OnBoardingPage />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/dialecto/onboarding',
    element: <OnBoarding />,
  },
  {
    path: '/dialecto/signup-role-select',
    element: <SignupRoleSelection />,
  },
  {
    path: '/dialecto/login-role-select',
    element: <LoginRoleSelection />,
  },
  {
    path: '/dialecto/sign-in',
    element: <SignIn />
  },
  {
    path: '/dialecto/sign-up',
    element: <SignUp />
  },
  {
    path: '/dialecto/forgot-pass',
    element: <ForgotPass />
  },
  {
    path: '/dialecto/age-selection',
    element: <AgeSelection />
  },
  {
    path: '/dialecto/home',
    element: <Home />
  },
  {
    path: '/dialecto/home-standby',
    element: <HomeStandby />
  },
  {
    path: '/dialecto/game-one',
    element: <GameOne />
  },
  {
    path: '/dialecto/content-four',
    element: <ContentFour />
  },
  {
    path: '/dialecto/animal-category',
    element: <AnimalCategory />
  },
  {
    path: '/dialecto/food-category',
    element: <FoodCategory />
  },
  {
    path: '/dialecto/household-item-category',
    element: <HouseholdItems />
  },
  {
    path: '/dialecto/basic-phrases-category',
    element: <BasicPhrases />
  },
  {
    path: '/dialecto/profile-page',
    element: <ProfilePage />
  },
  {
    path: '/dialecto/progress-page',
    element: <ProgressPage />
  },
  {
    path: '/dialecto/video',
    element: <Video />
  },
  {
    path: '/dialecto/admin-login',
    element: <AdminLogin />
  },
  {
    path: '/dialecto/admin-signup',
    element: <AdminSignup />
  },
  {
    path: '/dialecto/admin-dashboard',
    element: <AdminHomePage />
  },
  {
    path: '/dialecto/admin-user',
    element: <AdminUserPage />
  },
  {
    path: '*',
    element: <div>404 Not Found</div>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);