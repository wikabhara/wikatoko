import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  editProductByID,
  fetchProductsById,
} from "../redux/feature/product/productSlice";

export default function EditProductPage() {
  const { product, isLoading, error } = useSelector((state) => state.product);
  const [Name, setName] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [Price, setPrice] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  async function editProduct(e) {
    e.preventDefault();
    try {
      dispatch(editProductByID({ id, Name, ImageUrl, Price }));
      // const docRef = doc(db, "products", id);
      // await updateDoc(docRef, {
      //   Name: Name,
      //   ImageUrl: ImageUrl,
      //   Price: Price,
      // });
      Swal.fire("Berhasil!", "Produk berhasil diperbarui.", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Gagal", "Terjadi kesalahan saat memperbarui produk.", "error");
    }
  }

  useEffect(() => {
    dispatch(fetchProductsById(id));
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.Name);
      setImageUrl(product.ImageUrl);
      setPrice(product.Price);
    }
  }, [product]);

  // useEffect(() => {
  //   async function getProductById(idProduct) {
  //     try {
  //       const docRef = doc(db, "products", idProduct);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         setName(docSnap.data().Name);
  //         setImageUrl(docSnap.data().ImageUrl);
  //         setPrice(docSnap.data().Price);
  //       } else {
  //         Swal.fire("Error", "Produk tidak ditemukan.", "error");
  //       }
  //     } catch (error) {
  //       Swal.fire(
  //         "Gagal",
  //         "Terjadi kesalahan saat memperbarui produk.",
  //         "error"
  //       );
  //     }
  //   }
  //   getProductById(id);
  // }, []);
  return (
    <>
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <h1 className="text-4xl font-bold text-center mb-6">Edit Product</h1>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <form onSubmit={editProduct}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Product Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Image URL</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={ImageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={Price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                  />
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary w-full">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
