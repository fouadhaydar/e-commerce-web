import React from 'react'
import { deleteProduct, selectUser } from '../app/userSlice'
import { useSelector } from 'react-redux'
import { selectProducts } from '../app/productSlice'
import { useState, useEffect } from 'react'
import Card from './Card'
import './cart.css'
import { useDispatch } from 'react-redux'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import CartElement from './CartElement'
import RippleButton from './RippleBtn'

function Cart() {
    const productsInCart = useSelector(selectUser)
    const allProducts = useSelector(selectProducts)
    let price = 0
    const dispatch = useDispatch()
    // store products ids in locale storage 
    function handelBuy() {
        alert('your succesfuly complete the process think you')
        productsInCart.cart.forEach(element => {
            dispatch(deleteProduct(element))
        })
    }
    if (productsInCart?.cart.length === 0) {
        return (
            <div style={{ height: "100vh", position: 'relative', maxWidth: "1200px", margin: 'auto' }}>
                <Player
                    autoplay
                    loop
                    src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                    className='cart-player'
                >
                    <Controls />
                </Player>
            </div>
        )
    }
    // cart-product-inner-container
    return (
        <div className='cart-product-outer-container' >
            <div className='cart-product-inner-container'>
                {
                    // map through all product calculate and print the cart product 
                    allProducts.map(product => {
                        const exist = productsInCart.cart.find(itemId => itemId === product.id)
                        const productNumber = productsInCart.productPices.find(pice => pice.id === exist)
                        if (exist) {
                            if (productNumber?.number) {
                                let newPrice = product.Price * productNumber?.number
                                price += newPrice
                            }
                            else {
                                price += product.Price
                            }

                            return (
                                <CartElement
                                    url={product?.URL}
                                    name={product?.name}
                                    price={product?.Price}
                                    id={product?.id}
                                    number={productNumber?.number ? productNumber?.number : 1}
                                />
                            )
                        }
                    })
                }
            </div>
            {price > 0 && <div className='price-container'>
                <h2 className='price' >Price Of All Items: ${price}</h2>
                <RippleButton onClick={() => handelBuy()}> Buy Now </RippleButton>
            </div>}
        </div>
    )
}

export default Cart