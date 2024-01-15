import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'https://ecommerce.routemisr.com';
let token = localStorage.getItem('userToken')

export let GetLoggedUserCart = createAsyncThunk('cart/GetLoggedUserCart',async ()=>{
    let res = await axios.get(`${baseUrl}/api/v1/cart`,{headers:{token}})
    // console.log(res.data.numOfCartItems)
    return res
}) 

export let AddProductToCard = createAsyncThunk('cart/AddProductToCard',async (id)=> {
    let {data} = await axios.post(`${baseUrl}/api/v1/cart`,{"productId": id},{headers:{token}})
// console.log(data.data);
return data.data
}
)

export let updateProductQuantity = createAsyncThunk('cart/updateProductQuantity',async (updatedData)=> {
    let res = await axios.put(`${baseUrl}/api/v1/cart/${updatedData.id}`,{"count":updatedData.count},{headers:{token}})
    // console.log(res)
    return res;
})

export let removeSpecificItem = createAsyncThunk('cart/removeSpecificItem',async (id)=> {
    let res = await axios.delete(`${baseUrl}/api/v1/cart/${id}`,{headers:{token}})
    // console.log(res)
    return res
    
})

export let ClearUserCart = createAsyncThunk('cart/ClearUserCart',async ()=>{
    let response = await axios.delete(`${baseUrl}/api/v1/cart`,{headers:{token}});
    console.log(response)
    return response;
})

export let checkOutSession = createAsyncThunk('cart/checkOutSession',async (id,address)=> {
    let res = await axios.post(`${baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,{"shippingAddress":address},{headers:{token}})
        // console.log(res);
        return res
})

let CartSlice = createSlice({
    name:'cart',
    initialState: {
        cart:[],
        isLoading : false,
        error:''
    },
    extraReducers: {
         [GetLoggedUserCart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [GetLoggedUserCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
      // console.log(action.payload);
    },
    [GetLoggedUserCart.rejected]: (state, action) => {
      state.isLoading = false;
      // state.error = action.payload.data.status;
    },

    [updateProductQuantity.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload)
      state.cart = action.payload;
    },
    

     [removeSpecificItem.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeSpecificItem.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    },
    [removeSpecificItem.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.data.status;
    },

     [ClearUserCart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [ClearUserCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    },
    [ClearUserCart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.data.status;
    },

     
      
      
    }
})


export default CartSlice.reducer;