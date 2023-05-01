import { router } from "svelty-cloud-buns";

export default {
    async fetch(request, env) {
        return router(request);
    },
}