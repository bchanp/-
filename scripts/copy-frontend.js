import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve("frontend/dist");
const target = resolve("backend/public");

if (!existsSync(source)) {
  throw new Error("frontend/dist does not exist. Run the frontend build first.");
}

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });

console.log("Frontend build copied to backend/public.");

