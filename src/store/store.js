import prouctReducer from "./Product/ProductSlice";
import categoryReducer from './Category/CategorySlice'
import BrandReducer from "./Brand/BrandSlice";
import cartReducer from "./Cart/CartSlice";

const { configureStore } = require("@reduxjs/toolkit");


export let store = configureStore({
    reducer : {
        product:prouctReducer,
        category:categoryReducer,
        brand:BrandReducer,
        cart:cartReducer
    }
})
