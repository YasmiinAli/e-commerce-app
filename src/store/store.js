import prouctReducer from "./Product/ProductSlice";
import categoryReducer from './Category/CategorySlice'
import BrandReducer from "./Brand/BrandSlice";
import cartReducer from "./Cart/CartSlice";
import WishListReducer from './WishListSlice/WishListSlice';
import { configureStore } from "@reduxjs/toolkit"


export let store = configureStore({
    reducer : {
        product:prouctReducer,
        category:categoryReducer,
        brand:BrandReducer,
        cart:cartReducer,
        wishList: WishListReducer
    },
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
