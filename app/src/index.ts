import Home from "./lib/pages/home.svelte";
import About from "./lib/pages/about.svelte";

import { type Pages } from "svelty-cloud-buns";

// Add routes that point to svelte files here
export const pages : Pages = {
    "/" : {
        title: "Home",
        component: Home,
        props: {
            name: "svelty buns!"
        }
    },    
    "/about" : {
        title: "About",
        component: About,
        props: {
            bio: "lorem ipsum"
        }
    }    
}