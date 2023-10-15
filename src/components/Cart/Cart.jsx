import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ClearUserCart, GetLoggedUserCart, removeSpecificItem, updateProductQuantity } from '../../store/Cart/CartSlice'
import { Circles } from 'react-loader-spinner';

export default function Cart() {

  let [cartDetails, setcartDetails] = useState(null);
  let {isLoading} =useSelector((state)=>state.cart)
  
  console.log(cartDetails);
  let dispatch = useDispatch();

  useEffect(()=>{
    getUserCart();  
  },[])
  async  function getUserCart(){
let {payload} = await dispatch(GetLoggedUserCart())
setcartDetails(payload.data)
console.log(payload.data);
}


async function  updateProductCount(id,count) {
 let res = await dispatch(updateProductQuantity(id,count))
 console.log(res ,id ,count)
//  setcartDetails(payload.data);

}
  async function removeItem(id){
  let {payload} = await dispatch(removeSpecificItem(id))
  console.log(payload.data);
  setcartDetails(payload.data)
}

   function clearCart(){
    
    dispatch(ClearUserCart());
    getUserCart()
    
  }





  return (
    <>
    {
      isLoading ?
      <div className='d-flex justify-content-center align-items-center '>
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
      <div className="container bg-main-light mx-auto mt-3 mb-3 p-3">
      <h3>Cart Shop</h3>
      <p >total price : <span className='text-main'>{cartDetails?.data.totalCartPrice? cartDetails?.data.totalCartPrice : 0}</span></p>
      
        {cartDetails?.data.products?.length>0 ?
        <>
        {
          cartDetails?.data.products?.map((product,index)=>
          <div className="row border-bottom mb-2" key={index} >
<div className="col-md-9">
<div className="row mb-2">
  <div className="col-md-3">
<img src={product.product.imageCover} alt="productImg" className='w-100' />
</div>
<div className="col-md-9">
  <p>{product.product.title}</p>
  <p className='text-main'>price: {product.price}EGP</p>
  <button className='btn bg-main text-white' onClick={()=> removeItem(product.product.id)}>Remove <i className="fa-solid fa-trash"></i></button>
</div>
</div>
</div>
<div className="col-md-3">
  <button className='btn bg-main text-white ' onClick={()=>updateProductCount(product.product.id,product.count +1)}> + </button>
<span className='mx-2'>{product.count}</span>
  <button className='btn bg-main text-white '> - </button>

</div>
          </div> )
        } </>
        :
        <div>No cart Items</div> }
<button className='btn bg-main text-white w-100' onClick={clearCart}>Clear Cart <i className="fa-solid fa-trash-can"></i></button>
      
    </div>
    }
    </>
  )
}
