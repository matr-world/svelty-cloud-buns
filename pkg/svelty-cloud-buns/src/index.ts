export type Page = {
  title: string;
  component: any;
  props: Record<string, any>;
}

export type Pages = Record<string, Page>;

export const router = (request: Request) => {
  let pages = {};

  try {
    pages = require("../dist/index.js");
  } catch(error) {
    console.error("Failed to find pages. Did you run `bun run build`?");
    console.log(error);
  }

  const url = new URL(request.url);

  const pageMap = new Map(Object.entries(pages).map((route) => route)) as Map<string, Page>;

  const page: Page | undefined = pageMap.get(url.pathname);

  try {
    if(!page) {
      return new Response("Not Found", { status: 404 });
    }

    const rendered = page.component.render(page?.props);
    
    return new Response(rendered.html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  } catch (error) {
    console.log(error);

    return new Response("Server Error", { status: 500 });
  }
};