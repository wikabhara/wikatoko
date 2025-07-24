import { createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
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
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchProductsById = (idProduct) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const docRef = doc(db, "products", idProduct);
    const docSnap = await getDoc(docRef);

    const product = {
      Name: docSnap.data().Name,
      ImageUrl: docSnap.data().ImageUrl,
      Price: docSnap.data().Price,
      Stock: docSnap.data().Stock,
    };
    dispatch(setProduct(product));
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
      Stock: product.Stock,
    });
    dispatch(fetchProducts());
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteProduct = (idProduct) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await deleteDoc(doc(db, "products", idProduct));
    dispatch(fetchProducts());
  } catch (error) {
    console.log(error);
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const editProductByID = (product) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const docRef = doc(db, "products", product.id);
    await updateDoc(docRef, {
      Name: product.Name,
      ImageUrl: product.ImageUrl,
      Price: product.Price,
      Stock: product.Stock,
    });
    dispatch(fetchProducts());
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export default productSlice.reducer;
