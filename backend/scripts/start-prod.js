import { spawnSync } from "node:child_process";

if (!process.env.DATABASE_URL && process.env.MYSQL_URL) {
  process.env.DATABASE_URL = process.env.MYSQL_URL;
}

if (!process.env.DATABASE_URL && process.env.MYSQL_PUBLIC_URL) {
  process.env.DATABASE_URL = process.env.MYSQL_PUBLIC_URL;
}

function run(command, args) {
  const result = spawnSync(command, args, {
    env: process.env,
    shell: true,
    stdio: "inherit"
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

run("npx", ["prisma", "migrate", "deploy"]);
run("node", ["prisma/seed.js"]);
run("node", ["src/server.js"]);

