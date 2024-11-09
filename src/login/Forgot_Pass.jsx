import React from 'react';
import {Link} from 'react-router-dom';

import Logo from '../assets/logo'
import Button from '../components/shared/Btn';

import './logIn.css';
 
const ForgotPass = () => {
    return (
        <div className='wrapper-signIn'>
            <div className='logo-bg'>
                <Logo />
                <h1>DIALECTO</h1>
            </div>
            <form action="">
                <h2>Forgot Password</h2>
                <div className='input-box'>  
                    <input type='password' placeholder='New Password' required />
                </div>
                <div className='input-box'>  
                    <input type='password' placeholder='Confirm Password' required />
                </div>

                <div className='signUp-btn'>
                    <Link to='/dialecto/sign-in'> <Button label="Confirm Password"/> </Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPass;