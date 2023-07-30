import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineCopyrightCircle, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter } from "react-icons/ai"

const Footer = () => {
    
    return (
        <footer id="footer">
            <div className="footer-container-top">
                <div className="footer-item">
                    <h3 className="footer-item-h3">Contact us</h3>
                    <span className="footer-item-span">Email: trendezy@gmail.com</span>
                    <span className="footer-item-span">Phone: +919694318396</span>
                    <span className="footer-item-span">Address: Office no. 32, Sector 24, Gurugram, Haryana</span>
                </div>
                <div className="footer-item ">
                    <h3 className="footer-item-h3">Shopping</h3>
                    <span className="footer-item-span">Browse by A-z</span>
                    <span className="footer-item-span">Trending Products</span>
                    <span className="footer-item-span">Avail Discounts</span>
                </div>
                <div className="footer-item ">
                    <h3 className="footer-item-h3">Know Us</h3>
                    <span className="footer-item-span">Join Us</span>
                    <Link to="/about">
                        <span className="footer-item-span">About Us</span>
                    </Link>
                </div>
                <div className="footer-item justify-center items-center">
                    <h3 className="footer-item-h3">Follow us</h3>
                    <div className="flex">
                        <a href="https://www.instagram.com/?hl=en" target="_blank" rel="noopener noreferrer" className="mx-2 my-1"><AiOutlineInstagram size={28} className="hover:text-neutral-200" /></a>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="mx-2 my-1"><AiOutlineTwitter size={28} className="hover:text-neutral-200" /></a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="mx-2 my-1"><AiOutlineLinkedin size={28} className="hover:text-neutral-200" /></a>
                    </div>
                </div>
            </div>
            <div className="footer-container-bottom">
                <div className="mt-5">
                    <span>Site Developed By </span>
                    <a href="https://www.linkedin.com/in/deepak-gupta-b244391b9/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A84FF]">Deepak Gupta</a>
                </div>
                <div className="mt-3">
                    <span>Copyrights <AiOutlineCopyrightCircle size={20} className="inline" /> 2023, All rights reserved</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer