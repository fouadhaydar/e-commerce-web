import React from 'react'
import './card.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser, userData } from '../app/userSlice'
import { addToCart } from '../app/userSlice'
import { doc, setDoc } from 'firebase/firestore'
import db from './firebase/firebase'
import { useDispatch } from 'react-redux'
import { setFavorite } from '../app/userSlice'
import { deleteProduct } from '../app/userSlice'
import RippleButton from './RippleBtn'
import { selectProducts } from '../app/productSlice'


function Card({ title, price, url, id, description, exist, cart, rating, cat }) {
    const [globaleRate, setGlobaleRate] = useState(0)
    // get the initial state
    const dataUser = useSelector(selectUser)
    // define state for favorite
    const [favorit, setFavorit] = useState()

    // navigate to other page
    const navigate = useNavigate()

    // add product id to redux when user add to cart
    const dispatch = useDispatch()

    const products = useSelector(selectProducts)

    // check if favorite is in fierstore
    useEffect(() => {
        if (exist) {
            setFavorit(true)
        }
    }, [exist])


    // change the heart class
    function handelFavorite() {
        if (dataUser.email) {
            setFavorit(prev => !prev)
            // store all the data of the user in a variable and handel new favorites
            const myDoc = dataUser
            if (myDoc.favorite.find((oldId) => oldId === id)) {
                const newIds = myDoc.favorite.filter((oldId) => oldId !== id)
                // add new array of favorite to redux
                dispatch(setFavorite(newIds))
                // set favorite in fierstore
                setDoc(doc(db, 'users', myDoc.id), {
                    ...myDoc,
                    favorite: newIds
                })
            }
            // add product to favorite
            else {
                // add new array to redux
                dispatch(setFavorite([id, ...myDoc.favorite]))
                // add favorite to fierstore
                setDoc(doc(db, 'users', myDoc.id), {
                    ...myDoc,
                    favorite: [id, ...myDoc.favorite]
                })
            }
        }
        else {
            navigate('/register')
        }

    }

    function handleDetail(e) {
        // navigate to the detail page after some conditions
        if (e.target.className !== 'fa-solid fa-heart heart'
            && e.target.className !== 'fa-regular fa-heart heart'
            && e.target.className !== 'add-to-cart-btn'
            && e.target.className !== 'fa-solid fa-trash heart'
            && e.target.className !== 'ripple-button'
            && e.target.className !== 'ripple-content'
        ) {
            navigate(`/detail/${id}`, { state: { price, url, title, description, rating, cat, globaleRate } })
        }
    }

    function addProductToCart(id) {
        if (dataUser.cart.find((itemId) => itemId === id)) {
            alert('the item was exist')
        }
        else {
            dispatch(addToCart(id))
        }

    }
    function deleteFromCart(id) {
        dispatch(deleteProduct(id))
    }
    function handleBuy(id) {
        alert('your succesfuly complete the process think you')
        deleteFromCart(id)
    }
    const productRating = products.find(product => product.id === id)
    useEffect(() => {
        let initialValue = 0
        if (productRating?.rating) {
            productRating.rating.forEach((currentValue) => {
                if (currentValue.number > 0) {
                    initialValue += currentValue.stars
                }
            }, 0)
            let numberSum = productRating.rating.reduce((initialValue, currentValue) => {
                return (initialValue + currentValue.number)
            }, 0)
            if (numberSum > 0) {
                setGlobaleRate(initialValue / numberSum)
            }
        }
    }, [productRating])
    return (
        <div className='card-container' onClick={handleDetail} >
            <div className='img-container'>
                {!cart && <i className={`${(favorit) ? 'fa-solid fa-heart heart' : 'fa-regular fa-heart heart'}`}
                    onClick={handelFavorite}></i>}
                <img src={url} alt="furniture" />
            </div>
            <div className='detail-container'>
                <div>
                    <h3>Title: {title}</h3>
                    <h3>Price: ${price}</h3>
                    <h5>{globaleRate} <i className="fa-solid fa-star"></i></h5>
                    {exist && <p>{exist}</p>}
                </div>
                {!cart && <RippleButton onClick={() => addProductToCart(id)}>Add To Cart</RippleButton>}
            </div>
        </div>
    )
}

export default Card