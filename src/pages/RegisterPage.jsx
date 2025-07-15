import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    console.log(email, password);
  }

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleRegister} action="">
        <div>
          <label htmlFor="">Email</label>
          <br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
}
