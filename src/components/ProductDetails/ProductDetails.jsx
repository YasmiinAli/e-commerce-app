import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AddProductToCard } from '../../store/Cart/CartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  let dispatch = useDispatch()
  let location = useLocation();
  let product = location.state;
  console.log(product);
  
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

const handleClick = (id) => {
  dispatch(AddProductToCard(id))
  handleNotification()
}
  
  return (
    <>
    <div className="container">
      <h3 className='m-3 fw-bolder'>Product Details</h3>
      <div className="row">
        <div className="col-3"><img src={product.imageCover} alt=""  className='w-100' /></div>
        <div className="col-9">
          <h5 className='fw-bold'>{product.title}</h5>
          <p>{product.description}</p>
          <p>{product.category.name}</p>
              <div className='d-flex justify-content-between'>
          <p className="card-text">{product.price} EGP</p>
<div>
        <i className="fa-solid fa-star text-main"></i><span>{product.ratingsAverage}</span>
</div>
    </div>
    <button className='btn bg-main text-white w-100' onClick={()=>handleClick(product.id)} >Add to cart</button>
        </div>
      </div>
    </div>
    </>
  )
}
