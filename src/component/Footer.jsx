import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

function Footer() {
    return (
        <footer className='footer-outer-container'>
            <div className='footer-container'>
                <Link to="/" className="one">LOGO</Link>
                <div className="footer-items">
                    <Link to="/" className="one">Home</Link>
                    <Link to="/Products" className="one">Products</Link>
                    <Link to="/Favorites" className="one">Favorites</Link>
                </div>
                <div className="footer-items">
                    <Link to="/" className="one">privacy policy</Link>
                    <Link to="/Products" className="one">Tearms And Condition</Link>
                    <Link to="/Favorites" className="one">Copyright</Link>
                </div>
                <div className='contact-us'>
                    <a aria-label="Chat on WhatsApp" href="https://wa.me/+96178947842"><i className="fa-brands fa-square-whatsapp icon w"></i></a>
                    <a href="mailto:fouadhaydar16@gmail.com"><i className="fa-solid fa-envelope icon e"></i></a>
                    <a href="tel:+96178947842"><i className="fa-solid  fa-phone icon p"></i></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer