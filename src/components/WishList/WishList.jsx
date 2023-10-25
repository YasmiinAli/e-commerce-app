import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetLoggedUserWishlist } from '../../store/WishListSlice/WishListSlice'
import ProductCard from '../ProductCard/ProductCard'
import { Circles } from 'react-loader-spinner'

export default function WishList() {
  let {wishList, isLoading} = useSelector((state)=> state.wishList)
  console.log(wishList)
  let dispatch = useDispatch()
  useEffect( ()=>{
    getWishList()
  },[])
  async function getWishList() {
    let {payload} = await dispatch(GetLoggedUserWishlist())
    return payload.data
  } 
  return (
    <div>
      <div className='container mt-4'>
      <h2 className='text-main'>WishList</h2>
  {
    isLoading ?
    <div className='d-flex justify-content-center align-items-center'>
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
    :
    <div className="row">
      {wishList.data?.length > 0 ?
        <>
        {wishList.data?.map((product, index)=>
    (<div
                      className="col-md-2 product cursor-pointer mb-3 p-2"
                      key={index}
                    >
                      <ProductCard product={product} />
                    </div>)
    )}
        </>
        :
        <div className='alert alert-light'>
 No Products in WishList 
        </div>
    }
  </div>
  }
    </div>
    </div>
  )
}
