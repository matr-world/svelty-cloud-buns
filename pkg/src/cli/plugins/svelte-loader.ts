import { type PluginBuilder } from "bun"   
import { compile } from "svelte/compiler";
import { readFileSync } from "fs";
import path from "path";

import { hash } from "../../util/hash";

import { mkdirSync, writeFileSync, existsSync } from "fs";

import config from "../../config"

const out = path.join(process.cwd(), config.compiled);

export const svelteLoader = {
    name: "svelte loader",
    async setup(build:PluginBuilder) {
      // when a .svelte file is imported...
      build.onLoad({ filter: /\.svelte$/ }, ({ path : filepath }) => {
        // read and compile it with the Svelte compiler
        const file = readFileSync(filepath, "utf8");

        mkdirSync(out, { recursive: true });
        
        const ssr = compile(file, {
          filename: filepath,
          generate: "ssr",
          hydratable: true,
        });

        const dom = compile(file, {
          filename: filepath,
          generate: "dom",
          hydratable: true,
        });

        console.log(JSON.stringify({ dom }));

        writeFileSync(path.join(out, `${hash(filepath, "path")}.js`), dom.js.code);

        // and return the compiled source code as "js"
        return {
          contents : ssr.js.code,
          loader: "js",
        };
      });
    },
  }