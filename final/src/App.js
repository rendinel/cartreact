import React from 'react'
import { useGlobalContext } from './context'

// components
import Navbar from './Navbar'
import CartContainer from './CartContainer'
// items

function App() {
  //{1} we import the loading value from our initial state in context.js
  const { loading } = useGlobalContext()
  if (loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App
