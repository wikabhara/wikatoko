import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function HomePage() {
  const { user, setUser } = useContext(AuthContext);
  return (
    <>
      <div className="flex items-center justify-center">
        Something awesome is comming soon!
      </div>
    </>
  );
}
