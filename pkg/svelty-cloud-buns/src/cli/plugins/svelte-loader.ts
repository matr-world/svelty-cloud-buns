import { type PluginBuilder } from "bun"   

export const svelteLoader = {
    name: "svelte loader",
    async setup(build:PluginBuilder) {
      const { compile } = await import("svelte/compiler");
      const { readFileSync } = await import("fs");
  
      // when a .svelte file is imported...
      build.onLoad({ filter: /\.svelte$/ }, ({ path }) => {
  
        // read and compile it with the Svelte compiler
        const file = readFileSync(path, "utf8");
        const contents = compile(file, {
          filename: path,
          generate: "ssr",
        }).js.code;
  
        // and return the compiled source code as "js"
        return {
          contents,
          loader: "js",
        };
      });
    },
  }