import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AddProductToCard, GetLoggedUserCart } from '../../store/Cart/CartSlice'
import toast from 'react-hot-toast';
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
// let {cart} = useSelector((state)=>state.cart)
    let dispatch = useDispatch();


  const handleNotification = () => toast.success('Product added successfully', {
position: "top-right",
autoClose: 4000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});

  let nav = useNavigate();
  const clickCard = () => {
    nav(`/ProductDetails/${product.id}`, { state: product })
  }
  
  const handleClick = (id) => {
  dispatch(AddProductToCard(id))
  handleNotification()
    dispatch(GetLoggedUserCart())
}

  return (
    <>
      <>
            <div>
          <div onClick={clickCard}>
            <img src={product.imageCover} className={styles.cardImg} alt="..." />
          <div className="card-body">
            <p className="card-text text-main">{product.category.name}</p>
            <p className="card-text">{product.title.split(' ').splice(0,2).join(' ')}</p>
            <div className="d-flex justify-content-between">
              <p className="card-text">{product.price} EGP</p>
              <div>
                <i className="fa-solid fa-star text-main"></i>
                <span>{product.ratingsAverage}</span>
              </div>
            </div>
          </div>
          </div>
                <button className='btn bg-main text-white w-100' onClick={() => handleClick(product.id)} >Add to cart</button>
        </div>
      </>
    </>
  )
}
