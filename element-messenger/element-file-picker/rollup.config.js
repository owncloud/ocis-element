import path from 'path'
import vue from 'rollup-plugin-vue'
import copy from 'rollup-plugin-copy'
import resolve from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import { uglify } from "rollup-plugin-uglify"

const dev = process.env.SERVER === 'true'

export default {
  input: path.resolve(__dirname, 'src/index.js'),
  output: {
    format: 'amd',
    file: 'dist/element-file-picker.bundle.js',
  },
  external: [
    '@ownclouders/file-picker',
  ],
  plugins: [
    vue(),
    resolve(),
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
          src: './index.html',
          dest: 'dist'
        },
        {
          src: './node_modules/@ownclouders/file-picker/dist/img',
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
