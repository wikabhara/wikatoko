import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useNavigate } from "react-router";

export default function MyProductPage() {
  const { user } = useContext(AuthContext);
  const [Name, setName] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [Price, setPrice] = useState(0);
  const navigate = useNavigate();

  async function submitProduct(e) {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "products"), {
        Name: Name,
        ImageUrl: ImageUrl,
        Price: Price,
      });
      console.log(docRef);
      console.log("produk berhasil ditambahkan", Name);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {}, []);
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
              Add Product
            </h1>

            <form onSubmit={submitProduct} action="">
              <div>
                <label htmlFor="">Product Name</label>
                <br />
                <input
                  type="text"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Image URL</label>
                <br />
                <input
                  type="text"
                  value={ImageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Price</label>
                <br />
                <input
                  type="number"
                  value={Price}
                  onChange={(e) => setPrice(+e.target.value)}
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
