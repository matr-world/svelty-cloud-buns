import { svelteLoader } from "./plugins/svelte-loader";
import { prerender } from "./plugins/prerender"


const arg = (name:string) => process.argv[process.argv.indexOf(name) + 1]

const dev = arg("--dev");
const entry = arg("--entry");
const out = arg("--out");

console.log({dev, entry, out})

try {
  // @ts-ignore - bun hasn't typed this yet
  await Bun.build({
    entrypoints: [entry],
    outfile: out,
    sourcemap: dev ? "inline" : "none",
    minimize: !dev,
    plugins: [svelteLoader, prerender]
  });
} catch (error) {
  console.error(error)
}
