import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };

  return (
    <div className="w-1/4 border p-8 rounded-md">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-slate-200 my-2 p-4 rounded-md"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-slate-200 my-2 p-4 rounded-md"
        />
        <button
          type="submit"
          className="w-full border border-slate-200 my-2 p-4 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
