import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import "./landing-page.css";
import Logo from "../assets/ImageLogo.png";
import Dialecto from "../assets/landingImage.png";
import PicOne from '../assets/slide1.png';
import PicTwo from '../assets/slide2.png';
import PicThree from '../assets/slide3.png';
import PicFour from '../assets/slide4.png';
import Neil from '../assets/neil.jpg';
import Gab from '../assets/gab.jpg';
import Amiel from '../assets/amiel.jpg';
import Sir from '../assets/sir.png';

export default function LandingPage() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const features = [
        { image: PicOne, title: "Learn Local Dialects", description: "Dive into the vibrant world of Filipino dialects! Unlock the power of language and connect with the heart of the Philippines in a fun and easy way." },
        { image: PicTwo, title: "Voice Recognition", description: "Get ready to speak like a local! Our thrilling voice recognition feature lets you practice and perfect your pronunciation with instant feedback that makes learning dynamic and fun." },
        { image: PicThree, title: "Easy Progress Tracking by Word", description: "See your language skills soar! Track your progress effortlessly as you conquer new words—watch your achievements grow, one word at a time!" },
        { image: PicFour, title: "Enjoyable Interactive Quiz Game", description: "Level up your learning with our exciting interactive quizzes! Challenge yourself, have a blast, and reinforce your knowledge in a way that’s as fun as it is educational." }
    ]

    const about = [
        { image: Neil, name: "Neil Brian Araiz", discription: "As the Frontend Developer for Dialecto, I craft intuitive and responsive user interfaces, ensuring a seamless and engaging experience for our users." },
        { image: Gab, name: "Gabriel Bernardino", discription: "As the Backend Developer for Dialecto, I develop and maintain the core functionality, ensuring a reliable and efficient system to support our app’s features." },
        { image: Amiel, name: "Amiel Santillano", discription: "As the Hustler, I actively promote Dialecto, building connections, engaging with users, and ensuring our app reaches a wider audience." },
        { image: Sir, name: "Arvin Shelby De Leon", discription: "As the Project Adviser for Dialecto, I provide guidance and strategic direction, ensuring the project stays on track and achieves its goals." },
    ]

    useEffect(() => {
        const cards = document.querySelectorAll(".f-cards");
        const cards1 = document.querySelectorAll(".about-cards");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add("show");
                        }, index * 300);
                    }
                });
            },
            { threshold: 0.3 }
        );

        cards.forEach((card) => observer.observe(card));
        cards1.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="landing-page-wrapper">
            <div className="header">
                <a className="header-logo" href="#home">
                    <img id="logo" src={Logo} alt="Logo" />
                </a>
                <ul className={`nav-links ${isOpen ? "active" : ""}`}>
                    <li>
                        <a href="#home">Home</a>
                    </li>
                    <li>
                        <a href="#features">Features</a>
                    </li>
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
                <div className="menu-icon" onClick={toggleMenu}>
                    &#9776;
                </div>
            </div>
            <div id="home" className="home">
                <div className="left-home">
                    <img src={Dialecto} />
                </div>
                <div className="right-home">
                    <div className="right-text">
                        <h5>YOUR LINGUISTIC LIFELINE TO FILIPINO HERITAGE</h5>
                        <p>
                            Discover and learn Filipino dialects through interactive voice
                            recognition and engaging activities. Preserve and celebrate our
                            rich linguistic heritage with Dialecto!
                        </p>
                    </div>
                    <button onClick={() => navigate('/dialecto/onboarding')} class="cta">
                        <span class="span">Start Learning</span>
                        <span class="second">
                            <svg
                                width="50px"
                                height="20px"
                                viewBox="0 0 66 43"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                            >
                                <g
                                    id="arrow"
                                    stroke="none"
                                    stroke-width="1"
                                    fill="none"
                                    fill-rule="evenodd"
                                >
                                    <path
                                        class="one"
                                        d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                                        fill="#FFFFFF"
                                    ></path>
                                    <path
                                        class="two"
                                        d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                                        fill="#FFFFFF"
                                    ></path>
                                    <path
                                        class="three"
                                        d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                                        fill="#FFFFFF"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>

            <div id="features" className="features-wrapper">
                <h1>FEATURES</h1>
                <div className="features">
                    {features.map((item, key) =>
                        <div className="f-cards">
                            <div className="f-cards-img"><img src={item.image} /></div>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                        </div>)}
                </div>
            </div>
            <div id="about" className="about-wrapper">
                <h1>ABOUT US</h1>
                <div className="about">
                    {about.map((item, key) =>
                        <div className="about-cards" >
                            <div className="about-image">
                                <img src={item.image} />
                            </div>
                            <h4>{item.name}</h4>
                            <p>{item.discription}</p>
                        </div>)}
                </div>
            </div>
            <div id="contact" className="footer">
                <h3>Contact Us</h3>
                <div className="contact-icon">
                    <a href="https://www.facebook.com/profile.php?id=61564400326954" target="_blank" rel="noopener noreferrer" className="facebook">
                        <FaFacebook className="f-icon" />
                        <h5>Dialecto</h5>
                    </a>
                    <a href="" target="_blank" rel="noopener noreferrer">
                        <MdEmail className="icon" />
                        <h5>dialecto@gmail.com</h5>
                    </a>
                </div>
                <h6>© 2025 Dev Dynamos. All rights reserved.</h6>
                <h4>Visitors:</h4>
                <h6>This page has been visited <strong>88</strong> times.</h6>
            </div>
        </div>
    );
}
