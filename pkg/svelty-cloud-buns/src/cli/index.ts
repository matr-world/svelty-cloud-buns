#! /usr/bin/env bun

import path from "path";
import fs from "fs";

import { svelteLoader } from "./plugins/svelte-loader";

const pkgPath = path.join(process.cwd() + "/package.json");

const {
  main = "./src/index.ts"
} = JSON.parse(fs.readFileSync(pkgPath).toString() || "{}");

const src = path.join(process.cwd(), main);
const dist = path.join(__dirname, "../../dist");

try {
  // @ts-ignore - bun hasn't typed this yet
  await Bun.build({
    entrypoints: [src],
    outdir: dist,
    plugins: [svelteLoader]
  });
} catch (error) {
  console.error(error)
}