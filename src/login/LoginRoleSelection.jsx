import React from 'react';
import {Link} from 'react-router-dom';

import Logo from '../assets/logo';
import Button from '../components/shared/Btn';

import './logIn.css';

function LoginRoleSelection() {
    return(
        <div className='wrapper'>
             <Logo />
            <h1>
            What are you logging in as?
            </h1>
            
            <div className='btn-container'>
                <Link to='/dialecto/sign-in'>
                    <Button label="I AM A STUDENT" outline={false} />
                </Link>
                <Link to='/dialecto/admin-login'>
                    <Button label="I AM A TEACHER" outline={true} />
                </Link>
            </div>
        </div>
    );
}

export default LoginRoleSelection;