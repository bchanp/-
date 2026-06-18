import React from "react";

export default function AdminDashboard() {
  return (
    <section>
      <h1>管理后台</h1>
      <div className="grid">
        <article className="card">
          <h2>预约管理</h2>
          <p>查看、确认、拒绝和完成预约。</p>
        </article>
        <article className="card">
          <h2>服务管理</h2>
          <p>维护可预约服务项目。</p>
        </article>
        <article className="card">
          <h2>时间段管理</h2>
          <p>创建和关闭可预约时间段。</p>
        </article>
      </div>
    </section>
  );
}
