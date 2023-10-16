import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'https://ecommerce.routemisr.com';
let token = localStorage.getItem('userToken')

export let GetLoggedUserCart = createAsyncThunk('cart/GetLoggedUserCart',async ()=>{
    return await axios.get(`${baseUrl}/api/v1/cart`,{headers:{token}})
    .then((response)=> response)
    .catch((error)=> error)
}) 

export let AddProductToCard = createAsyncThunk('cart/AddProductToCard',async (id)=> {
    let {data} = await axios.post(`${baseUrl}/api/v1/cart`,{"productId": id},{headers:{token}})
console.log(data.data);
return data.data
}
)

export let updateProductQuantity = createAsyncThunk('cart/updateProductQuantity',async (id,count)=> {
    let res = await axios.put(`${baseUrl}/api/v1/cart/${id}`,{"count":count},{headers:{token}})
    console.log(res)
    return res;
})

export let removeSpecificItem = createAsyncThunk('cart/removeSpecificItem',async (id)=> {
    let res = await axios.delete(`${baseUrl}/api/v1/cart/${id}`,{headers:{token}})
    // console.log(res)
    return res
    
})

export let ClearUserCart = createAsyncThunk('cart/ClearUserCart',async ()=>{
    let response = await axios.delete(`${baseUrl}/api/v1/cart`,{headers:{token}});
    return response;
})

export let checkOutSession = createAsyncThunk('cart/checkOutSession',async (id,address)=> {
    let res = await axios.post(`${baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,{"shippingAddress":address},{headers:{token}})
        console.log(res);
        return res
})

let CartSlice = createSlice({
    name:'cart',
    initialState: {
        cart:[],
        isLoading : false,
    },
    extraReducers:(builder)=> {
        builder.addCase(GetLoggedUserCart.fulfilled,(state, action)=>{
            state.isLoading = false
            state.cart = action.payload
        });
        builder.addCase(GetLoggedUserCart.pending,(state, action)=>{
            state.isLoading = true
        });
        builder.addCase(updateProductQuantity.fulfilled,(state, action)=>{
            console.log(action)
            state.cart = action.payload
        });
             builder.addCase(removeSpecificItem.fulfilled,(state, action)=>{
            state.cart = action.payload
        });
        builder.addCase(ClearUserCart.fulfilled,(state,action)=> {
            state.cart = action.payload
        })
     
      
      
    }
})


export default CartSlice.reducer;