import { pages } from "./build";

export default {
    async fetch(request, env) {
      const url = new URL(request.url);
      if (url.pathname.startsWith('/api/')) {
        // TODO: Add your custom /api/* logic here.
        return new Response('Ok');
      }

      const rendered = pages["/"].component.render();
      
      console.log(pages["/"].component.render());


      // Otherwise, serve the static assets.
      // Without this, the Worker will error and no assets will be served.
      return new Response(rendered.html, {
        headers: {
            "content-type": "text/html;charset=UTF-8",
          },
      });
    },
}