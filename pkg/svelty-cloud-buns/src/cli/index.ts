#! /usr/bin/env bun

import path from "path";
import fs from "fs";

import { svelteLoader } from "./plugins/svelte-loader";

const pkgPath = path.join(process.cwd() + "/package.json");

const {
  scb : config = {}
} = JSON.parse(fs.readFileSync(pkgPath).toString() || "{}");

const {
  entry = "src/index.ts",
} = config;

const src = path.join(process.cwd(), entry);
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