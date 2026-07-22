import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/CartSlice";
import wishlistReducer from "../redux/WishlistSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;