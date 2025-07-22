import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebase";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const userRegistered = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/");
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
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
          <form onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="email@example.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Minimal 6 karakter"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>

            <div className="form-control mt-6 flex justify-center items-center">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm">
            Sudah punya akun?{" "}
            <Link to="/auth/login" className="link link-primary">
              Login di sini!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
