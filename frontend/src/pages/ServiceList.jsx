import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { request } from "../api/request.js";

export default function ServiceList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    request.get("/services").then((res) => {
      setServices(res.data.services);
    });
  }, []);

  return (
    <section>
      <h1>服务列表</h1>
      <div className="grid">
        {services.map((service) => (
          <article className="card" key={service.id}>
            <h2>{service.name}</h2>
            <p>{service.description || "暂无介绍"}</p>
            <p>{service.durationMinutes} 分钟</p>
            <Link to={`/services/${service.id}`}>选择时间</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
