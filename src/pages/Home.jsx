import React from 'react'
import './home.css'
import { useState } from 'react'
import Card from '../component/Card'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from '../app/productSlice'
import { useEffect } from 'react'
import { selectUser, setProductPices } from '../app/userSlice'
import { collection, getDocs } from "firebase/firestore"
import db from '../component/firebase/firebase'
import { setFavorite } from '../app/userSlice'
import { addToCart } from '../app/userSlice'
import { Player } from '@lottiefiles/react-lottie-player'
import RippleButton from '../component/RippleBtn'


function useProduct(data) {
    let listOfData = []
    for (let i = 0; i < 3; i++) {
        listOfData.push(
            data[i]
        )
    }
    return listOfData
}

function Home() {
    const secondRef = collection(db, 'users')
    const [number, setNumber] = useState(1)
    const [email, setEmail] = useState('')
    const [emailEntred, setEmailEntred] = useState(true)
    const emailRef = useRef()
    let data = useSelector(selectProducts)
    const [king, setKing] = useState()
    const myData = useProduct(data)
    // get the data of the user from redux
    let dataOfUser = useSelector(selectUser)
    const [userFavorite, setUserFavorite] = useState()

    const dispatch = useDispatch()

    useEffect(() => {

        let newArray = data?.slice()
        newArray.sort((a, b) => a.rating - b.rating)
        let bestProduct = newArray[0]
        setKing(bestProduct)

    }, [data])
    useEffect(() => {
        getDocs(secondRef)
            .then(snapshot => {
                const userDoc = snapshot?.docs?.find((doc) =>
                    doc.data().email === dataOfUser.email
                )
                return userDoc
            }).then((userDoc) => {
                // if the user email exist in firestor
                if (userDoc?.data().email) {
                    // add the fetched favorite to redux
                    dispatch(setFavorite(userDoc?.data().favorite))
                    // put the ids of favorite product in state
                    setUserFavorite(userDoc.data().favorite)
                }
            })
    }, [dataOfUser.email])

    function handlePlus() {
        setNumber(prev => prev + 1)
    }
    function handleMinus() {
        setNumber(prev => prev > 1 ? prev - 1 : 1)
    }
    const navigate = useNavigate()
    function getStarted() {
        if (email) {
            navigate('/register', { state: { email: email } })
            setEmailEntred(true)
        }
        else {
            emailRef.current.style.cssText = 'border-color: #FF9494'
            setEmailEntred(false)
        }

    }
    function addKing() {
        dispatch(addToCart(king.id))
        dispatch(setProductPices
            ({
                id: king.id,
                number: number
            }))
    }
    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: animationData,
    //     rendererSettings: {
    //         preserveAspectRatio: "xMidYMid slice"
    //     }
    // };
    function handelBuy(number) {
        const newPrice = number * king?.Price
        if (number === 0) {
            alert('you can not buy nothing')
        }
        else {
            alert(`you buy ${number} of the king item price $${newPrice}`)
        }
    }
    if (data.length === 0) {
        return (
            <div style={{ width: '100px', height: '100vh' }}>
                <Player
                    autoplay
                    loop
                    src="https://assets4.lottiefiles.com/packages/lf20_kevlSvgFdb.json"
                    className='player'>
                </Player>
            </div>
        )
    }
    else {
        return (
            <>
                <div className='main-container'>
                    <div className='second-container'>
                        <div className='title'>
                            <h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h2>
                        </div>
                        <div className='cta-container'>
                            <input type="text"
                                className='cta-input'
                                placeholder={`${emailEntred ? 'Enter Your Email Adress' : 'Please enter your Email adress'}`}
                                onChange={(e) => { setEmail(e.target.value) }}
                                value={email}
                                ref={emailRef}
                                style={!emailEntred ? { color: '#FF9494' } : { color: 'white' }}
                            />
                            <RippleButton onClick={getStarted} >
                                Let's Begin
                            </RippleButton>
                        </div>
                    </div>
                </div>
                <div className='outer-container'>
                    <h2>King of our product</h2>
                    <div className='inner-container'>
                        <div className='best-product-image-container'>
                            <img src={king?.URL} alt="furniture" />
                        </div>
                        <div className='content-container'>
                            <div className='title'>
                                <h3>Title: {king?.name}</h3>
                                <p>price: ${king?.Price}</p>
                            </div>
                            <div className='sub-title'>
                                <h4>{king?.Description}</h4>
                            </div>
                            <div className='quantity'>
                                <p>Quantity: </p>
                                <i className="fa-solid fa-minus minus" onClick={handleMinus}></i>
                                {number}
                                <i className="fa-solid fa-plus plus" onClick={handlePlus}></i>
                            </div>
                            <RippleButton className='add-to-cart-btn'
                                onClick={addKing}>Add To Cart</RippleButton>
                            <RippleButton className='add-to-cart-btn buy-now' onClick={() => handelBuy(number)}>Buy Now</RippleButton>
                        </div>
                    </div>
                </div>
                <div className='section-products'>
                    <div className='products-container'>
                        <div className='product-title'>
                            <h3>Products</h3>
                            <h3>see all product <i className="fa-solid fa-arrow-right arrow" onClick={() => navigate('/Products')}></i></h3>
                        </div>
                        <div className='card-product-container'>
                            {
                                myData?.map(data => {
                                    const exist = userFavorite?.find(userId => userId === data?.id)
                                    return (
                                        <Card
                                            key={data?.id}
                                            title={data?.name}
                                            price={data?.Price}
                                            url={data?.URL}
                                            id={data?.id}
                                            description={data?.Description}
                                            exist={exist}
                                            rating={data?.rating}
                                            cat={data?.Category}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='about-us'>
                    <div className='background'>
                        <div className='about-us-content'>
                            <h2>About us</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Expedita suscipit ipsam voluptates deserunt asperiores provident id delectus,
                                deleniti eos temporibus voluptas fugiat debitis sed eius odit soluta, qui maiores sit.</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default Home