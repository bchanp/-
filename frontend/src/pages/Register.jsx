import React from "react";

export default function Register() {
  return (
    <section className="panel">
      <h1>注册</h1>
      <form className="form">
        <label>
          姓名
          <input placeholder="请输入姓名" />
        </label>
        <label>
          邮箱
          <input type="email" placeholder="you@example.com" />
        </label>
        <label>
          手机号
          <input placeholder="请输入手机号" />
        </label>
        <label>
          密码
          <input type="password" placeholder="至少 6 位" />
        </label>
        <button type="button">注册</button>
      </form>
    </section>
  );
}
