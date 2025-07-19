import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function CartPage() {
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

          <h1 className="text-4xl md:text-6xl font-bold text-base-content animate-pulse">
            Keranjangmu Masih Kosong!
          </h1>
          <p className="text-base-content/70 mt-4">
            Stay tuned for our grand opening.
          </p>
        </div>
      </div>
    </>
  );
}
