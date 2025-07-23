import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function getProducts() {
      const querySnapshot = await getDocs(collection(db, "products"));
      const result = querySnapshot.docs.map((doc) => {
        console.log(doc.id);
        console.log(doc.data());
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setProducts(result);
    }
    getProducts();
  }, []);

  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center bg-base-100">
        <div className="text-center">
          {user && (
            <h2 className="text-2xl md:text-3xl font-semibold text-base-content/80 mb-4">
              Hai {user.email}
            </h2>
          )}
          <main className="flex flex-col items-center justify-center">
            <h1>Product List</h1>
            <button
              onClick={() => navigate("/myproduct/add")}
              type="button"
              className="btn">
              Add Product
            </button>
            <table className="border-2">
              <tr className="border-2">
                <th className="border-2">No</th>
                <th className="border-2">Name</th>
                <th className="border-2">Image</th>
                <th className="border-2">Price</th>
                <th className="border-2">Action</th>
              </tr>
              {products?.map((p, index) => (
                <tr key={p.id}>
                  <td className="border-2">{index + 1}</td>
                  <td className="border-2">{p.Name}</td>
                  <td className="border-2">
                    <img className="w-2xs" src={p.ImageUrl} alt={p.Name} />
                  </td>
                  <td className="border-2">{p.Price}</td>
                  <td>
                    <button type="button" className="btn">
                      Edit
                    </button>
                    <button type="button" className="btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </main>
        </div>
      </div>
    </>
  );
}
