import { Outlet, useNavigate, Link } from "react-router";
import { auth } from "../configs/firebase";
import { signOut } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import LogoWikaToko from "../assets/img/wikaToko.png";
import Swal from "sweetalert2";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function MainLayout() {
  // protecting your page
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, []);
  // protecting your page

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
          <Link to="/" className="btn btn-ghost text-xl">
            WikaToko
          </Link>
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
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/about" className="justify-between">
                  About
                </Link>
              </li>
              <li>
                <Link to="/myproduct" className="justify-between">
                  My Product
                </Link>
              </li>
              <li>
                <Link to="/favourite" className="justify-between">
                  Favourite
                </Link>
              </li>
              <li>
                <Link to="/contactus" className="justify-between">
                  Contact Us
                </Link>
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
