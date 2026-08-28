import { createServer } from 'vite'

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const mod = await server.ssrLoadModule('/ssr-check.jsx')
  console.log(mod.render())
  console.log('--- (any prop-type warnings would appear above) ---')
} finally {
  await server.close()
}
