import React from 'react'
import './style.css'

const Carditems = ({product}) => {
    const { imageURL, productName, description, price, stockQuantity } = product
    
  return (
      <div className="data-pur">
          <div className='img-con'><img src={imageURL} alt="" /></div>
          <div className="container">
              <div className='product-name'>{productName}</div>
              <div className='Describes'>{description}</div>
          <div className='price-containers'><h4>Price <span style={{ color: 'greenyellow'  }}>${price}</span></h4></div>
          </div>
      </div>
  )
}

export default Carditems