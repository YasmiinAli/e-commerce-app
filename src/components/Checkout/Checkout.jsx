import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { checkOutSession } from '../../store/Cart/CartSlice'
import { useLocation } from 'react-router-dom'

export default function Checkout() {
    let dispatch = useDispatch()
      let location = useLocation();
      console.log(location.state.data._id)

  let validationSchema = Yup.object({
    details: Yup.string()
      .required('details is required')
      .min(3, 'min length 3 char')
      .max(20, 'max length 20 char'),
    phone: Yup.string()
      .required('Enter your phone')
      .matches(/^01[0125][0-9]{8}$/, 'Enter valid number'),
    city: Yup.string().required('Enter your city'),
  })
  let checkOutForm = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema,
    onSubmit: submitForm,
  })

  async function submitForm(id,values) {
    id = location.state.data._id;
    let {payload} = await dispatch(checkOutSession(id,values))
    console.log(payload.data.session.url)
    window.location.href = payload.data.session.url
      
    

  }
  return (
    <div className="container p-5 col-md-6 m-auto">
      <form onSubmit={checkOutForm.handleSubmit}>
        <div>
          <label htmlFor="details">Details</label>
          <input
          onBlur={checkOutForm.handleBlur}
            onChange={checkOutForm.handleChange}
            type="text"
            name="details"
            id="details"
            value={checkOutForm.values.details}
            className="form-control mb-2"
          />
          {checkOutForm.touched.details ? <p className='text-danger'>{checkOutForm.errors.details}</p> :''}
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
          onBlur={checkOutForm.handleBlur}
            onChange={checkOutForm.handleChange}
            type="tel"
            name="phone"
            id="phone"
            value={checkOutForm.values.phone}
            className="form-control mb-2"
          />
          {checkOutForm.touched.phone ? <p className='text-danger'>{checkOutForm.errors.phone}</p> :''}
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
          onBlur={checkOutForm.handleBlur}
            onChange={checkOutForm.handleChange}
            type="text"
            name="city"
            id="city"
            value={checkOutForm.values.city}
            className="form-control mb-2"
          />
          {checkOutForm.touched.city ? <p className='text-danger'>{checkOutForm.errors.city}</p> : ''}  
        </div>
        <button className="btn bg-main text-white w-100" type="submit">
          Pay Now
        </button>
      </form>
    </div>
  )
}
