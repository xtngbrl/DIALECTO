import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { FaFacebook,  } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import Logo from '../assets/logo'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../components/shared/Btn';
import './logIn.css';
import axiosInstance from '../../axiosInstance';
import Swal from 'sweetalert2'
import close from "../assets/close.png";
 
function SignIn()  {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

        
        // const login = (event) => {
        //     event.preventDefault();
            
        //     if (username.toLowerCase() !== 'student') {
        //         Swal.fire({
        //             title: 'Invalid username or password!',
        //             text: 'Please check your credentials',
        //             imageUrl: close,
        //             imageWidth: 100,
        //             imageHeight: 100,
        //             confirmButtonText: "OK",
        //             confirmButtonColor: "#EC221F",
        //             customClass: {
        //                 confirmButton: "custom-error-confirm-button",
        //                 title: "custom-swal-title",
        //             },
        //         });
        //         return;
        //     }
    
        //     // Simulate successful login
        //     document.cookie = `role_name=${username}; Path=/;`;
        //     localStorage.setItem('loginSuccess', 'true');
        //     navigate('/dialecto/home');
        // };

    const login = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/login', {
                username,
                password,
            });
            const { user, accessToken, refreshToken, roleName } = response.data;
            // console.log("User ID:", user.id);
            if (roleName !== 'Student') {
                // setError(`You cannot log in as ${selectedRole}. Your account role is ${userRole}.`);
                Swal.fire({
                    title: 'Role Mismatch',
                    text: 'Please select your assigned role.',
                    imageUrl: close,
                    imageWidth: 100,
                    imageHeight: 100,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#EC221F",
                    customClass: {
                        confirmButton: "custom-error-confirm-button",
                        title: "custom-swal-title",
                    },
                })
                return;
            }

            document.cookie = `role_name=${roleName}; Path=/;`;
            document.cookie = `accessToken=${accessToken}; Path=/;`;
            document.cookie = `refreshToken=${refreshToken}; Path=/; `;

            localStorage.setItem('loginSuccess', 'true');
            if (roleName === 'Student') {
                // console.log(user, accessToken, refreshToken, roleName);
                navigate('/dialecto/home');
            } else {
                navigate('/sign-in');
            }
        } catch (error) {
            console.error('Login error:', error);
            Swal.fire({
                title: 'Invalid username or password!',
                text: 'Please check your credentials',
                imageUrl: close,
                imageWidth: 100,
                imageHeight: 100,
                confirmButtonText: "OK",
                confirmButtonColor: "#EC221F",
                customClass: {
                    confirmButton: "custom-error-confirm-button",
                    title: "custom-swal-title",
                },
            })
            return;
        }
    };

    return (
        <div className='wrapper-signIn'>
            <div className='logo-bg'>
                <Logo />
                <h1>STUDENT LOGIN</h1>
            </div>
            <form onSubmit={null}>
                <h2>Log in to your account</h2>
                <div className='input-box'>  
                    <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}  required />
                </div>
                <div className='input-box'>  
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className='signUp-btn'>
                <Button type="submit" onClick={navigate("/dialecto/home")} label="LOGIN"></Button>
                </div>

                <h4>
                    <Link to='/dialecto/forgot-pass' className='forgot-pass-link'>Forgot Password</Link>
                </h4>

                <h5>
                    Don't have an account?{' '} 
                    <span>
                        <Link to='/dialecto/sign-up' className='signUp-link'>Sign Up</Link>
                    </span>
                </h5>

                <div className='acct-btn-container'>
                    {/*<button> <FaFacebook className='fb-icon' /> Facebook</button>
                    <button> <FcGoogle /> Google</button>*/}
                </div>
            </form>
        </div>
    );
};

export default SignIn;