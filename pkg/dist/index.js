// node_modules/svelte/internal/index.mjs
var noop = function() {
};
var run = function(fn) {
  return fn();
};
var blank_object = function() {
  return Object.create(null);
};
var run_all = function(fns) {
  fns.forEach(run);
};
var is_function = function(thing) {
  return typeof thing === "function";
};
var is_empty = function(obj) {
  return Object.keys(obj).length === 0;
};
var set_current_component = function(component) {
  current_component = component;
};
var flush_render_callbacks = function(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
};
var escape = function(value, is_attr = false) {
  const str = String(value);
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
};
var escape_attribute_value = function(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
};
var validate_component = function(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
  }
  return component;
};
var create_ssr_component = function(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css) => css.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
};
var style_object_to_string = function(style_object) {
  return Object.keys(style_object).filter((key) => style_object[key]).map((key) => `${key}: ${escape_attribute_value(style_object[key])};`).join(" ");
};
var add_styles = function(style_object) {
  const styles = style_object_to_string(style_object);
  return styles ? ` style="${styles}"` : "";
};
var destroy_component = function(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
};
var tasks = new Set;
var managed_styles = new Map;
var current_component;
var render_callbacks = [];
var seen_callbacks = new Set;
var outroing = new Set;
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var _boolean_attributes = [
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
];
var boolean_attributes = new Set([..._boolean_attributes]);
var ATTR_REGEX = /[&"]/g;
var CONTENT_REGEX = /[&<]/g;
var on_destroy;
var SvelteElement;
if (typeof HTMLElement === "function")
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const { on_mount } = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted)
        this.appendChild(this.$$.slotted[key]);
    }
    attributeChangedCallback(attr, _oldValue, newValue) {
      this[attr] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      if (!is_function(callback))
        return noop;
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };

// src/lib/components/nav.svelte
var Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color = "red" } = $$props;
  if ($$props.color === undefined && $$bindings.color && color !== undefined)
    $$bindings.color(color);
  return `<nav><ul><li><a href="/"${add_styles({ color })}>Home</a></li>
        <li><a href="/about">About</a></li></ul></nav>`;
});
var nav_default = Nav;

// src/lib/pages/home.svelte
var css = {
  code: "h1.svelte-1mwh9qx{color:red}",
  map: "{\"version\":3,\"file\":\"home.svelte\",\"sources\":[\"home.svelte\"],\"sourcesContent\":[\"<style>\\n    h1 {\\n        color: red;\\n    }\\n</style>\\n\\n<script>\\n    import Nav from \\\"../components/nav.svelte\\\";\\n\\n    export let name = \\\"world\\\";\\n\\n    const makeAName = () => \\\"WJPPPP\\\";\\n</script>\\n\\n<Nav color=\\\"blue\\\"/>\\n\\n<h1>Hello {name}!</h1>\\n<h1>Hello {name}!</h1>\\n\\n\\n<button on:click={makeAName}>Click</button>\"],\"names\":[],\"mappings\":\"AACI,iBAAG,CACC,KAAK,CAAE,GACX\"}"
};
var Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name = "world" } = $$props;
  const makeAName = () => "WJPPPP";
  if ($$props.name === undefined && $$bindings.name && name !== undefined)
    $$bindings.name(name);
  $$result.css.add(css);
  return `${validate_component(nav_default, "Nav").$$render($$result, { color: "blue" }, {}, {})}

<h1 class="svelte-1mwh9qx">Hello ${escape(name)}!</h1>
<h1 class="svelte-1mwh9qx">Hello ${escape(name)}!</h1>


<button>Click</button>`;
});
var home_default = Home;

// src/lib/pages/about.svelte
var css2 = {
  code: "p.svelte-bws1ho{color:red}",
  map: "{\"version\":3,\"file\":\"about.svelte\",\"sources\":[\"about.svelte\"],\"sourcesContent\":[\"<style>\\n    p {\\n        color: red;\\n    }\\n</style>\\n\\n<Nav />\\n\\n<p>\\n    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime corporis labore rerum nam aut repudiandae voluptas sunt tenetur pariatur temporibus minus, neque, eligendi sed sit quod sequi ipsum aliquam vero.\\n</p>\\n\\n<script>\\n    import Nav from \\\"../components/nav.svelte\\\";\\n</script>\"],\"names\":[],\"mappings\":\"AACI,eAAE,CACE,KAAK,CAAE,GACX\"}"
};
var About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css2);
  return `${validate_component(nav_default, "Nav").$$render($$result, {}, {}, {})}

<p class="svelte-bws1ho">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime corporis labore rerum nam aut repudiandae voluptas sunt tenetur pariatur temporibus minus, neque, eligendi sed sit quod sequi ipsum aliquam vero.
</p>`;
});
var about_default = About;

// src/index.ts
var pages = {
  "/": {
    title: "Home",
    component: home_default,
    props: {
      name: "svelty buns!"
    }
  },
  "/about": {
    title: "About",
    component: about_default,
    props: {
      bio: "lorem ipsum"
    }
  }
};
export {
  pages
};
