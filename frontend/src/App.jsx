import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import Register from "./pages/Register.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import ServiceList from "./pages/ServiceList.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <Link className="brand" to="/">
          预约通
        </Link>
        <nav>
          <Link to="/services">服务</Link>
          <Link to="/appointments">我的预约</Link>
          <Link to="/admin">管理后台</Link>
          <Link to="/login">登录</Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/appointments" element={<MyAppointments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

