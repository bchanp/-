import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { request } from "../api/request.js";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await request.post("/auth/register", {
        ...form,
        phone: form.phone || undefined
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/services");
    } catch (err) {
      setError(err.response?.data?.message || "注册失败，请稍后再试。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel">
      <h1>注册</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          姓名
          <input
            placeholder="请输入姓名"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
          />
        </label>
        <label>
          邮箱
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
        </label>
        <label>
          手机号
          <input
            placeholder="请输入手机号"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
        </label>
        <label>
          密码
          <input
            type="password"
            placeholder="至少 6 位"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            required
          />
        </label>
        {error ? <p className="errorText">{error}</p> : null}
        <button type="submit" disabled={loading}>
          {loading ? "注册中..." : "注册"}
        </button>
      </form>
    </section>
  );
}

