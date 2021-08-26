import React from 'react'
import CartItem from './CartItem'
import { useGlobalContext } from './context'

const CartContainer = () => {
  //{1} we import the cart,total value from our initial state in context.js
  const { cart, total, clearCart } = useGlobalContext()
  //{2} if the lenght of the array cart is equal to 0 we will display this section
  if (cart.length === 0) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    )
  }
  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button className='btn clear-btn' onClick={clearCart}>
          clear cart
        </button>
      </footer>
    </section>
  )
}

export default CartContainer
