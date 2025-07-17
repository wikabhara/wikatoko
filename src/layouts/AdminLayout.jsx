import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { auth } from "../configs/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AdminLayout() {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        navigate("/");
      }
    });
  }, []);
  return (
    <>
      {/* navbar */}
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">WikaToko</a>
        </div>
      </div>
      {/* navbar */}
      <Outlet />
    </>
  );
}
