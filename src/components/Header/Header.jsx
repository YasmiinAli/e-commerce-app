import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { GetLoggedUserCart } from '../../store/Cart/CartSlice'

export default function Header({ logOut, userData }) {
  let {cart} = useSelector((state)=>state.cart)
  let dispatch = useDispatch()
  let nav = useNavigate()
  useEffect(() => {
    getUserCart()
  }, [])
   function getUserCart() {
     dispatch(GetLoggedUserCart())
  }
let clickCart =() => {
  nav('/cart')
}

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData !== null ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link " to="home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="cart">
                    Cart
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="brands">
                    Brands
                  </Link>
                </li> */}
                {/* <li className="nav-item">
                  <Link className="nav-link" to="wishlist">
                    WishList
                  </Link>
                </li>                 */}
              </ul>
            ) : (
              ''
            )}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userData == null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link " to="register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item d-flex align-items-center cursor-pointer" onClick={clickCart}>
                    
                      <i
                        className="fa-solid fa-cart-shopping cart fa-lg"
                        value={cart.data?.numOfCartItems==null ?0 : cart.data.numOfCartItems}
                      ></i>
                    
                  </li>
                  <li className="nav-item">
                    <span className="nav-link cursor-pointer" onClick={logOut}>
                      Logout
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
