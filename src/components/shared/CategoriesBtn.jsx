import React from 'react';
import { BiSolidCategory } from "react-icons/bi";
import { Link } from 'react-router-dom';

import './shared.css';

const CategoriesButton = () => {
  return (
    <div className='drop-btn-container'>
      <button className='drop-btn'>
        <span>categories</span>
        <BiSolidCategory className='drop-btn-icon'/>
      </button>
      <div className='drop-btn-content'>
        <Link to='/dialecto/animal-category' className='drop-content'>Animal</Link>
        <Link to='/dialecto/basic-phrases-category' className='drop-content'>Basic Phrases</Link>
        <Link to='/dialecto/food-category' className='drop-content'>Food</Link>
        <Link to='/dialecto/household-item-category' className='drop-content'>Household Items</Link>
      </div>
    </div>
  )
}

export default CategoriesButton;
