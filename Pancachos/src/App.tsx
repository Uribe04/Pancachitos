import { useState } from 'react'
import './App.css'
import ProductCarousels from './components/layout/slidebar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductCarousels />
    </>
  )
}

export default App
