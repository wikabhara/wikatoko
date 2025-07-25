import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useNavigate } from "react-router";
import { FaEdit, FaTrash, FaBars } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  deleteProduct as deleteProductWithRedux,
} from "../redux/feature/product/productSlice";

export default function HomePage() {
  const navigate = useNavigate();

  const { products, isLoading, error } = useSelector((state) => state.product);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  async function deleteProduct(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(deleteProductWithRedux(id));

          dispatch(fetchProducts());
        } catch (error) {
          console.log(error);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div className="bg-base-200 min-h-screen p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-8">
              <label
                htmlFor="my-drawer"
                className="btn btn-square btn-ghost lg:hidden"
              >
                <FaBars size={20} />
              </label>
              <div className="text-center flex-grow">
                <h1 className="text-4xl font-bold">Product List</h1>
              </div>
            </div>

            <main className="bg-base-100 rounded-lg p-4">
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && (
                      <tr>
                        <td colSpan="6" className="text-center">
                          <span className="loading loading-spinner loading-lg"></span>
                        </td>
                      </tr>
                    )}
                    {!isLoading &&
                      products.length > 0 &&
                      products.map((p, index) => (
                        <tr key={p.id} className="hover">
                          <th>{index + 1}</th>
                          <td>
                            <div className="avatar">
                              <div className="w-16 rounded">
                                <img src={p.ImageUrl} alt={p.Name} />
                              </div>
                            </div>
                          </td>
                          <td className="font-bold">{p.Name}</td>
                          <td>Rp {Number(p.Price).toLocaleString("id-ID")}</td>
                          <td>{p.Stock}</td>
                          <td>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  navigate(`/products/edit/${p.id}`)
                                }
                                className="btn btn-ghost btn-xs"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="btn btn-ghost btn-xs text-error"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Sidebar  */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li className="text-xl font-bold p-4">WikaToko CMS</li>
          <li>
            <h3>Dashboard</h3>
          </li>
          <li className="mt-4">
            <button
              onClick={() => navigate("/myproduct/add")}
              className="btn btn-primary w-full"
            >
              Add New Product
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
