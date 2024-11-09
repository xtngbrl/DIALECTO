import React from 'react';
import {Link} from 'react-router-dom';
import { GiAk47 } from "react-icons/gi";

import Logo from '../assets/logo';

import './logIn.css';

const AgeSelection = () => {
    return (
        <div className='wrapper-signIn'>
            <div className='logo-bg'>
                <Logo />
                <h1>DIALECTO</h1>
            </div>

            <div className='age-selection-container'>
                <h1>Select your child's age</h1>

                <p>
                    This helps DIALECTO select the right content for your child's age
                </p>

                <div className='age-btn-container'>
                    <button> 3 <GiAk47 /> </button>
                    <button> 4 <GiAk47 /> </button>
                    <button> 5 <GiAk47 /> </button>
                    <button> 6 <GiAk47 /> </button>
                    <button> 7 <GiAk47 /> </button>
                    <button> 8 <GiAk47 /> </button>
                    <button> 9 <GiAk47 /> </button>
                    <button> 10 <GiAk47 /> </button>
                    <button> 11+ <GiAk47 /> </button>
                </div>

                <h3>
                    <Link to='/home' className='skip-link'>Skip this step</Link>
                </h3>
            </div>
        </div>
    );
};

export default AgeSelection;