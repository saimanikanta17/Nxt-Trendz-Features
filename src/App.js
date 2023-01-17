import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const productAdded = cartList.find(each => each.id === product.id)
    const filteredCart = cartList.filter(each => each.id !== product.id)
    if (productAdded === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      let {quantity} = productAdded
      quantity += 1
      const addedProduct = {...product, quantity}
      this.setState({
        cartList: [...filteredCart, addedProduct],
      })
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCart = cartList.filter(each => each.id !== id)
    this.setState({
      cartList: [...filteredCart],
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productIncrement = cartList.find(each => each.id === id)
    const filteredCart = cartList.filter(each => each.id !== id)
    let {quantity} = productIncrement
    quantity += 1
    const addedProduct = {...productIncrement, quantity}
    this.setState({
      cartList: [...filteredCart, addedProduct],
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productDecrement = cartList.find(each => each.id === id)
    const filteredCart = cartList.filter(each => each.id !== id)
    let {quantity} = productDecrement
    if (quantity > 1) {
      quantity -= 1
      const addedProduct = {...productDecrement, quantity}
      this.setState({
        cartList: [...filteredCart, addedProduct],
      })
    } else {
      this.setState({
        cartList: [...filteredCart],
      })
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
