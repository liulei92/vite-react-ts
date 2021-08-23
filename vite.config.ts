// 为打包后的文件提供传统浏览器兼容性支持
import legacy from '@vitejs/plugin-legacy';
// 提供 React Fast Refresh 支持
import reactRefresh from '@vitejs/plugin-react-refresh';
import fs from 'fs';
import lessToJS from 'less-vars-to-js';
import path from 'path';
// 包依赖分析 https://github.com/btd/rollup-plugin-visualizer
import { visualizer } from 'rollup-plugin-visualizer';
import type { ConfigEnv, UserConfig } from 'vite';
// 读取.env环境变量，并输出对象类型
import { loadEnv } from 'vite';
// gzip压缩 https://github.com/anncwb/vite-plugin-compression
import viteCompression from 'vite-plugin-compression';
import html from 'vite-plugin-html';
// vite-plugin-imp 该插件按需加载存在部分样式丢失的情况
// import vitePluginImp from 'vite-plugin-imp';
// 由于 vite 本身已按需导入了组件库，因此仅样式不是按需导入的，因此只需按需导入样式即可。
import styleImport from 'vite-plugin-style-import';
import viteSvgIcons from 'vite-plugin-svg-icons';

// 文档：https://github.com/anncwb/vite-plugin-mock
// import { viteMockServe } from 'vite-plugin-mock'
// import config from './config';
import { ANALYZE, COMPRESS_GZIP, OPEN } from './config/constant';

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8'),
);

// 函数式配置
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  const root = process.cwd();
  const env = loadEnv(mode, root);
  // 拿到的值是 string 类型
  const { VITE_PORT, VITE_HTTP_API } = env;

  console.log('env', env);

  return {
    // base: config[mode].baseUrl,
    base: '/',
    publicDir: 'public',
    plugins: [
      // reactRefresh
      reactRefresh(),
      // styleImport
      styleImport({
        libs: [
          {
            libraryName: 'antd',
            esModule: true,
            resolveStyle: (name) => {
              return `antd/es/${name}/style/index`;
            },
          },
        ],
      }),
      // legacy targeting IE11
      mode === 'legacy' &&
        legacy({
          targets: ['ie >= 11'],
          additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        }),
      // ANALYZE
      ANALYZE &&
        visualizer({
          filename: './node_modules/.cache/visualizer/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      /**
       * gzip插件，打包压缩代码成gzip
       * https://github.com/anncwb/vite-plugin-compression
       */
      COMPRESS_GZIP && isBuild && viteCompression({ deleteOriginFile: false }),
      /**
       * 注入环境变量到HTML模板中
       * 如在  .env文件中有环境变量  VITE_APP_TITLE=Vite React App
       * 则在 html模板中  可以这样获取  <%- VITE_APP_TITLE %>
       * 文档：  https://github.com/anncwb/vite-plugin-html
       */
      html({
        inject: {
          injectData: { ...env },
        },
        minify: true,
      }),
      /**
       * 把src/icons 下的所有svg 自动加载到body下，供组件使用
       * 类似于webpack中的svg-sprite-loader
       * 文档：https://github.com/anncwb/vite-plugin-svg-icons
       * 增加组件 components/SvgIcon.tsx
       */
      viteSvgIcons({
        iconDirs: [path.resolve(root, 'src/icons')], // 指定需要缓存的图标文件夹
        symbolId: 'icon-[name]', // 指定symbolId格式
      }),
      // mock 文档：https://github.com/anncwb/vite-plugin-mock
      // viteMockServe({
      //   mockPath: 'mock',
      //   localEnabled: command === 'serve',
      //   logger: true
      // })
    ].filter(Boolean),
    resolve: {
      alias: [
        { find: /^~/, replacement: path.resolve(__dirname, './') },
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        {
          find: 'components',
          replacement: path.resolve(__dirname, 'src/components'),
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], // 默认
    },
    css: {
      // modules: {
      //   localsConvention: 'camelCaseOnly', // 默认 驼峰式
      // },
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript，支持 less 内联 JS
          javascriptEnabled: true,
          // 重写 less 变量，定制样式
          modifyVars: themeVariables,
        },
        // scss: {
        //   additionalData: `$injectedColor: orange;`
        //   additionalData: "@import '@/styles/base.scss';"
        // }
      },
    },
    // esbuild: {
    //   jsxInject: `import React from 'react'`
    // },
    server: {
      host: '127.0.0.1',
      port: Number(VITE_PORT), // 开发环境启动的端口
      open: OPEN,
      proxy: {
        '/api': {
          // 当遇到 /api 路径时，将其转换成 target 的值
          target: VITE_HTTP_API,
          changeOrigin: true,
          rewrite: (pre) => pre.replace(/^\/api/, ''), // 将 /api 重写为空
        },
      },
    },
    build: {
      // outDir: 'dist',
      assetsDir: 'static',
      // assetsInlineLimit: 4096,
      // cssCodeSplit: true, 启用/禁用 CSS 代码拆分
      // sourcemap: false,
      minify: 'terser', // 混淆
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: isBuild,
        },
      },
      rollupOptions: {
        output: {
          entryFileNames: `static/js/[name].[hash].js`,
          chunkFileNames: `static/js/[name].[hash].js`,
          assetFileNames: `static/assets/[name].[hash].[ext]`,
        },
      },
    },
  };
};
