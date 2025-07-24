import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../configs/firebase";

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setProduct, setLoading, setError } =
  productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const result = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    dispatch(setProducts(result));
    console.log(result);
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addProduct = (product) => async (dispatch) => {
  try {
    await addDoc(collection(db, "products"), {
      Name: product.Name,
      ImageUrl: product.ImageUrl,
      Price: product.Price,
    });
  } catch (error) {
    console.log(error);
  } finally {
  }
};

export default productSlice.reducer;
