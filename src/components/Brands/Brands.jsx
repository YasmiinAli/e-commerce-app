import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBrands } from '../../store/Brand/BrandSlice';
import { Circles } from 'react-loader-spinner';

export default function Brands() {
  
    let {brandsList, isLoading} = useSelector((state) => state.brand)
    let dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllBrands())
    },[])
  return (
  <>
    {
      isLoading ?
      <div className="d-flex justify-content-center align-items-center">
<Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          
        />
    </div> : 
        <div className="container">
        <h3 className='text-center p-3 text-main fs-2'>All Brands</h3>
        <div className="row">
    {brandsList?.map((brand,index)=> 
        
    <div className="col-md-3 mb-3 d-flex align-items-stretch" key={index} >
    <div className="card" >
  <img className="card-img-top" src={brand.image} alt="Card"/>
  <div className="card-body">
    <h5 className="card-title text-center">{brand.name}</h5>
</div>
  </div>
</div>

    
    )}
    </div>
    </div>
    }
  </>

  )
}
