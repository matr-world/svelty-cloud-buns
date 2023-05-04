import { type PluginBuilder } from "bun";

import path from "path";

import { mkdirSync, writeFileSync, existsSync, readFileSync } from "fs";

import { hash } from "../../util/hash";

import config from "../../config";

const entry = path.join(process.cwd(), config.compiled);
const out = path.join(process.cwd(), config.prerendered);

const metadataPath = path.join(out, "metadata.json");

export const prerender = {
    name: "prerender",
    async setup(build:PluginBuilder) {

      // Import the pages config with compiled components
      const { pages } = await import(entry);

      const pageMap = new Map(Object.entries(pages));

      for(const [pathname, page] of pageMap) {
        const rendered = page.component.render(page?.props);

        const pathHash = hash(pathname, "path");

        mkdirSync(out, { recursive: true });
        
        let metadata = {};

        if(existsSync(metadataPath)) {
          metadata = JSON.parse(readFileSync(metadataPath).toString());
        }

        writeFileSync(path.join(out, `${pathHash}.html`), rendered.html);
        writeFileSync(path.join(out, `${pathHash}.css`), rendered.css.code);
      }
    },
  }