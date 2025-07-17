import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { auth } from "../configs/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AdminLayout() {
  const navigate = useNavigate();

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
      <header>---Admin Side---</header>
      {/* navbar */}
      <Outlet />
    </>
  );
}
