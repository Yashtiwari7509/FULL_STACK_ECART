import useGetProduct from '../../hooks/useGetProduct'
import ProductCards from '../../components/ProductCards'
import './style.css'
const ShopPage = () => {
  const { products } = useGetProduct()

  return (
    <div className='shop'>
      <div className="products">
        {products.map((product , key)=>(
          <ProductCards key={key} products = {product} />
        ))}
      </div>
    </div>
  )
}

export default ShopPage