import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const routes = [
  ["/", /ASHIGARA/, /ENTER ASHIGARA/],
  ["/archive", /The Living Index/, /source-checked[\s\S]*Phase One sample/],
  ["/atlas", /Places, Paths &amp; Regions/, /Approximate narrative placement/],
  ["/chronicles", /Chronicles/, /From Ashigara to the demon road/],
  ["/about", /Project, Method &amp; Sources/, /Directed by Steven/],
];

for (const [pathname, heading, content] of routes) {
  test(`server-renders ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, heading);
    assert.match(html, content);
    assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
  });
}
