import React, { useContext } from 'react'
import '../App.css'
import { Iproduct } from '../models/interface'
import { IshopContext, ShopContext } from '../context/shop-context';

interface Idata {
    products: Iproduct,
}
const ProductCards = (props: Idata) => {
    const { _id, description, imageURL, price, stockQuantity, productName } = props.products;
    const { addToCart, getitemCount } = useContext<IshopContext>(ShopContext)
    const count = getitemCount(_id)

    return (

        <div className="data">
            <div className='img-con'><img src={imageURL} alt="" /></div>
            <div className='product-name'>{productName}</div>
            <div className='Describe'>{description}</div>
            <div className='price-container'><h4>Price <span style={{ color: 'greenyellow' }}>${price}</span></h4><h5>{stockQuantity === 0 ? <h4 style={{ color: 'red' }}>Out Of Stock</h4> : <h4 style={{ background: 'green', borderRadius: ".7rem", padding: '.3rem .4rem' }}>In Stock</h4>}</h5></div>
            <button onClick={() => addToCart(_id)}>add to cart({count > 0 && <>{count}</>})</button>
        </div>
    )
}

export default ProductCards