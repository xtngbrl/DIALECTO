import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../components/shared/Btn';
import Swal from 'sweetalert2';
import close from "../assets/close.png";
import { login } from '../services/userService';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { accessToken, refreshToken, roleName } = await login(username, password);

      if (roleName !== 'Student') {
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
        });
        return;
      }

      document.cookie = `role_name=${roleName}; Path=/;`;
      document.cookie = `accessToken=${accessToken}; Path=/;`;
      document.cookie = `refreshToken=${refreshToken}; Path=/;`;

      localStorage.setItem('loginSuccess', 'true');
      navigate('/dialecto/home');
    } catch (error) {
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
      });
    }
  };

  return (
    <div className='wrapper-signIn'>
      <div className='logo-bg'>
        <Logo />
        <h1>STUDENT LOGIN</h1>
      </div>
      <form onSubmit={handleLogin}>
        <h2>Log in to your account</h2>
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
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='signUp-btn'>
          <Button type="submit" label="LOGIN" />
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
      </form>
    </div>
  );
}

export default SignIn;
