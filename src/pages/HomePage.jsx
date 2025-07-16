import { useNavigate } from "react-router";
import { auth } from "../configs/firebase";
import { signOut } from "firebase/auth";

export default function HomePage() {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div>Ada Konten Homepage</div>
      <button onClick={handleLogout}>Log Out</button>
    </>
  );
}
