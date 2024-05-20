import React, { useContext } from 'react'
import useGetProduct from '../../hooks/useGetProduct'
import { Iproduct } from '../../models/interface'
import { IshopContext, ShopContext } from '../../context/shop-context'
import CartItems from './cart-item'
import './style.css'
import { useNavigate } from 'react-router-dom'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { products } = useGetProduct()
  const { getitemCount, getTotalAmount,checkout } = useContext<IshopContext>(ShopContext)
  const totalAmount = getTotalAmount()
  const Navigate = ()=>{
navigate('/auth')
  }


  return (
    <div className='CheckOut'>
      <div className="cart-name">
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart-items">
        {products.map((items: Iproduct) => {
          if (getitemCount(items._id) !== 0) {
            return <CartItems product={items} />
          }
        })}
      </div>
      <div className="navigation-billings">
        {totalAmount === 0 ? (
          <div >Your Cart is empty!</div>
        ) : (
            <><div className="bill">Subtotal : ${totalAmount}</div>
            <div className="nav-button">
              <button onClick={()=> navigate('/')}>Continue Shopping</button>
              <button onClick={checkout}>checkout</button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default CheckoutPage