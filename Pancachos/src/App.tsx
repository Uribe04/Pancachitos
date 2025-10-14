import { useState } from 'react'
import './App.css'
import ProductCard from './components/product/productcard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductCard />
    </>
  )
}

export default App
