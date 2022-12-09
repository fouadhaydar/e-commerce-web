import React from 'react'
import './Register.css'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRef } from 'react'
import db, { auth } from '../component/firebase/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userData } from '../app/userSlice'
import { provider } from '../component/firebase/firebase'
import { signInWithPopup } from "firebase/auth"
import { setDoc, doc, getDocs, collection } from 'firebase/firestore'
import { nanoid } from 'nanoid'


function Register() {
    const valdRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    // store the input in state as object
    const [input, setInput] = useState({
        userName: '',
        password: '',
        email: location?.state?.email || ''
    })
    const [message, setMessage] = useState({
        userName: true,
        password: true,
        email: true
    })
    // register with google 
    function googleRegister(e) {
        e.preventDefault()
        signInWithPopup(auth, provider).then((result) => {
            dispatch(userData({
                email: result.user.email
            }))
            return result
        }).then((result) => {
            // confirme if the user was register befor
            getDocs(collection(db, 'users')).then((snapshot) => {
                let users = []
                snapshot.docs.forEach((user) => {
                    users.push(user)
                })
                return users
            }).then((users) => {
                let found = false
                users.map((user) => {
                    if (user.email !== result.user.email) {
                        found = true
                    }
                })
                if (!found) {
                    const id = nanoid()
                    setDoc(doc(db, 'users', `${id}`), {
                        email: result.user.email,
                        id: id,
                        favorite: [],
                        userRating: []
                    });
                }
            })
        })
            .then(() => {
                navigate('/')
            })

    }
    // submit the registire information 
    function handleRegister(e) {
        e.preventDefault()
        // user validation + change the input field color
        if (input.userName.length < 1) {
            valdRef.current[0].style.cssText = " border-color: #FF9494; ; color: #FF9494; "
            setMessage(prev => ({ ...prev, userName: false }))
        }
        else {
            valdRef.current[0].style.cssText = " border-color: green ; color: green "
            setMessage(prev => ({ ...prev, userName: true }))
        }
        // email validation + change the input filed color
        if (!(/\w+\d*@\w+.(com|org|net)/ig).test(input.email)) {
            valdRef.current[1].style.cssText = " border-color: #FF9494; ; color: #FF9494; "
            setMessage(prev => ({ ...prev, email: false }))
        }
        else {
            valdRef.current[1].style.cssText = " border-color: green ; color: green "
            setMessage(prev => ({ ...prev, email: true }))

        }
        // password validation + change the input filed color
        if (input.password.length < 6) {
            valdRef.current[2].style.cssText = " border-color: #FF9494; ; color: #FF9494; "
            setMessage(prev => ({ ...prev, password: false }))
        }
        else {
            valdRef.current[2].style.cssText = " border-color: green ; color: green "
            setMessage(prev => ({ ...prev, password: true }))
        }
        if (message.email && message.password) {
            createUserWithEmailAndPassword(auth, input.email, input.password)
                .then((userCredential) => {
                    // Signed in 
                    dispatch(userData(input))
                    //create user in firstore
                    const id = nanoid()
                    setDoc(doc(db, 'users', `${id}`), {
                        email: input.email,
                        id: id,
                        favorite: [],
                        userRating: []
                    });
                    setInput({
                        userName: '',
                        password: '',
                        email: ''
                    })
                    navigate('/')
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }

    }
    return (
        <div className='first-container'>
            <div className='form-container'>
                <form action="" className='inner-container' ref={valdRef}>
                    <div className='input-plus-error'>
                        <input type="text" placeholder='Type your Name' className='text-input name'
                            onChange={(e) => {
                                // turn the color to the main color on change and set the state to the new name
                                e.target.style.cssText = 'border-color: white ; color: rgb(139, 139, 139) ;'
                                setInput((prev) => {
                                    return (
                                        { ...prev, userName: e.target.value }
                                    )
                                })
                            }} value={input.userName} />
                        {!message.userName && <h4 className='error-massege'>your name not verifide</h4>}
                    </div>
                    <div className='input-plus-error'>
                        <input type="email" placeholder='Type your Email'
                            onChange={(e) => {
                                // turn the color to the main color on change and set the state to the new email
                                e.target.style.cssText = 'border-color: white ; color: rgb(139, 139, 139) ;'
                                setInput((prev) => {
                                    return (
                                        { ...prev, email: e.target.value }
                                    )
                                })
                            }} value={input.email}
                            className='text-input' />
                        {!message.email && <h4 className='error-massege'>your email was not valid</h4>}
                    </div>
                    <div className='input-plus-error'>
                        <input type="text" placeholder='Type your Password'
                            onChange={(e) => {
                                // turn the color to the main color on change and set the state to the new password
                                e.target.style.cssText = 'border-color: white ; color: rgb(139, 139, 139) ;'
                                setInput((prev) => {
                                    return (
                                        { ...prev, password: e.target.value }
                                    )
                                })
                            }}
                            className='text-input' />
                        {!message.password && <h4 className='error-massege'>password shoud be at least 6 number</h4>}
                    </div>
                    <button className='register-btn' onClick={googleRegister}>
                        <i className="fa-brands fa-google google"></i>
                    </button>
                    <button className='register-btn' onClick={handleRegister}>Register</button>
                    <button className='login-btn' onClick={() => (navigate('/login'))}>Log in</button>
                </form>
            </div>
        </div>
    )
}

export default Register