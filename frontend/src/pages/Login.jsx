import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="panel">
      <h1>登录</h1>
      <form className="form">
        <label>
          邮箱
          <input type="email" placeholder="you@example.com" />
        </label>
        <label>
          密码
          <input type="password" placeholder="请输入密码" />
        </label>
        <button type="button">登录</button>
      </form>
      <p>
        还没有账号？<Link to="/register">去注册</Link>
      </p>
    </section>
  );
}
