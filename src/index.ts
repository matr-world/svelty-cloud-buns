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