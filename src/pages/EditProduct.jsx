import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useNavigate, useParams } from "react-router";

export default function EditProductPage() {
  const { user } = useContext(AuthContext);
  const [Name, setName] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [Price, setPrice] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  async function editProduct(e) {
    e.preventDefault();
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        Name: Name,
        ImageUrl: ImageUrl,
        Price: Price,
      });
      console.log("Successfully Edit Product", id);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getProductById(idProduct) {
      try {
        const docRef = doc(db, "products", idProduct);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());

        if (docSnap.exists()) {
          setName(docSnap.data().Name);
          setImageUrl(docSnap.data().ImageUrl);
          setPrice(docSnap.data().Price);
        } else {
          console.log("Product tidak ditemukan");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProductById(id);
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
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-base-content animate-pulse">
              Edit Product
            </h1>

            <form onSubmit={editProduct} action="">
              <div>
                <label htmlFor="">Product Name</label>
                <br />
                <input
                  type="text"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="">Image URL</label>
                <br />
                <input
                  type="text"
                  value={ImageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="">Price</label>
                <br />
                <input
                  type="number"
                  value={Price}
                  onChange={(e) => setPrice(+e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
