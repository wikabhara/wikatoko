import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/product/productSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
