import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdPersonOutline } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa6";
import IconButton from '../components/shared/IconBtn';
import Button from '../components/shared/Btn';
import SettingIcon from '../assets/setting.png';
import FAQIcon from '../assets/faq.png';
import './page.css';
import Swal from "sweetalert2";
import check from '../assets/check.png';
import close from "../assets/close.png";

import { getCurrentUser, logoutUser, getAllUser } from '../services/userService';

const ProfilePage= () => {
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setFirstName(user?.first_name);
        setLastName(user?.last_name);
        setEmail(user?.email);
        setId(user?.id);
        console.log("User info fetched successfully:", user);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const users = await getAllUser();
        console.log("All users fetched successfully:", users);
      } catch (error) {
        console.error("Failed to fetch all users:", error);
      }
    };
    fetchAllUsers();
  }, []);

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logoutUser();

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
        } catch (error) {
          console.error("Logout failed:", error);
          Swal.fire({
            title: "Logout Failed",
            text: "There was an error logging out.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#EC221F",
          });
        }
      }
    });
  };

  return (
    <div className='profile-wrapper'>
      <div className='profile-header'>
        <button onClick={() => navigate(-1)}>
          <FaChevronLeft />
        </button>
        <h4>Account</h4>
      </div>

      <div className='profile-section'>
        <div className='prof-sec-header'>
          <div className='prof-icon'>
            <MdPersonOutline />
          </div>
          <div className='prof-name'>
            <span>{`${first_name} ${last_name}`} </span>
            <span>{email} </span>
          </div>
        </div>
        <button>Edit Profile</button>
      </div>

      <div className='prof-sec-nav'>
        <div className='prof-nav'>
          <IconButton imageUrl={SettingIcon} label='Settings' bgColor='var(--primary-color)' width='250px' />
          <IconButton imageUrl={FAQIcon} label='FAQs' bgColor='var(--primary-color)' width='250px' />
        </div>
        <Button label='Log out' onClick={handleLogout} outline={false} bgColor='var(--secondary-color)' width='250px' />
      </div>
    </div>
  );
}

export default ProfilePage;
