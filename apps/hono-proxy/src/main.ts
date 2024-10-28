import { HttpBindings, serve } from '@hono/node-server';
import { Hono } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
import { createProxyMiddleware } from 'http-proxy-middleware';

type Bindings = HttpBindings & {};

const app = new Hono<{ Bindings: Bindings }>({});

function readConfig() {
  const json = {
    services: {
      service1: {
        url: 'http://localhost:4001/api',
      },
      service2: {
        url: 'http://localhost:4002',
      },
    },
  };

  return json;
}

app.get('/', async (ctx) => {
  return ctx.json({ message: 'Hello, World!' });
});

const config = readConfig();
for (const [name, conf] of Object.entries(config.services)) {
  console.log(`Registering proxy for ${name} to ${conf.url}`);
  const proxy = createProxyMiddleware({
    target: conf.url,
    changeOrigin: true,
  });
  app.all(`/${name}/*`, async (ctx) => {
    // @ts-ignore
    return proxy(ctx.req.raw, ctx.res);

  });

}

serve({
  fetch: app.fetch,
  port: 4000,
});

console.log('Server running on http://localhost:4000');
