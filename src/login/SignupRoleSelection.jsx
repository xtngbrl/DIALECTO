import React from 'react';
import {Link} from 'react-router-dom';

import Logo from '../assets/logo';
import Button from '../components/shared/Btn';

import './logIn.css';

function SignupRoleSelection() {
    return(
        <div className='wrapper'>
             <Logo />
            <h1>
            What are you registering as?
            </h1>
            
            <div className='btn-container'>
                <Link to='/dialecto/sign-up'>
                    <Button label="I AM A STUDENT" outline={false} />
                </Link>
                <Link to='/dialecto/admin-signup'>
                    <Button label="I AM A TEACHER" outline={true} />
                </Link>
            </div>
        </div>
    );
}

export default SignupRoleSelection;