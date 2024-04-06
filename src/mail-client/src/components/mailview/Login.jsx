import React, { useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";

import { authState } from "../../state/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useRecoilState(authState);

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
        email,
        password,
      });
      const { user = "", token = "" } = res.data.data;
      localStorage.setItem("token", token);
      setAuth((prev) => {
        return {
          ...prev,
          user,
          token,
          isAuth: true,
        };
      });
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    login();
  };

  return (
    <div className="w-1/4 border p-8 rounded-md">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-slate-200 my-2 p-4 rounded-md"
          required
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-slate-200 my-2 p-4 rounded-md"
          required
        />
        <button
          type="submit"
          className="
            w-full border border-slate-200 my-2 p-4 rounded-md 
            hover:bg-teal-500 hover:text-white transition
          "
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
