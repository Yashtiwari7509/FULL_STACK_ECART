import axios from 'axios'
import useGetToken from '../../hooks/useGetToken'
import { useEffect, useState } from 'react'
import CartItems from './Carditems'
import {useNavigate} from 'react-router-dom'
import './style.css'

const PerchasePage = () => {
  const [purchased, setPurchased] = useState<any>([])
  const { headers } = useGetToken()
  const navigate = useNavigate()

  const fetchPerchase = async () => {
    const id = localStorage.getItem('userID')
    try {
      const purchasedItems = await axios.get(`http://localhost:3001/profile/items/${id}`, {
        headers
      })
      const data = purchasedItems.data
      setPurchased(data)
    } catch (error) {
      navigate('/auth')
      console.log(error);
    }
  }
  useEffect(() => {
    fetchPerchase()
  }, [])

  return (
    <div className='card-parent'>
      <h1 style={{ color: 'wheat' }}>Happy Shopping!</h1>
      {purchased.map((product: any, key: any) => (
        <CartItems key={key} product={product} />
      ))}
      <h1 style={{ color: 'white' }}>Your Purchased Items</h1>
    </div>
  )
}

export default PerchasePage