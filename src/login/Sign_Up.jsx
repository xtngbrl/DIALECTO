import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo';
import Button from '../components/shared/Btn';
import './logIn.css';
import axiosInstance from '../../axiosInstance';
import Swal from 'sweetalert2'
import check from "../assets/check.png";
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUp  ()  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [role_name, setRoleName] = useState('Student');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const validateForm = () => {
        if (
          !last_name ||
          !first_name ||
          !password ||
          !email ||
          !username 
        ) {
          return "All fields are required.";
        }
        if (password.length < 8) {
          return "Password must be at least 8 characters long.";
        }
        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          return "Invalid email format.";
        }
        return "";
      };

    const addUser = async (e) => {
        e.preventDefault();
    
        const validationError = validateForm();
        if (validationError) {
          setError(validationError);
          setTimeout(() => {
            setError("");
          }, 3000);
    
          return;
        }
    
        try {
          const response = await axiosInstance.post("/addUser", {
            role_name,
            last_name,
            first_name,
            username,
            email,
            password,
          });
    

          setLastName("");
          setFirstName("");
          setPassword("");
          setEmail("");
          setUsername("");
          Swal.fire({
            title: "User Added Successfully",
            text: `The user ${first_name} ${last_name} has been added.`,
            imageUrl: check,
            imageWidth: 100,
            imageHeight: 100,
            confirmButtonText: "OK",
            confirmButtonColor: "#0ABAA6",
          }).then(() => {
            // Redirect to user list
            navigate("/dialecto/home");
          });
        } catch (error) {
          setError("Failed to add user. Please try again.");
          // setSuccessMessage("");
        }
      };

    return (
        <div className='wrapper-signIn'>
            <div className='logo-bg'>
                <Logo />
                <h1>Create your student account!</h1>
            </div>
            <form onSubmit={addUser}>
                <div className='input-box'>  
                    <input
                        type='text'
                        defaultValue= {role_name}
                        required
                        disabled
                    />
                </div>
                <div className='input-box'>  
                    <input
                        type='text'
                        placeholder='First Name'
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className='input-box'>  
                    <input
                        type='text'
                        placeholder='Last Name'
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className='input-box'>  
                    <input
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='input-box'>  
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='input-box'>  
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className='signUp-btn'>
                    <Button label="SIGN UP" type="submit" />
                </div>

                <h4>
                    <Link to='/dialecto/forgot-pass' className='forgot-pass-link'>Forgot Password</Link>
                </h4>

                <h5>
                    Already have an account?{' '} 
                    <span>
                        <Link to='/dialecto/sign-in' className='signUp-link'>Sign In</Link>
                    </span>
                </h5>
            </form>
        </div>
    );
};

export default SignUp;
