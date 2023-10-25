import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../store/Product/ProductSlice'
import { Circles } from 'react-loader-spinner'

export default function Products() {
  let { productList, isLoading } = useSelector((state) => state.product)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  return (
    <>
      {isLoading ? (
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
      ) : (
        <div>
              <div className="container mt-4">
                <h2 className='text-main ' >All Products</h2>
                <div className="row">
                  {productList.map((product, index) => (
                    <div
                      className="col-md-2 product cursor-pointer mb-3 p-2"
                      key={index}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
              </div>
            )}
    </>
  )
}
