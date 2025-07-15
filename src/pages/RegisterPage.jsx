import React from "react";

export default function RegisterPage() {
  return (
    <div>
      <h1>Register Page</h1>
      <form action="">
        <div>
          <label htmlFor="">Email</label>
          <br />
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <br />
          <input type="password" />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
}
