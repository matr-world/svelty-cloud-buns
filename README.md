# ☁️ svelty-cloud-buns
### Requirements (for best experience)
- Install Bun https://bun.sh/ (`curl -fsSL https://bun.sh/install | bash`)

#### Install Project
`bun i`

#### Build Project
`bun run build`

#### Types
```typescript
export type Page = {
  title: string;
  // An imported Svelte component
  component: any;
  props: Record<string, any>;
}

export type Router = Record<string, Page>;
```

## How it Works
`svelte-cloud-buns` is a package for building lightweight UIs with Svelte hosted on Cloudflare.

### Pages Entrypoint
By default, the `scb` CLI will look for a `Router` names `pages` exported from `./src/index.ts` unless otherwise specified.

##### Example Entrypoint
```typescript
import Home from "./lib/pages/home.svelte";

import { type Router } from "svelty-cloud-buns";

// Add routes that point to svelte files here
export const pages : Router = {
    "/" : {
        title: "Home",
        component: Home,
        props: {
            name: "svelty buns!"
        }
    }    
}
```

### CLI
Running `scb` will read the pages your app exports and generate a router for the associated Cloudflare Worker to use.

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





