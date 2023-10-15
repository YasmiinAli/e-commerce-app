import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'https://ecommerce.routemisr.com'
export let getAllBrands = createAsyncThunk('brands/getAllBrands',async ()=> {
    let {data} = await axios.get(`${baseUrl}/api/v1/brands`);
    return data.data
} )

let brandSlice = createSlice({
    name:'brands',
    initialState: {
        brandsList :[],
        isLoading:false
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBrands.fulfilled,(state,action)=>{
            state.brandsList = action.payload
            state.isLoading = false
        });
        builder.addCase(getAllBrands.pending,(state, action)=> {
            state.isLoading = true
        })
    }
})

export default brandSlice.reducer