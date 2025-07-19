import { Outlet, useNavigate } from "react-router";
import { auth } from "../configs/firebase";
import { signOut } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import LogoWikaToko from "../assets/img/wikaToko.png";
import Swal from "sweetalert2";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function MainLayout() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    console.log("Pengecheckan user di MainLayout");
    if (!user) {
      navigate("/auth/login");
    }
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/auth/login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        icon: "error",
        title: errorCode,
        text: errorMessage,
      });
    }
  }

  return (
    <>
      {/* navbar */}
      <div className="navbar bg-base-100 shadow-sm">
        <img src={LogoWikaToko} alt="WikaToko Logo" className="h-16" />
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">WikaToko</a>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar">
              <div className="rounded-full text-4xl">
                <CgProfile />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>About</a>
              </li>
              <li>
                <a>Cart</a>
              </li>
              <li>
                <a>Favourite</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* navbar */}
      <Outlet />
    </>
  );
}
