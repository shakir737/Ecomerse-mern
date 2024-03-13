import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice"
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishList/wishlistSlice";
import sellerReducer from "../features/seller/sellerSlice";
import pCategoryReducer from "../features/category/categorySlice";
import userReducer from "../features/user/userSlice";
import countriesReducer from "../features/country/countrySlice";
import citiesReducer from "../features/city/citySlice";
import statesReducer from "../features/State/stateSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    seller: sellerReducer,
    pCategory: pCategoryReducer,
    user: userReducer,
    cities: citiesReducer,
    countries: countriesReducer,
    states: statesReducer,

  },
});
