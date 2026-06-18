import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { request } from "../api/request.js";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await request.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/services");
    } catch (err) {
      setError(err.response?.data?.message || "登录失败，请检查账号和密码。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel">
      <h1>登录</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          邮箱
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          密码
          <input
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {error ? <p className="errorText">{error}</p> : null}
        <button type="submit" disabled={loading}>
          {loading ? "登录中..." : "登录"}
        </button>
      </form>
      <p>
        还没有账号？<Link to="/register">去注册</Link>
      </p>
    </section>
  );
}

