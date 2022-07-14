const isProd = process.env.NODE_ENV === 'production';

export default {
  server: {
    port: 3001,
    host: '127.0.0.1',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '极狐GitLab开发者社区',
    htmlAttrs: {
      lang: 'en'
    },
    // meta: meta,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      isProd ? { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' } : {},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: []
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/index.scss',
    // 'swiper/swiper-bundle.css',
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/styles/_element-variables.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '@/plugins',
    },
    {
      src: '@/plugins/Element',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true, // 表示开启代理
    // baseURL: '/',
    prefix: '/api/'
  },

  proxy: {
    '/api': {
      target: process.env.NODE_ENV !== 'production' ? 'https://gitlab.dev.ganguomob.com' : '',
      changeOrigin: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // 开启打包分析
    // analyze: true,
    extractCSS: true,
    vendor: ['element-ui'],
    babel: {
      babelrc: false,
      cacheDirectory: undefined,
      presets: ['@nuxt/babel-preset-app'],
      // 按需加载
      plugins: [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ],
    },
  },
  
  // 静态文件模式: 'spa',
  // generate: {
  //   fallback: 'index.html', 
  // },

  router: {
    middleware: 'router',
    extendRoutes(route) {
      // console.log('1', route);
    }
  },

  loading: { color: '#FE5800' },

  env: {
    VUE_APP_PREFIX: process.env.VUE_APP_PREFIX,
  }
}
