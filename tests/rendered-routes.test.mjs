import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(pathname, headers = {}) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html", ...headers } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the persisted Japanese locale from its request cookie", async () => {
  const response = await render("/archive?record=yamauba", { cookie: "ashigara-language=ja" });
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html[^>]*lang="ja"[^>]*data-locale="ja"/);
  assert.match(html, /生きた索引/);
  assert.match(html, /最初の星座/);
  assert.match(html, /山姥/);
});

const routes = [
  ["/", /GATE 01[\s\S]*ASHIGARA/, /ENTER ASHIGARA/],
  ["/archive", /The Living Index/, /source-checked[\s\S]*Phase One sample/],
  ["/atlas", /Places, Paths &amp; Regions/, /Traditional regions · approximate placement/],
  ["/chronicles", /Chronicles/, /From Ashigara to the demon road/],
  ["/about", /Direction, System &amp; Method/, /Directed by Steven Adkins/],
  ["/portal-lab", /108 Yōkai/, /back wall\./],
];

for (const [pathname, heading, content] of routes) {
  test(`server-renders ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, heading);
    assert.match(html, content);
    if (pathname !== "/" && pathname !== "/portal-lab") {
      assert.match(html, /Return to Gate 01/i);
      assert.doesNotMatch(html, />Threshold</i);
    }
    assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
  });
}
