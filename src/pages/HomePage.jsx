import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useNavigate } from "react-router";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  async function getProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    const result = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setProducts(result);
  }

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
          await deleteDoc(doc(db, "products", id));
          console.log("succesfully delete product with id", id);
          await getProducts();
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
    getProducts();
  }, []);

  return (
    <>
      <div className="bg-base-200 min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            {user && (
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                Hai {user.email}
              </h2>
            )}
            <h1 className="text-4xl font-bold">Product List</h1>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={() => navigate("/myproduct/add")}
              type="button"
              className="btn btn-primary"
            >
              Add New Product
            </button>
          </div>
          <main>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                  <div key={p.id} className="card bg-base-100">
                    <figure className="px-6 pt-6">
                      <img
                        src={p.ImageUrl}
                        alt={p.Name}
                        className="h-48 w-full object-contain"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{p.Name}</h2>
                      <p className="text-lg font-semibold text-primary">
                        Rp {Number(p.Price).toLocaleString("id-ID")}
                      </p>
                      <div className="card-actions justify-end mt-4">
                        <button
                          onClick={() => navigate(`/products/edit/${p.id}`)}
                          className="btn btn-outline btn-sm btn-info"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="btn btn-outline btn-sm btn-error"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p>Belum ada produk. Silakan tambahkan produk baru.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
