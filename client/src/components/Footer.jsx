import React from 'react'
import '../Css/footer.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from '@mui/material';
import Logo from "../Assets/FitLogo.png";

function Footer() {
    return (
        <div>
            <footer className="footer-distributed">

                <div className="footer-left">
                    <img src={Logo} style={{ height: "5vh", marginLeft: "15%" }} />

                    <p className="footer-links">
                        <a href="/home" className="link-1">Home</a>

                        <a href="/posts">Blog</a>

                        <a href="/shop">Pricing</a>

                        <a href="/about">Contact</a>
                    </p>

                    <p className="footer-company-name">Fit Buddies © 2023</p>
                </div>

                <div className="footer-center">

                    <div style={{ padding: "1%" }}>

                        <p><LocationOnIcon /><span>444 S. Cedros Ave</span> Solana Beach, California</p>
                    </div>

                    <div style={{ padding: "1%" }}>

                        <p><CallIcon />+1.555.555.5555</p>
                    </div>

                    <div style={{ padding: "1%" }}>

                        <p><EmailIcon /><a href="mailto:www.shubham.kanojia.6@gmail.com">fitbuddies@gmail.com</a></p>
                    </div>

                </div>

                <div className="footer-right">

                    <p className="footer-company-about">
                        <span>About the company</span>
                        At FitBuddies , we make fitness fun and easy. We have best-in-class trainers & offer group workouts ranging from yoga to Boxing. Our workouts can be done both at a cult center and at home with the help of do it yourself (DIY) workout videos. Cult.fit uses the best in technology to give you a world-class experience.
                    </p>

                    <div className="footer-icons">

                        <Link href="#"><FacebookIcon /></Link>
                        <Link href="#"><TwitterIcon /></Link>
                        <Link href="#"><LinkedInIcon /></Link>
                        <Link href="#"><GitHubIcon /></Link>

                    </div>

                </div>

            </footer>
        </div>
    )
}

export default Footer