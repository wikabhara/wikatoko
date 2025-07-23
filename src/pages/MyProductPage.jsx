import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function MyProductPage() {
  const { user } = useContext(AuthContext);
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

            <form action="">
              <div>
                <label htmlFor="">Product Name</label>
                <br />
                <input type="text" />
              </div>
              <div>
                <label htmlFor="">Image URL</label>
                <br />
                <input type="text" />
              </div>
              <div>
                <label htmlFor="">Price</label>
                <br />
                <input type="text" />
              </div>
              <button type="button" className="btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
