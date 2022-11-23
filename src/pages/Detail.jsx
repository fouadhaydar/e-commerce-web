import React from 'react'
import { useState } from 'react'
import './detail.css'
import { useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart, setProductPices, storeRting } from '../app/userSlice'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import db from '../component/firebase/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../app/userSlice'
import { useEffect } from 'react'
import { changeTargetProduct, selectProducts } from '../app/productSlice'
import RippleButton from '../component/RippleBtn'
let percentArry = []

// let counter = 1

function Detail() {
    let counter = 1
    window.scrollTo(0, 0);
    const location = useLocation()
    const [number, setNumber] = useState(1)
    const sliderWidth = useRef(null)
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const [rating, setRating] = useState(0)
    const userData = useSelector(selectUser)
    const products = useSelector(selectProducts)
    // get the id from url
    const { id } = useParams()
    function handelClick() {
        dispatch(setProductPices
            ({
                id: id,
                number: number
            }))
        dispatch(addToCart(id))

    }

    const globalIndex = products[products.findIndex(product => product.id === id)]

    useEffect(() => {
        percentArry = []
        // // lop through each product in redux and put the rating of the user in state
        userData?.userRating?.forEach((product) => {

            if (product.productId === id) {
                setRating(product.productRate)
                return
            }
        })
        // set the user rating in fierstore
        if (userData?.userRating?.length > 0) {
            setDoc(doc(db, 'users', userData.id), {
                email: userData.email,
                favorite: userData.favorite,
                id: userData.id,
                userRating: userData.userRating
            })
        }
        const index = (products?.findIndex(product => product.id === id))
        if (products[index]?.counter > 0) {
            products[index]?.rating?.map((product) => {
                percentArry[product.stars - 1] = { stars: product.stars, precent: ((product.number * 100) / products[index].counter) }

            })
            percentArry = percentArry.reverse()
        }

    }, [userData?.userRating, id])

    useEffect(() => {
        // select a list of span
        const spanListe = sliderWidth?.current?.querySelectorAll('.slider-content')
        // loop through this list to expand their width 
        spanListe?.forEach(element => {
            // adding event listener at the top of the span container
            document.addEventListener('scroll', () => {
                // get the top of the container
                if (sliderWidth?.current?.offsetTop) {
                    element.style.width = `${element.getAttribute('data-width')}`
                }
            })
        })

    }, [percentArry.length >= 4])

    function handelRating(num) {
        let ratingNumber = []
        if (userData.email) {
            const oldRating = rating

            setRating(num)
            // store th rating of the user in redux
            dispatch(storeRting({
                productId: id,
                productRate: num
            }))
            const index = (products.findIndex(product => product.id === id))

            if (products[index].rating) {
                ratingNumber = structuredClone(products[index].rating);
            }
            else {
                ratingNumber = [
                    {
                        stars: 1,
                        number: 0
                    },
                    {
                        stars: 2,
                        number: 0
                    },
                    {
                        stars: 3,
                        number: 0
                    },
                    {
                        stars: 4,
                        number: 0
                    },
                    {
                        stars: 5,
                        number: 0
                    },
                ]
            }
            onSnapshot(doc(db, "products", id), (snapshot) => {
                dispatch(changeTargetProduct({ index: index, arry: ratingNumber }))
            })
            if (num > 0) {
                const item = products.find((element) =>
                    element?.id === id
                )
                // put object of 5 element in target product in fierstore
                if (products[index].rating) {
                    if (oldRating > 0) { ratingNumber[oldRating - 1].number -= 1 }
                    ratingNumber[num - 1].number += 1
                    // loop throught each number and return the % of this number
                    counter = ratingNumber.reduce((previousValue, currentValue) => {
                        return previousValue + currentValue.number
                    }, 0)
                    setDoc(doc(db, 'products', id), {
                        ...item,
                        rating: ratingNumber,
                        counter: counter
                    })
                }
                else {
                    ratingNumber[num - 1].number += 1
                    counter = ratingNumber.reduce((previousValue, currentValue) => {
                        return previousValue + currentValue.number
                    }, 0)
                    setDoc(doc(db, 'products', id), {
                        ...item,
                        rating: ratingNumber,
                        counter: counter
                    })
                }
            }
        }
        else {
            alert('please sign in')
        }

    }
    function handelBuy() {
        const newPrice = number * globalIndex?.Price
        if (number === 0) {
            alert('you can not buy nothing')
        }
        else {
            alert(`you buy ${number} of the king item price $${newPrice}`)
        }
    }
    function handleQuantity(action) {
        if (action === 'minus') {
            setNumber(prev => number > 1 ? prev - 1 : 1)
        }
        else if (action === 'plus') {
            setNumber(prev => prev + 1)
        }
    }
    return (
        <div className='detail-main-container'>
            <div className='hero-detail'>
                <div className='image-container'>
                    <img src={globalIndex?.url} alt="furniture" />
                </div>
                <div className='product-detail'>
                    <h1>{globalIndex?.name}</h1>
                    <h3> <i className="fa-solid fa-star star"></i>{location?.state?.globaleRate}</h3>
                    <div className='discription-container'>
                        <p>
                            {globalIndex?.Description}
                        </p>
                    </div>
                    <div className='product-quantity'>
                        <p>Quantity: </p>
                        <i className="fa-solid fa-minus minus" onClick={() => handleQuantity('minus')}></i>
                        {number}
                        <i className="fa-solid fa-plus plus" onClick={() => handleQuantity('plus')}></i>
                    </div>
                    <RippleButton onClick={handelClick}>
                        Add to cart
                    </RippleButton>
                    <RippleButton onClick={handelBuy}>
                        Buy Now
                    </RippleButton>
                </div>
            </div>
            <div className='rating-section'>
                <div className='second-rating-section'>
                    <div className='rating-nun'>
                        <div className='users-rating'>
                            <h1>{location?.state?.globaleRate}</h1>
                            <p>of {globalIndex?.counter} Reviews <i className="fa-solid fa-star "></i> </p>
                        </div>
                        <div className='add-your-rating'>
                            <p style={{ paddingBottom: '10px' }}>Add Your Rating</p>
                            <div className='rating-stars-container'>
                                {[1, 2, 3, 4, 5].map((num) => {
                                    return (
                                        <i
                                            key={num}
                                            className={num <= rating ? "fa-solid fa-star on " : "fa-regular fa-star off"}
                                            onClick={() => handelRating(num)}>
                                        </i>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='main-slider-container' ref={sliderWidth}>
                        {
                            percentArry.length > 0 && globalIndex?.counter > 0 && percentArry.map((value) => {
                                return (
                                    <div className='slider-container'>
                                        <p>{value.stars}</p>
                                        <span className='slider-content' data-width={`${value.precent}%`}></span>
                                        <p className='precent'>{` ${value.precent.toFixed(1)}%`}</p>
                                    </div>
                                )
                            })}
                        {
                            globalIndex?.counter === 0 && [1, 2, 3, 4, 5].map(value => {
                                return (
                                    <div className='slider-container'>
                                        <p>{value}</p>
                                        <span className='slider-content' data-width='0%'></span>
                                        <p className='precent'>0%</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {/* <div className='comment-section'>
                <div className='comment-section-outer-container'>
                    <div className='comment-section-inner-container'>
                        <div className='top-section-comment'>
                            <div className='uer-info-rating'>
                                <div className='user-info'>
                                    <div className='user-image'></div>
                                    <div className='stars-user-name'>
                                        <h4 className='user-name'>Eren yeager</h4>
                                        <div className='user-rating'>
                                            <i className="fa-solid fa-star star"></i>
                                            <i className="fa-solid fa-star star"></i>
                                            <i className="fa-solid fa-star star"></i>
                                            <i className="fa-solid fa-star star"></i>
                                            <i className="fa-solid fa-star star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className='date-of-comment'>1 day ago</p>
                        </div>
                        <div className='comment'>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Modi aut cum neque et libero, sunt doloribus natus nemo odit qui,
                                numquam totam sint autem nobis nulla vel voluptatibus facere. Nisi.</p>
                        </div>
                    </div>
                </div>
                <div className='comment-section-outer-container'>
                    <div className='comment-section-inner-container'>
                        <div className='top-section-comment'>
                            <div className='uer-info-rating'>
                                <div className='user-info'>
                                    <div className='user-image'></div>
                                    <div className='stars-user-name'>
                                        <h4 className='user-name'>Eren yeager</h4>
                                        <div className='user-rating'>
                                            <i className="fa-solid fa-star star"></i>
                                            <i className="fa-solid fa-star star"></i>
                                            <i className="fa-solid fa-star star"></i>
                                            <i className="fa-solid fa-star star"></i>
                                            <i className="fa-solid fa-star star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className='date-of-comment'>1 day ago</p>
                        </div>
                        <div className='comment'>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Modi aut cum neque et libero, sunt doloribus natus nemo odit qui,
                                numquam totam sint autem nobis nulla vel voluptatibus facere. Nisi.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='recomanded-product'>
                <div className='header-recomand-product'>
                    <h3>Recomended</h3>
                    <h3>see all product <i className="fa-solid fa-arrow-right arrow" onClick={() => navigate('/Products')}></i></h3>
                </div>
            </div> */}
        </div>
    )
}

export default Detail