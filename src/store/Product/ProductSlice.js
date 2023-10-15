import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

let initialState = { productList: [], isLoading: false }
const baseUrl = 'https://ecommerce.routemisr.com'

export let getAllProducts = createAsyncThunk('products/getAllProducts',async function () {
  let {data} = await axios.get(`${baseUrl}/api/v1/products`);
  return data.data
})

let productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers : function(builder) {
    builder.addCase(getAllProducts.fulfilled,(state, action)=>{
      state.isLoading = false;
        state.productList = action.payload
    })
    builder.addCase(getAllProducts.pending,(state, action)=> {
      state.isLoading = true
    })

  }
})

export default productSlice.reducer
