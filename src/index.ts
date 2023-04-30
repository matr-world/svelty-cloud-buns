console.log("Hello, those are some mighty svelty buns you got there");

import Home from "./lib/pages/home.svelte";

export const pages = {
    "/" : {
        title: "Home",
        component: Home,
        props: {
            name: "svelty buns!"
        }
    }    
}