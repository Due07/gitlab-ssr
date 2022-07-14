const Koa = require('koa')
const consola = require('consola');

const app = new Koa()

// Import and Set Nuxt.js options
// loadNuxt和build使用了新的程序化渲染语法, 使用loadNuxt的优点是您不必直接require() nuxt.config.js配置文件。
const { loadNuxt, build } = require('nuxt')
// const config = require('../nuxt.config');

const koaCors = require('koa2-cors');

const router = require('./api/index.js');

const isDev = process.env.NODE_ENV !== 'production'

async function start() {
  // We get Nuxt instance
  const nuxt = await loadNuxt('dev');

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3001
  } = nuxt.options.server;

  // const isDev = nuxt.options.NODE_ENV !== 'production';

  // Build only in dev mode with hot-reloading
  if (isDev) {
    build(nuxt)
  }
  
  // 路由
  app.use(router.routes())
  .use(koaCors());

  // Render every route with Nuxt
  app.use(async (ctx, next) => {
    /**
     * ctx.req：原生的req对象
      · ctx.res：原生的res对象
      · ctx.request：koa自己封装的request对象
      · ctx.response：koa自己封装的response对象
     */
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    await nuxt.render(ctx.req, ctx.res, next);
  });

  // Listen the server
  app.listen(port, host);
}

start()