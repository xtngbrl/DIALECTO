import React from 'react';
import AdminLogo from '../assets/ImageLogo.png';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './admin.css';
import { MdDashboard } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { IoLogOut, IoWarning } from "react-icons/io5";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { FaGamepad } from "react-icons/fa";

const Admin_Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Log Out!",
            text: "Do you really want to log out?",
            showCancelButton: true,
            icon: "warning",
            background: "#F4E8DD",
            confirmButtonColor: "#f0a438",
            cancelButtonColor: "#b85d1d",
            confirmButtonText: "Yes",
            customClass: {
                container: "custom-container",
                confirmButton: "custom-confirm-button",
                cancelButton: "custom-cancel-button",
                title: "custom-swal-title",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Logged Out!",
                    text: "You have been logged out successfully.",
                    icon: "success",
                    imageWidth: 100,
                    imageHeight: 100,
                    confirmButtonText: "OK",
                    background: "#F4E8DD",
                    confirmButtonColor: "#f0a438",
                    customClass: {
                        confirmButton: "custom-success-confirm-button",
                        title: "custom-swal-title",
                    },
                }).then(() => {
                    navigate("/dialecto/onboarding");
                });
            }
        });
    };

    return (
        <div className="admin-sidebar">
            <div className="admin-sidebar-logo">
                <img src={AdminLogo} alt="Image Logo" />
                <h5>Dialecto</h5>
            </div>
            <ul className="admin-sidebar-nav">
                <li onClick={() => navigate('/dialecto/admin-dashboard')}><MdDashboard className="admin-sidebar-icon"/> Dashboard</li>
                <li onClick={() => navigate('/dialecto/admin/students')}><FaUserGraduate className="admin-sidebar-icon"/> Student List</li>
                <li onClick={() => navigate('/dialecto/admin/dialects')}><GiEarthAfricaEurope className="admin-sidebar-icon"/> Dialects</li>
                <li onClick={() => navigate('/dialecto/admin/games')}><FaGamepad className="admin-sidebar-icon"/> Games</li>
                <li onClick={() => navigate('/dialecto/admin/flagged-words')}><IoWarning className="admin-sidebar-icon"/> Flagged Words</li>
                <li onClick={handleLogout}><IoLogOut className="admin-sidebar-icon"/> Logout</li>
            </ul>
        </div>
    );
};

export default Admin_Header;
