import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineSwitchVertical } from "react-icons/hi";

import './shared.css'; 

const SwitchButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let label = "STANDBY MODE"; 

  if (
    location.pathname === "/dialecto/animal-category" ||
    location.pathname === "/dialecto/food-category" ||
    location.pathname === "/dialecto/household-item-category" ||
    location.pathname === "/dialecto/basic-phrases-category"
  ) {
    label = "INTERACTIVE MODE";
  }

  const handleClick = () => {
    if (
      location.pathname === "/dialecto/animal-category" ||
      location.pathname === "/dialecto/food-category" ||
      location.pathname === "/dialecto/household-item-category" ||
      location.pathname === "/dialecto/basic-phrases-category"
    ) {
      navigate("/dialecto/home-standby");
    } else {
      navigate(-1);
    }
  };

  setTimeout(() => {console.log('after 10 sec')}, 1000)

  return (
    <button onClick={handleClick} className='switch-btn'>
      <span>{label}</span> 
      <HiOutlineSwitchVertical className='switch-btn-icon'/>
    </button>
  );
};

export default SwitchButton;
