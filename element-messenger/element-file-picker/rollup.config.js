import path from 'path'
import vue from 'rollup-plugin-vue'
import copy from 'rollup-plugin-copy'
import resolve from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import {uglify} from "rollup-plugin-uglify"
import commonjs from '@rollup/plugin-commonjs';
import injectProcessEnv from 'rollup-plugin-inject-process-env';

const dev = process.env.SERVER === 'true'

export default {
  input: path.resolve(__dirname, 'src/main.js'),
  output: {
    format: 'iife',
    file: 'dist/element-file-picker.bundle.js',
    inlineDynamicImports: true
  },
  plugins: [
    resolve({
      include: 'node_modules/**',
      browser: true,
      preferBuiltins: false,
    }),
    vue(),
    commonjs(),
    injectProcessEnv({
      NODE_ENV: dev ? 'production' : 'production',
      VUE_ENV: dev ? 'production' : 'production'
    }, {
      verbose: true
    }),
    copy({
      targets: [
        {
          src: './node_modules/@ownclouders/file-picker/public/oidc-callback.html',
          dest: 'dist'
        },
        {
          src: './node_modules/@ownclouders/file-picker/public/oidc-client.min.js',
          dest: 'dist'
        },
        {
          src: './node_modules/@ownclouders/file-picker/dist/lib/file-picker.css',
          dest: 'dist'
        },
        {
          src: './index.html',
          dest: 'dist'
        },
        {
          src: './node_modules/@ownclouders/file-picker/dist/lib/img',
          dest: 'dist'
        }
      ]
    }),
    dev && serve({
      contentBase: ['dist']
    }),
    !dev && uglify(),
  ]
}
