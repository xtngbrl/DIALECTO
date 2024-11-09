import React from 'react';
import {Link} from 'react-router-dom';

import Logo from '../assets/logo';
import Button from '../components/shared/Btn';

import './logIn.css';

function OnBoarding() {
    return(
        <div className='wrapper'>
            <Logo />
            <h1>DIALECTO</h1>
            <p>
            Let DIALECTO Be Your Guide to Language Mastery! 
            </p>
            
            <div className='btn-container'>
                <Link to='/dialecto/signup-role-select'>
                    <Button label="GET STARTED" outline={false} />
                </Link>
                <Link to='/dialecto/login-role-select'>
                    <Button label="I HAVE AN ACCOUNT" outline={true} />
                </Link>
            </div>
        </div>
    );
}

export default OnBoarding;