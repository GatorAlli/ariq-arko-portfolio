import { spawn } from "node:child_process";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const args = process.argv.slice(2);
if (args.includes("--strictPort")) {
 const port = Number(args[args.indexOf("--port") + 1] || 4173);
 const root = path.resolve("out");
 const mime = { ".mp4": "video/mp4", ".html": "text/html", ".js": "application/javascript", ".css": "text/css", ".txt": "text/plain", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".pdf": "application/pdf", ".woff2": "font/woff2", ".ttf": "font/ttf" };
 http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const base = path.resolve(root, "." + pathname);
  if (!base.startsWith(root + path.sep) && base !== root) { res.writeHead(403);res.end();return; }
  const candidates = [base, base + ".html", path.join(base, "index.html")];
  const file = candidates.find(p => fs.existsSync(p) && fs.statSync(p).isFile());
  if (!file) { res.writeHead(404);res.end("Not found");return; }
  const size = fs.statSync(file).size;
  const headers = { "Content-Type": mime[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store", "Accept-Ranges": "bytes" };
  if (req.headers.range) {
   const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
   let start = range?.[1] ? Number(range[1]) : 0;
   let end = range?.[2] ? Number(range[2]) : size - 1;
   if (range && !range[1] && range[2]) { start = Math.max(0, size - Number(range[2])); end = size - 1; }
   end = Math.min(end, size - 1);
   if (!range || (!range[1] && !range[2]) || !Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start > end || start >= size) {
    res.writeHead(416, { ...headers, "Content-Range": `bytes */${size}` }); res.end(); return;
   }
   res.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": end - start + 1 });
   if (req.method === "HEAD") res.end(); else fs.createReadStream(file, { start, end }).pipe(res);
   return;
  }
  res.writeHead(200, { ...headers, "Content-Length": size });
  if (req.method === "HEAD") res.end(); else fs.createReadStream(file).pipe(res);
 }).listen(port, "0.0.0.0");
} else {
 const forwarded = args.map(arg => arg === "--host" ? "--hostname" : arg);
 const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--webpack", ...forwarded], { stdio: "inherit" });
 child.on("exit", code => process.exit(code ?? 1));
 for (const signal of ["SIGTERM", "SIGINT"]) process.on(signal, () => child.kill(signal));
}
