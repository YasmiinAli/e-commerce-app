import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../store/Category/CategorySlice'
import { Circles } from 'react-loader-spinner'

export default function Categories() {
  let { categoryList, isLoading } = useSelector((state) => state.category)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCategories())
  }, [])
  return (
    <div>
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
        <>
          <div className="container mt-4 ">
            <h2 className='text-main mb-4' >All Categories</h2>
            <div className="row">
              {categoryList.map((category, index) => (
                <div className="col-md-4 mb-3 " key={index}>
                  <div className="card">
                    <img
                      className="card-img-top w-100 categoryImg"
                      src={category.image}
                      alt="Card"
                    />
                    <div className="card-body">
                      <h5 className="font-weight-bold text-center text-main">
                        {category.name}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        
</>
      }
      
    </div>
  )
}
