import { plugin } from "bun";

// await plugin({
//     name: "svelte loader",
//     async setup(build) {
//       const { compile } = await import("svelte/compiler");
//       const { readFileSync } = await import("fs");
  
//       // when a .svelte file is imported...
//       build.onLoad({ filter: /\.svelte$/ }, ({ path }) => {
  
//         // read and compile it with the Svelte compiler
//         const file = readFileSync(path, "utf8");
//         const contents = compile(file, {
//           filename: path,
//           generate: "ssr",
//         }).js.code;
  
//         // and return the compiled source code as "js"
//         return {
//           contents,
//           loader: "js",
//         };
//       });
//     },
//   });

  await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './build',
    plugins: [
      {
        name: "svelte loader",
        async setup(build) {
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
    ]
  });