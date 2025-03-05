import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import AdminLogo from '../assets/ImageLogo.png';
import Swal from 'sweetalert2';
import axiosInstance from '../../axiosInstance';
import { useNavigate, useLocation } from 'react-router-dom';
import './admin.css';
import { MdDashboard } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

const Admin_Header = ({ onClick }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


        const handleLogout = () => {
          Swal.fire({
              title: "Log Out!",
              text: "Do you really want to log out?",
              showCancelButton: true,
              icon: "warning",
              background: "#F4E8DD",
              confirmButtonColor: "#f0a438",
              cancelButtonColor: "#b85d1d",
              confirmButtonText: "Yes",
              customClass: {
                  container: "custom-container",
                  confirmButton: "custom-confirm-button",
                  cancelButton: "custom-cancel-button",
                  title: "custom-swal-title",
              },
          }).then((result) => {
              if (result.isConfirmed) {
                  Swal.fire({
                      title: "Logged Out!",
                      text: "You have been logged out successfully.",
                      icon: "success",
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
              }
          });
      };

    // const handleLogout = async () => {
    //     Swal.fire({
    //         title: "Log Out!",
    //         text: "Do you really want to log out?",
    //         showCancelButton: true,
    //         icon: "warning",
    //         background: "#F4E8DD",
    //         confirmButtonColor: "#f0a438",
    //         cancelButtonColor: "#b85d1d",
    //         cancelButtonText: "Cancel",
    //         confirmButtonText: "Yes",
    //         customClass: {
    //             container: "custom-container",
    //             confirmButton: "custom-confirm-button",
    //             cancelButton: "custom-cancel-button",
    //             title: "custom-swal-title",
    //         },
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             try {
    //                 await axiosInstance.post("/logout");
    //                 Swal.fire({
    //                     title: "Logged Out!",
    //                     text: "You have been logged out successfully.",
    //                     icon: "success",
    //                     confirmButtonText: "OK",
    //                     background: "#F4E8DD",
    //                     confirmButtonColor: "#f0a438",
    //                     customClass: {
    //                         confirmButton: "custom-success-confirm-button",
    //                         title: "custom-swal-title",
    //                     },
    //                 }).then(() => {
    //                     navigate("/dialecto/onboarding");
    //                 });
    //             } catch (error) {
    //                 console.error("Logout failed:", error);
    //                 Swal.fire({
    //                     title: "Logout Failed",
    //                     text: "There was an error logging out.",
    //                     icon: "error",
    //                     confirmButtonText: "OK",
    //                     confirmButtonColor: "#EC221F",
    //                 });
    //             }
    //         }
    //     });
    // };

    return (
        <div className='admin-header'>
            <div className='admin-logo'>
                <img src={AdminLogo} alt="Image Logo" />
                <h5>Dialecto Dashboard</h5>
            </div>
            <div className='admin-hamburger' onClick={toggleMenu}>
                <GiHamburgerMenu />
            </div>
            {menuOpen && (
                <div className='admin-dropdown'>
                    <ul>
                    <li onClick={() => navigate('/dialecto/admin-dashboard')}> <MdDashboard/> Dashboard</li>
                        <li onClick={() => navigate('/dialecto/admin/students')}> <FaUserGraduate/> Student List</li>
                        <li onClick={() => navigate('/settings')}> <IoMdSettings/> Settings</li>
                        <li onClick={handleLogout}> <IoLogOut/> Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Admin_Header;
