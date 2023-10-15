import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'https://ecommerce.routemisr.com'

export let getAllCategories = createAsyncThunk('category/getAllCategories',async function() {
    let {data} =await axios(`${baseUrl}/api/v1/categories`);
    console.log(data.data);
    return data.data;
})
let categorySlice = createSlice({
    name:'category',
    initialState: {
        categoryList: []
        ,isLoading : false
    },
    extraReducers: function(builder){
        builder.addCase(getAllCategories.fulfilled,(state,action)=>{
            state.categoryList = action.payload
            state.isLoading = false
        })
        builder.addCase(getAllCategories.pending,(state,action)=>{
            state.isLoading = true
        })
    }
})

export default categorySlice.reducer