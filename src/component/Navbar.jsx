import React from "react"
import { useRef } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import { signOut } from "firebase/auth";
import { auth } from './firebase/firebase'
import { setEmpty } from "../app/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { selectUser } from '../app/userSlice'
import RippleButtom from './RippleBtn'

function Navbar() {
    const dataOfUser = useSelector(selectUser)
    const dispatch = useDispatch()
    const color = {
        navLinkNotPressed: 'white',
        navLinkPressed: '#8155BA'

    }
    const [open, setOpen] = useState(false)
    const aRef = useRef(null)
    const navigate = useNavigate()

    function handelClick() {
        const height = (document.getElementsByClassName('nav-items'))
        setOpen(prev => !prev)

        if (!open) {
            height[0].style.height = '500px'
        }
        else {
            height[0].style.height = '0px'
        }
    }

    useEffect(() => {
        const listOfa = aRef.current.querySelectorAll('a')
        listOfa.forEach(element => {
            element.addEventListener('click', e => {
                listOfa.forEach((item) => {
                    item.style.color = color.navLinkNotPressed
                })
                element.style.color = color.navLinkPressed
            }
            )
        });
    }, [aRef])

    function handleLogin() {
        if (!dataOfUser.email) {
            navigate('/register')
        }
        else {
            signOut(auth)
                .then(() => dispatch(setEmpty('')))
                .then(() => localStorage.clear())
                .catch((err) => console.log(err))
        }
    }
    function navigateToCart() {
        navigate('/cart')
    }
    function handelPress() {
        // resize the height of the nav bar after click
        const height = document.getElementsByClassName('nav-items')
        if (height[0].style.height === '500px') {
            height[0].style.height = '0'
        }
    }

    return (
        <div className="nav-bar">
            <div className="container">
                <div ref={aRef} className="nav-bar-content">
                    <Link ><i className="fa-solid fa-bars bar" onClick={handelClick}></i></Link>
                    <div className="nav-items">
                        <Link to="/" className="one" onClick={handelPress} >LOGO</Link>
                        <Link to="/" className="one" onClick={handelPress}>Home</Link>
                        <Link to="/Products" className="one" onClick={handelPress}>Products</Link>
                        <Link to="/favorite" className="one" onClick={handelPress}>Favorites</Link>
                        <RippleButtom onClick={handleLogin}>{dataOfUser?.email ? 'Log out' : 'Sign in'}</RippleButtom>
                        <Link to='/cart' onClick={handelPress}><i className="fa-solid fa-cart-shopping cart" onClick={navigateToCart}></i></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar