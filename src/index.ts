console.log("Hello, those are some mighty svelty buns you got there");

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