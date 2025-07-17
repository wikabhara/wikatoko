import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { auth } from "../configs/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) {
        navigate("/auth/login");
      }
    });
  }, []);

  return (
    <>
      {/* navbar */}
      <header>---Home Page Side---</header>
      {/* navbar */}
      <Outlet />
    </>
  );
}
