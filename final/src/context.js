import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()
// {1} our initial state of the usereducer
const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  // {1} we setup the usereducer that accept the reducer function we setup in the reducer file and our initialState
  const [state, dispatch] = useReducer(reducer, initialState)
  //{2} we define the type of clearCart inside this function,then we write the function inside the reducer
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  //{3} we defyne the type of the remove function and in the payload the id we are passing
  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }
  //{4} we defyne the type of the increase function and in the payload the id we are passing
  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id })
  }
  //{5} we defyne the type of the decrease function and in the payload the id we are passing
  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id })
  }
  //{7} i set and action if i'm loading, then i grab the data from the api with async and fetch and set them to be equal to cart
  //and then i set a display items that set my data to be qual to the data from the api
  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }
  //{8} refactor to have increase and decrease with only one function, we pass 2 paramether inside the payload so we can check inside the reducer and act the proper way
  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } })
  }
  //{7} i call fetchdata only and the first rerender with the useeffect
  useEffect(() => {
    fetchData()
  }, [])
  //{6} we setup this useeffect to run every time our cart is updated and we launch gettotals
  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' })
  }, [state.cart])
  // {1} because state it's an object we need to export with the spread operator so we can access without cicling the object
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
