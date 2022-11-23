import React, { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../component/firebase/firebase'
import { useDispatch } from 'react-redux'
import { userData } from '../app/userSlice'

function LogIn() {
    const dispatch = useDispatch()
    const [logInInput, setLogInInput] = useState({
        email: '',
        password: ''
    })
    // state for catch if the email or password are wrong
    const [wrong, setWrong] = useState({
        wrongEmail: '',
        wrongPassword: ''
    })

    const logInRef = useRef(null)
    const navigate = useNavigate()

    function handelLogIn(e) {
        e.preventDefault()
        if (!(/\w+\d*@\w+.(com|org|net)/ig).test(logInInput.email)) {
            logInRef.current[0].style.cssText = " border-color: #FF9494; ; color: #FF9494; "
        }
        else {
            logInRef.current[0].style.cssText = " border-color: green ; color: green ; "
        }
        if (!logInInput.password || logInInput.password.length < 1) {
            logInRef.current[1].style.cssText = 'border-color: #FF9494; color: #FF9494;'
        }
        else {
            logInRef.current[1].style.cssText = 'border-color: green; color: green;'
        }
        if (logInInput.email && logInInput.password) {
            signInWithEmailAndPassword(auth, logInInput.email, logInInput.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    return user
                })
                .then((user) => {
                    if (user) {
                        dispatch(userData({
                            email: logInInput.email,
                            password: logInInput.password
                        }))
                        navigate('/')
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // validation for the email and password if exist
                    if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
                        setWrong(prev => ({
                            ...prev, wrongPassword: 'wrong password'
                        }))
                    }
                    else if (errorMessage === 'Firebase: Error (auth/user-not-found).') {
                        setWrong(prev => ({
                            ...prev, wrongEmail: 'user not found'
                        }))
                    }
                });
        }
    }
    return (
        <div className='login-container'>
            <div className='inner-container'>
                <form action="" className='login-form' ref={logInRef}>
                    <input type="email"
                        placeholder='Email Adress'
                        className='login-input'
                        value={logInInput.email}
                        style={wrong.wrongEmail ? { borderColor: '#FF9494', color: '#FF9494' } : {}}
                        onChange={(e) => {
                            // return to the main color on change
                            e.target.style.cssText = 'border-color: white ; color: rgb(139, 139, 139)'
                            setLogInInput(prev => {
                                return (
                                    { ...prev, email: e.target.value }
                                )
                            })
                            // hide the wrong email massage on change
                            setWrong((prev) => {
                                return (
                                    { ...prev, wrongEmail: '' }
                                )
                            })
                        }}
                    />
                    {wrong.wrongEmail && <p
                        style={{
                            color: '#FF9494',
                            marginBottom: '10px',
                        }}>{wrong.wrongEmail}</p>}
                    <input type="text"
                        placeholder='Password'
                        className='login-input'
                        style={wrong.wrongPassword ? { borderColor: '#FF9494', color: '#FF9494' } : {}}
                        onChange={(e) => {
                            // return to the main color on change
                            e.target.style.cssText = 'border-color: white ; color: rgb(139, 139, 139)'
                            setLogInInput(prev => {
                                return (
                                    { ...prev, password: e.target.value }
                                )
                            })
                            // hide the wrong password massage on change
                            setWrong((prev) => {
                                return (
                                    { ...prev, wrongPassword: '' }
                                )
                            })
                        }}
                        value={logInInput.password}
                    />
                    {wrong.wrongPassword && <p style={{
                        color: '#FF9494',
                        marginBottom: '10px',
                    }}>{wrong.wrongPassword}</p>}
                    <button className='login-button' onClick={handelLogIn}>
                        Login
                    </button>
                    <button className='create-account' onClick={() => navigate('/register')}>
                        Create New Account
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LogIn