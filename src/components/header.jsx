import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import HamburgerMenu from "./shared/Hamburger";
import SwitchButton from "./shared/SwitchBtn";
import FilterIcon from "./shared/Filter";
import SearchIcon from "./shared/Search";
import Button from "./shared/Btn";
import IconButton from "./shared/IconBtn";
import CategoriesButton from "./shared/CategoriesBtn";
import ProfileIcon from "../assets/profile.png";
import LeaderboardIcon from "../assets/leaderboard.png";
import ProgressIcon from "../assets/progress.png";
import Swal from "sweetalert2";
import { logoutUser } from "../services/userService";
import check from "../assets/check.png";
import report from "../assets/reportIcon.png";
import { flagWord } from "../services/flagwordService";

import "./components.css";

function Header({ showCategoriesButton, showSwitchButton, bgColor }) {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState({
    dialect: "",
    word: "",
    reason: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    closeSidebar();

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logoutUser();
          navigate("/dialecto/onboarding");
          Swal.fire({
            title: "Logged Out!",
            text: "You have been logged out successfully.",
            imageUrl: check,
            imageWidth: 100,
            imageHeight: 100,
            confirmButtonText: "OK",
            background: "#F4E8DD",
            confirmButtonColor: "#f0a438",
            customClass: {
              confirmButton: "custom-success-confirm-button",
              title: "custom-swal-title",
            },
          });
        } catch (error) {
          console.error("Logout failed:", error);
          Swal.fire({
            title: "Logout Failed",
            text: "There was an error logging out.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#EC221F",
          });
        }
      }
    });
  };

  const handleReportWord = async () => {
    const dialectMap = {
      Waray: 1,
      Kapampangan: 2,
      Cebuano: 3,
      Ilocano: 4,
    };

    const { dialect, word, reason } = reportData;
    const dialect_id = dialectMap[dialect];

    if (!dialect_id || !word || !reason) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete",
        text: "Please fill out all fields.",
      });
      return;
    }

    try {
      await flagWord({ dialect_id, word, reason });
      Swal.fire({
        icon: "success",
        title: "Reported",
        text: "Thank you for reporting.",
      });
      setShowReportModal(false);
      setReportData({ dialect: "", word: "", reason: "" });
    } catch (err) {
      setShowReportModal(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.error || "Failed to report.",
      });
    }
  };

  return (
    <div className="header-container" style={{ backgroundColor: bgColor }}>
      <HamburgerMenu onClick={toggleSidebar} />

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`} ref={sidebarRef}>
        <button className="close-btn" onClick={closeSidebar}>
          <IoClose />
        </button>

        <div className="sidebar-nav">
          <IconButton
            imageUrl={ProfileIcon}
            label="Profile"
            bgColor="var(--primary-color)"
            navigateTo={() => navigate("/dialecto/profile-page")}
          />
          <IconButton
            imageUrl={LeaderboardIcon}
            label="Leaderboard"
            bgColor="var(--primary-color)"
            navigateTo={() => navigate("/dialecto/leaderboard")}
          />
          <IconButton
            imageUrl={ProgressIcon}
            label="Progress"
            bgColor="var(--primary-color)"
            navigateTo={() => navigate("/dialecto/progress-page")}
          />
          <IconButton
            imageUrl={report}
            label="Report Word"
            bgColor="var(--primary-color)"
            navigateTo={() => {
              closeSidebar();
              setShowReportModal(true);
            }}
          />
        </div>

        <Button
          label="Log out"
          onClick={handleLogout}
          outline={false}
          bgColor="var(--secondary-color)"
          width="230px"
        />
      </div>

      <div className="right-container">
        {showCategoriesButton && <CategoriesButton />}
        {showSwitchButton && <SwitchButton />}
        <FilterIcon />
        <SearchIcon />
      </div>

      {showReportModal && (
        <div className="modal-overlay">
          <div className="modal-report">
            <h2>Report Word</h2>
            <label>Dialect</label>
            <select
              value={reportData.dialect}
              onChange={(e) =>
                setReportData({ ...reportData, dialect: e.target.value })
              }
            >
              <option value="">Select a dialect</option>
              <option value="Waray">Waray</option>
              <option value="Kapampangan">Kapampangan</option>
              <option value="Cebuano">Cebuano</option>
              <option value="Ilocano">Ilocano</option>
            </select>
            <label>Word</label>
            <input
              type="text"
              value={reportData.word}
              onChange={(e) =>
                setReportData({ ...reportData, word: e.target.value })
              }
            />
            <label>Reason</label>
            <textarea
              rows="4"
              value={reportData.reason}
              onChange={(e) =>
                setReportData({ ...reportData, reason: e.target.value })
              }
            />
            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowReportModal(false)}
              >
                Cancel
              </button>
              <button
                className="report-btn"
                onClick={handleReportWord}
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
