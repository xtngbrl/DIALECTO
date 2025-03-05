import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";

import HamburgerMenu from './shared/Hamburger';
import SwitchButton from './shared/SwitchBtn';
import FilterIcon from './shared/Filter';
import SearchIcon from './shared/Search';
import Button from './shared/Btn';
import IconButton from './shared/IconBtn';
import CategoriesButton from './shared/CategoriesBtn';
import ProfileIcon from '../assets/profile.png';
import ProgressIcon from '../assets/progress.png';
import Swal from "sweetalert2";
import check from '../assets/check.png'
import axiosInstance from '../../axiosInstance';

import './components.css';

function Header ({ showCategoriesButton, showSwitchButton, bgColor }) {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef();
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setSidebarOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    const closeSidebar = () => {
      setSidebarOpen(false);
    };
  
    const handleLogout = async () => {
      // e.preventDefault();
      Swal.fire({
        title: "Log Out!",
        text: "Do you really want to log out?",
        showCancelButton: true,
        icon: "warning",
        background: "#F4E8DD",
        confirmButtonColor: "#f0a438",
        cancelButtonColor: "#b85d1d",
        cancelTextColor: "#f4e8dd",
        confirmButtonText: "Yes",
        customClass: {
          container: "custom-container",
          confirmButton: "custom-confirm-button",
          cancelButton: "custom-cancel-button",
          title: "custom-swal-title",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axiosInstance.post("/logout");
              logout();
            Swal.fire({
              title: "Logged Out!",
              text: "You have been logged out successfully.",
              imageUrl: check,
              imageWidth: 100,
              imageHeight: 100,
              confirmButtonText: "OK",
              background: "#F4E8DD",
              confirmButtonColor: "#f0a438",
              customClass: {
                confirmButton: "custom-success-confirm-button",
                title: "custom-swal-title",
              },
            }).then(() => {
              navigate("/dialecto/onboarding");
            });
          } catch (error) { console.error("Logout failed:", error);
           Swal.fire({
            title: "Logout Failed",
            text: "There was an error logging out.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#EC221F",
          });
        }}
      });
    };

    return (
      <div className='header-container' style={{backgroundColor: bgColor}}>
        <HamburgerMenu onClick={toggleSidebar} />
  
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
          <button className="close-btn" onClick={closeSidebar}>
            <IoClose />
          </button>
          
          <div className='sidebar-nav'>
            <IconButton 
              imageUrl={ProfileIcon} 
              label="Profile" 
              bgColor="var(--primary-color)" 
              navigateTo={() => navigate('/dialecto/profile-page')} 
            />
            <IconButton 
              imageUrl={ProgressIcon} 
              label="Progress" 
              bgColor="var(--primary-color)" 
              navigateTo={() => navigate('/dialecto/progress-page')} 
            /> 
          </div>
          
            <Button label='Log out' onClick={handleLogout} outline={false} bgColor='var(--secondary-color)' width='230px' />
        </div>
  
        <div className='right-container'>
          {showCategoriesButton && <CategoriesButton />}
          {showSwitchButton && <SwitchButton />}
          <FilterIcon />
          <SearchIcon />
        </div>
      </div>
    );
  }
  
  export default Header;
  