import React from 'react'
import RippleButton from './RippleBtn'
import './cartElement.css'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../app/userSlice'


function CartElement({ url, name, number, price, id }) {
    const dispatch = useDispatch(deleteProduct())
    function handelOneItem() {
        alert('you succesfuly buy it')
        dispatch(deleteProduct(id))
    }
    function deleteFromCart(id) {
        dispatch(deleteProduct(id))
    }

    const style = {
        with: '70px',
        height: '40px',
        marginRight: '5px'
    }
    const firstLetter = name.charAt(0).toUpperCase()

    return (
        <div className='cart-outer-container'>
            <div className='image-main-container'>
                <img src={url} alt="funiture" />
            </div>
            <div className='info-main-container'>
                <h2>{`${firstLetter}${name.slice(1)}`}</h2>
                <h3>{number} Pice</h3>
                <h3>$ {price}</h3>
                <RippleButton onClick={handelOneItem} Mystyle={style}>Buy Now</RippleButton>
                <i class="fa-solid fa-trash trash" onClick={() => deleteFromCart(id)}></i>
            </div>
        </div>
    )
}

export default CartElement