# ☁️ svelty-cloud-buns
### Requirements (for best experience)
- Install Bun https://bun.sh/ (`curl -fsSL https://bun.sh/install | bash`)

#### Install Project
`bun i`

#### Build Project
`bun run build`

#### Dev Server
bun run dev `wrangler dev _worker.js`

#### Types
```typescript
export type Page = {
  title: string;
  // An imported Svelte component
  component: any;
  props: Record<string, any>;
}

export type Pages = Record<string, Page>;
```

## How it Works
`svelte-cloud-buns` is a package for building lightweight UIs with Svelte hosted on Cloudflare.

### Pages Entrypoint
By default, the `scb` CLI will look for `Pages` exported from `./src/index.ts` unless otherwise specified.

##### Example Entrypoint
```typescript
import Home from "./lib/pages/home.svelte";

import { type Pages } from "svelty-cloud-buns";

// Add routes that point to svelte files here
export const pages : Pages = {
    "/" : {
        title: "Home",
        component: Home,
        props: {
            name: "svelty buns!"
        }
    }    
}
```

### CLI (Generate Worker )
Running `scb` will read the pages your app exports and generate a router for the associated Cloudflare Worker to use. Once you run `scb` on your project, you should be able to `import { router } from "svelte-cloud-buns"` in this projects `_worker.js` file.

##### Config
```js
{
   // your existing package json stuff
   ...package.json,
   
   "scb": {
      "entryfile": "src/index.ts"
      // ... other options in the future
   }
}
```

### Worker
Minimal Cloudflare worker definition needed to support Svelty Cloud Buns.
```typescript
import { router } from "svelty-cloud-buns";

export default {
    async fetch(request, env) {
        return router(request);
    },
}
```
