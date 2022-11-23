import React from 'react'
import { selectUser } from '../app/userSlice'
import { useDispatch } from 'react-redux'
import Card from '../component/Card'
import { useSelector } from 'react-redux'
import { selectProducts } from '../app/productSlice'
import './favorite.css'

function Favorite() {
  window.scrollTo(0, 0);
  // get the data of the user from redux
  const data = useSelector(selectUser)
  // get the data of product from redux
  const products = useSelector(selectProducts)
  if (data.favorite.length === 0) {
    return (
      <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='no-favorite'>
        <h1 style={{ textAligne: 'center' }}>You Have Not Added Any Product Yet</h1>
      </div>
    )
  }
  else {
    return (
      <div className='card-outer-container'>
        <div className='card-inner-container'>
          {products?.map((product) => {
            // if the product exist in user data print the card the screen
            const exist = data?.favorite?.find((id) => id === product.id)
            if (exist) {
              return (
                <Card key={product?.id}
                  title={product?.name}
                  price={product?.Price}
                  url={product?.URL}
                  id={product?.id}
                  description={product?.Description}
                  exist={exist}
                />

              )
            }
          })}
        </div>
      </div>
    )
  }

}

export default Favorite