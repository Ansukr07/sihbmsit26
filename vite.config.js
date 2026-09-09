import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const apiHandlers = {
  '/api/login': () => import('./api/login.js'),
  '/api/panel': () => import('./api/panel.js'),
  '/api/panels': () => import('./api/panels.js'),
}

function localApi() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const loadHandler = apiHandlers[req.url?.split('?')[0]]
        if (!loadHandler) return next()

        try {
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const body = Buffer.concat(chunks).toString('utf8')
          req.body = body ? JSON.parse(body) : {}
          res.status = (statusCode) => { res.statusCode = statusCode; return res }
          res.json = (payload) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(payload)) }
          const { default: handler } = await loadHandler()
          await handler(req, res)
        } catch (error) {
          console.error('Local API error:', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ message: 'Server error' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return { plugins: [react(), localApi()] }
})
