'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'

const ProductList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/api/products')
        const data = response.data
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <h1>COMING SOON</h1>
      <h1>COMING SOON</h1>
      <h1>COMING SOON</h1>
      <ul>
        {products.map((id, title) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
