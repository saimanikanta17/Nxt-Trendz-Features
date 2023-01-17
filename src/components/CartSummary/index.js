import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalAmount = 0
      cartList.forEach(cartItem => {
        totalAmount += cartItem.price * cartItem.quantity
      })

      return (
        <>
          <div className="cart-summary-card">
            <h1 className="total">
              Order Total: <span className="amount">{totalAmount}/-</span>
            </h1>
            <p className="no-of-items">{cartList.length} Items in cart</p>
            <button type="button" className="check-out-btn">
              Checkout
            </button>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
