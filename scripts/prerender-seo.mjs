import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const { SEO_REGION_PAGES, seoRegionPagePath } = await import(
  pathToFileURL(path.join(root, "src", "data", "seo", "regions.js")).href
);

if (!fs.existsSync(path.join(dist, "index.html"))) {
  console.error("dist/index.html 없음. 먼저 npm run build 하세요.");
  process.exit(1);
}

const paths = ["/", "/local-links"];
for (const page of SEO_REGION_PAGES) {
  paths.push(seoRegionPagePath(page));
}

const host = "127.0.0.1";
const port = 4173;
const origin = `http://${host}:${port}`;

function waitForServer(maxMs = 60000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(`${origin}/`, (res) => {
        res.resume();
        if (res.statusCode && res.statusCode < 500) resolve();
        else if (Date.now() - started > maxMs) reject(new Error("preview timeout"));
        else setTimeout(tick, 400);
      });
      req.on("error", () => {
        if (Date.now() - started > maxMs) reject(new Error("preview timeout"));
        else setTimeout(tick, 400);
      });
    };
    tick();
  });
}

const preview = spawn("npx", ["vite", "preview", "--host", host, "--port", String(port), "--strictPort"], {
  cwd: root,
  shell: true,
  stdio: "ignore",
});

try {
  await waitForServer();
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  for (const route of paths) {
    await page.goto(`${origin}${route}`, { waitUntil: "networkidle0", timeout: 120000 });
    const html = await page.content();
    const out = path.join(dist, decodeURIComponent(route).replace(/^\//, "").split("/").join(path.sep), "index.html");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html, "utf8");
    console.log("prerender", route);
  }
  await browser.close();
} finally {
  preview.kill("SIGTERM");
}
