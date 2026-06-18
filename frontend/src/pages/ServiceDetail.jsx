import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { request } from "../api/request.js";

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    request.get(`/services/${id}`).then((res) => {
      setService(res.data.service);
    });

    request.get(`/slots/service/${id}`).then((res) => {
      setSlots(res.data.slots);
    });
  }, [id]);

  if (!service) {
    return <p>加载中...</p>;
  }

  return (
    <section>
      <h1>{service.name}</h1>
      <p>{service.description}</p>

      <h2>可预约时间</h2>
      <div className="grid">
        {slots.map((slot) => (
          <article className="card" key={slot.id}>
            <p>{new Date(slot.startTime).toLocaleString()}</p>
            <p>
              剩余 {slot.capacity - slot.bookedCount} / {slot.capacity}
            </p>
            <button type="button">预约</button>
          </article>
        ))}
      </div>
    </section>
  );
}
