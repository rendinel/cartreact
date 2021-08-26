const reducer = (state, action) => {
  //{2} we setup what the clear function does if action type is clear cart we are going to simply return an object with the old value of state who remain the same and we set only cart to be an empty array,then in cart container we will display a section if the cart length is 0
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }
  //{3} we setup what the remove function does if action type is remove we are going to simply return an object with the old value of state who remain the same and we set only cart to be a new array where the cartItem id does not match the id that i'm passing from the payload it will return that id in the new cart array
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    }
  }
  //{4} if id of cart item is equal to the id i'm passing from payload tempcart will be equal to the old value from cartItem and i add one to the amount
  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 }
      }
      return cartItem
    })
    //{4} we return the old state and we modify cart to be equal to tempcart
    return { ...state, cart: tempCart }
  }
  // {5} first part have the same functionality of increase but if i decrease the amount to less than 0 i'm going to remove the item
  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 }
        }
        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0)
    //{5} we return the old state and we modify cart to be equal to tempcart
    return { ...state, cart: tempCart }
  }
  //{6} we deconstruct the data total and amount from the state object then we iterate of the object defining a carttotal and the cartItem, we deconstrcut the price and amount from the data,we setup the itemtotal to be equal to price *amount,we add the itemtotal to out cartTotal.total and  we add the amount to our cartTotal.amount ,we return cartotal,i also pass the object where i return total and amount set at 0, i round the total to 2 value after the coma and then i return state where i want to modify only total and amount
  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem
        const itemTotal = price * amount

        cartTotal.total += itemTotal
        cartTotal.amount += amount
        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      }
    )
    total = parseFloat(total.toFixed(2))

    return { ...state, total, amount }
  }
  //{7} if action type is true i simply set loading to true displaying the container with ...loading
  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }
  //{7} as soon as the api fill response and cart into context then i'm going to set thr cart inside state to be equal to the action.payload that i pass and that are the data from the api and i set loading to false so i don't display the loading container
  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false }
  }
  //{8} we pass 2 payload and we check what payload i'm clicking from the cartitem btn,otherwise it's the same function from increase and decrease
  if (action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === 'inc') {
            return { ...cartItem, amount: cartItem.amount + 1 }
          }
          if (action.payload.type === 'dec') {
            return { ...cartItem, amount: cartItem.amount - 1 }
          }
        }
        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0)
    return { ...state, cart: tempCart }
  }
  throw new Error('no matching action type')
}

export default reducer
