import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function ContactPage() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <div className="flex items-center justify-center">Contact Page side</div>
    </>
  );
}
