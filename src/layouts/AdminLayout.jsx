import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { auth } from "../configs/firebase";
import { onAuthStateChanged } from "firebase/auth";
import LogoWikaToko from "../assets/img/wikaToko.png";

export default function AdminLayout() {
  const [isLoadPage, setLoadPage] = useState(true); //load page trick//
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        navigate("/");
      }
      setLoadPage(false); //load page trick//
    });
  }, []);

  //load page trick//
  if (isLoadPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading....
      </div>
    );
  }

  return (
    <>
      {/* navbar */}
      <div className="navbar bg-base-100 shadow-sm">
        <img src={LogoWikaToko} alt="WikaToko Logo" className="h-16" />
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">WikaToko</a>
        </div>
      </div>
      {/* navbar */}
      <Outlet />
    </>
  );
}
