import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Online Booking</p>
        <h1>在线预约系统</h1>
        <p className="heroText">
          浏览服务、选择时间、提交预约，后台统一处理预约确认和服务管理。
        </p>
        <Link className="primaryButton" to="/services">
          查看可预约服务
        </Link>
      </div>
    </section>
  );
}
