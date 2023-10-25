import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ClearUserCart,
  GetLoggedUserCart,
  removeSpecificItem,
  updateProductQuantity,
} from '../../store/Cart/CartSlice'
import { Circles } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Cart() {
  
  let {cart, isLoading } = useSelector((state) => state.cart)

  console.log(cart)
  let dispatch = useDispatch()
  let nav = useNavigate()
  useEffect(() => {
    getUserCart()
  }, [])
   function getUserCart() {
     dispatch(GetLoggedUserCart())
    
  }

  // async function updateProductCount(id, count) {
  //   let {payload} = await dispatch(updateProductQuantity(id, count))
  //   console.log(payload, id, count)
  //    setcartDetails(payload.data);
  // }
   function removeItem(id) {
     dispatch(removeSpecificItem(id))
    
  }

  function clearCart() {
    dispatch(ClearUserCart())
    getUserCart()
  }

  const handleNotification = () => toast.error('There is no products in this cart', {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
  function checkOut() {
     if(cart.data.status === 'success') {
        nav('/checkout' ,{state: cart.data})
     }
//      else {
//       nav('/cart')
// handleNotification()
//      }
  }
  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center ">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="container bg-main-light mx-auto mt-3 mb-3 p-3">
          <h3>Cart Shop</h3>
          <p>
            total price :{' '}
            <span className="text-main">
              {cart.data?.data.totalCartPrice
                ? cart.data?.data.totalCartPrice
                : 0}
            </span>
          </p>

          {cart.data?.data.products?.length > 0 ? (
            <>
              {cart.data.data.products?.map((product, index) => (
                <div className="row border-bottom mb-2" key={index}>
                  <div className="col-md-9">
                    <div className="row mb-2">
                      <div className="col-md-3">
                        <img
                          src={product.product.imageCover}
                          alt="productImg"
                          className="w-100"
                        />
                      </div>
                      <div className="col-md-9">
                        <p>{product.product.title}</p>
                        <p className="text-main">price: {product.price}EGP</p>
                        <button
                          className="btn bg-main text-white"
                          onClick={() => removeItem(product.product.id)}
                        >
                          Remove <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <button
                      className="btn bg-main text-white "
                      // onClick={() =>
                      //   updateProductCount(
                      //     product.product.id,
                      //     `${product.count + 1}`,
                      //   )
                      // }
                    >
                      {' '}
                      +{' '}
                    </button>
                    <span className="mx-2">{product.count}</span>
                    <button className="btn bg-main text-white "> - </button>
                  </div>
                </div>
              ))}{' '}
            </>
          ) : (
            <div>No cart Items</div>
          )}
          <div className="row">
            <div className="col-md-4">
              <button
                className="btn bg-main text-white w-100"
                onClick={clearCart}
              >
                Clear Cart <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
            <div className="col-md-4">
              <button
                className="btn bg-main text-white w-100"
                onClick={checkOut}
              >
                Check Out <i className="fa-regular fa-credit-card "></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
