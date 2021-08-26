import React from 'react'
import { useGlobalContext } from './context'
const CartItem = ({ id, img, title, price, amount }) => {
  //{3} we import all the function we need from the useglobalcontext
  const { remove, increase, decrease, toggleAmount } = useGlobalContext()
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        {/* {3} remove button  on click we call remove passing the id as a parameter */}
        <button className='remove-btn' onClick={() => remove(id)}>
          remove
        </button>
      </div>
      <div>
        {/* {4} increase amount on click we call increase passing the id as a parameter */}
        {/* <button className='amount-btn' onClick={() => increase(id)}></button> */}
        {/* {8} we pass 2 paramether so we can check inside the reducer and act the proper way */}
        <button className='amount-btn' onClick={() => toggleAmount(id, 'inc')}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
          </svg>
        </button>
        {/* amount */}
        <p className='amount'>{amount}</p>
        {/* {5} decrease amount on click we call decrease passing the id as a parameter */}
        {/* <button className='amount-btn' onClick={() => decrease(id)}></button> */}
        {/* {8} we pass 2 paramether so we can check inside the reducer and act the proper way*/}
        <button className='amount-btn' onClick={() => toggleAmount(id, 'dec')}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </button>
      </div>
    </article>
  )
}

export default CartItem
