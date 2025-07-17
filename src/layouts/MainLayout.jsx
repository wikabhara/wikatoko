import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { auth } from "../configs/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function MainLayout() {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  }
  // ini buat protect page
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) {
        navigate("/auth/login");
      }
    });
  }, []);
  // ini buat protect page

  return (
    <>
      {/* navbar */}
      <div className="navbar bg-base-100 shadow-sm">
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
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
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
                <a>Settings</a>
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
