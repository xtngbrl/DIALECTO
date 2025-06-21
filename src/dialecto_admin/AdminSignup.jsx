import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../services/userService";

import Logo from "../assets/logo";
import Button from "../components/shared/Btn";

import "./adminLogin.css";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [role_name] = useState("Teacher");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await addUser({
        role_name,
        last_name: lastName,
        first_name: firstName,
        username,
        email,
        password,
      });

      Swal.fire({
        title: "Account Created",
        text: "Your teacher account was successfully created.",
        icon: "success",
        confirmButtonColor: "#0ABAA6",
      }).then(() => {
        navigate("/dialecto/admin-login");
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Signup Failed",
        text: "Unable to register. Please try again.",
        icon: "error",
        confirmButtonColor: "#EC221F",
      });
    }
  };

  return (
    <div className="wrapper-signIn">
      <div className="logo-bg">
        <Logo />
        <h1>HELLO TEACHER!</h1>
      </div>
      <form onSubmit={handleSignUp}>
        <h2>Create your account</h2>
        <div className="input-box">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="signUp-btn">
          <Button label="SIGN UP" type="submit" />
        </div>

        <h4>
          <Link to="/dialecto/forgot-pass" className="forgot-pass-link">
            Forgot Password
          </Link>
        </h4>

        <h5>
          Already have an account?{" "}
          <span>
            <Link to="/dialecto/admin-login" className="signUp-link">
              Sign In
            </Link>
          </span>
        </h5>
      </form>
    </div>
  );
};

export default AdminSignup;