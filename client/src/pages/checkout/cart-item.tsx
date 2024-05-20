import React, { useContext } from 'react'
import './style.css'
import { Iproduct } from '../../models/interface'
import { IshopContext, ShopContext } from '../../context/shop-context';
interface Props {
  product: Iproduct;
}
const CartItems = (props: Props) => {
  const { _id,description, imageURL, price, productName, stockQuantity } = props.product ;
  const {UpdateCartCount,addToCart,removeFromCart,getitemCount} = useContext<IshopContext>(ShopContext)
  const getItemCount = getitemCount(_id)
  console.log(getItemCount);
  
  return (
    <div className='Cart-container'>
      <div className='img-con'><img src={imageURL} alt="" /></div>
      <div className="items-description">
        <div className='product-name'>{productName}</div>
        <div className='Describes'>{description}</div>
        <div className='price-container'><h4>Price <span style={{ color: 'greenyellow' }}>${price}</span></h4><h5>{stockQuantity === 0 ? <h4 style={{ color: 'red' }}>Out Of Stock</h4> : <h4 style={{ background: 'green', borderRadius: ".7rem", padding: '.3rem .4rem' }}>In Stock</h4>}</h5></div>
        <div className="count-handler">
          <button onClick={()=>removeFromCart(_id)}>-</button>
          <input min='1' value={getItemCount} onChange={(e)=>UpdateCartCount(_id,Number(e.target.value))} type="number" />
          <button onClick={()=>addToCart(_id)}>+</button>
        </div>
      </div>
    </div>
  )
}

export default CartItems