import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'https://ecommerce.routemisr.com';
let token = localStorage
.getItem('userToken')

export let AddProductToWishlist = createAsyncThunk('wishList/AddProductToWishlist',async (id)=> {
    let {data} =await axios.post(`${baseUrl}/api/v1/wishlist`,{"productId": id},{headers:{token}})
    console.log(data);
    return data;

}) 
export let removeProductFromWishList = createAsyncThunk('wishList/removeProductFromWishList',async (id)=>{
    let {data} = await axios.delete(`${baseUrl}/api/v1/wishlist/${id}`, {headers:{token}})
    console.log(data);
    return data
})

export let GetLoggedUserWishlist = createAsyncThunk('wishlist/GetLoggedUserWishlist', async ()=> {
    let {data} =await axios.get(`${baseUrl}/api/v1/wishlist`, {headers:{token}})
    // console.log({data});
    return data
})

let WishListSlice = createSlice({
    name:'wishList', 
       initialState:{
        wishList:[],
        isLoading:false,
        isClicked: false
    },
    extraReducers:(builder)=> {
            builder.addCase(AddProductToWishlist.fulfilled, (state, action)=> {
                state.isClicked = true;
                console.log(action);
            });
            builder.addCase(GetLoggedUserWishlist.fulfilled, (state, action)=> {
                state.wishList = action.payload;
                state.isLoading = false;
                console.log(action);
            } )
            builder.addCase(GetLoggedUserWishlist.pending,(state, action)=> {
                state.isLoading = true;
            })
            builder.addCase(removeProductFromWishList.fulfilled,(state,action)=>{
            state.isClicked = false;
            })
    }
})


export default WishListSlice.reducer;
