import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/feature/product/productSlice";
import UploadWidget from "../components/UploadWidget.jsx";
useDispatch;

export default function MyProductPage() {
  const { user } = useContext(AuthContext);
  const [Name, setName] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [Price, setPrice] = useState();
  const [Stock, setStock] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submitProduct(e) {
    e.preventDefault();
    try {
      const product = {
        Name,
        ImageUrl,
        Price,
        Stock,
      };
      dispatch(addProduct(product));
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Produk berhasil ditambahkan.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan saat menambahkan produk.",
      });
    }
  }

  useEffect(() => {}, []);
  return (
    <>
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {user && (
            <h2 className="text-2xl text-center font-semibold mb-2">
              Hai {user.email}
            </h2>
          )}
          <h1 className="text-4xl font-bold text-center mb-6">Add Product</h1>

          <div className="card bg-base-100">
            <div className="card-body">
              <form onSubmit={submitProduct}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Product Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Sunscreen Spray"
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
                  <div className="flex flex-row gap-2">
                    <input
                      type="text"
                      placeholder="https://uploadfotoprodukmu.com/image.jpg"
                      className="input input-bordered w-full"
                      value={ImageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      disabled={true}
                    />
                    <UploadWidget setImageUrl={setImageUrl} />
                  </div>
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    placeholder="500000"
                    className="input input-bordered w-full"
                    value={Price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Stock</span>
                  </label>
                  <input
                    type="number"
                    placeholder="10"
                    className="input input-bordered w-full"
                    value={Stock}
                    onChange={(e) => setStock(Number(e.target.value))}
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
