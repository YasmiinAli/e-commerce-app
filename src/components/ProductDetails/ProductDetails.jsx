import { useLocation } from 'react-router-dom'
import { AddProductToCard, GetLoggedUserCart } from '../../store/Cart/CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import {
  AddProductToWishlist,
  removeProductFromWishList,
} from '../../store/WishListSlice/WishListSlice'

export default function ProductDetails() {
  let { isClicked } = useSelector((state) => state.wishList)
  let dispatch = useDispatch()
  let location = useLocation()
  let product = location.state
  console.log(product)

  const handleNotification = () =>
    toast.success('Product added successfully', {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })

  const handleClick = (id) => {
    dispatch(AddProductToCard(id))
    handleNotification()
    dispatch(GetLoggedUserCart())
  }

  async function handleWishList(id) {
    let { payload } = await dispatch(AddProductToWishlist(id))
    if (payload.status === 'success') {
      toast.success(`${payload.message}`, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
    return payload.data
  }

  async function removeWishList(id) {
    let {payload} =await dispatch(removeProductFromWishList(id))
    if (payload.status === 'success') {
      toast.success(`${payload.message}`, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
    return payload.data
  }
  return (
    <>
      <div className="container">
        <h3 className="m-3 fw-bolder">Product Details</h3>
        <div className="row">
          <div className="col-3">
            <img src={product.imageCover} alt="" className="w-100" />
          </div>
          <div className="col-9 ">
            <div className="d-flex justify-content-between mb-2 ">
              <h5 className="fw-bold">{product.title}</h5>

              {isClicked ? (
                <i
                  className="fa-solid fa-heart cursor-pointer text-main"
                  onClick={()=> handleWishList(product.id)}
                ></i>
              ) : 
              (
                <i className="fa-solid fa-heart cursor-pointer " ></i>)
              }
            </div>
            <p>{product.description}</p>
            <p>{product.category.name}</p>
            <div className="d-flex justify-content-between">
              <p className="card-text">{product.price} EGP</p>
              <div>
                <i className="fa-solid fa-star text-main"></i>
                <span>{product.ratingsAverage}</span>
              </div>
            </div>
            <button
              className="btn bg-main text-white w-100 mb-5"
              onClick={() => handleClick(product.id)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
