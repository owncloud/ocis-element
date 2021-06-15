import path from 'path'
import copy from 'rollup-plugin-copy'
import vue from 'rollup-plugin-vue'
import del from 'rollup-plugin-delete'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import { uglify } from "rollup-plugin-uglify"
import json from "@rollup/plugin-json"
import globals from 'rollup-plugin-node-globals'

const dev = process.env.SERVER === 'true'

export default {
  input: path.resolve(__dirname, 'src/index.js'),
  output: {
    format: 'amd',
    file: 'dist/web-app-element-messenger.js',
    inlineDynamicImports: true,
  },
  external: [
    'vue'
  ],
  plugins: [
    vue(),
    json({ css: true }),
    resolve({
      include: 'node_modules/**',
      browser: true,
      preferBuiltins: false
    }),
    del({
      runOnce: true,
      targets: path.join('dist', '*'),
      dot: true
    }),
    copy({
      targets: [
        {
          src: './element-file-picker/dist/*',
          dest: 'dist/element-file-picker'
        },
      ]
    }),
    postcss({
      minimize: !dev
    }),
    dev && serve({
      contentBase: ['dist']
    }),
    !dev && uglify(),
    globals()
  ]
}
