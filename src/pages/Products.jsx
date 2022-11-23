import React from 'react'
import Card from '../component/Card'
import './product.css'
import { useSelector } from 'react-redux'
import { selectProducts } from '../app/productSlice'
import { selectUser } from '../app/userSlice'
import { Player } from '@lottiefiles/react-lottie-player'

function Products() {
    window.scrollTo(0, 0);
    const data = useSelector(selectProducts)
    const userdata = useSelector(selectUser)

    if (data.length === 0) {
        return (
            <div style={{ width: '100px', height: '100vh' }}>
                <Player
                    autoplay
                    loop
                    src="https://assets4.lottiefiles.com/packages/lf20_kevlSvgFdb.json"
                    className='product-player'>
                </Player>
            </div>
        )
    }
    if (userdata) {
        return (
            <div className='products-page'>
                <div className='product-grid'>
                    {data?.map(item => {
                        const exist = userdata?.favorite?.find(id => id === item.id)
                        return (
                            <Card
                                key={item?.id}
                                title={item?.name}
                                price={item?.Price}
                                url={item?.URL}
                                id={item?.id}
                                description={item?.Description}
                                exist={exist}
                                cat={item?.Category}
                            />
                        )
                    }
                    )}
                </div>
            </div>
        )
    }

}

export default Products