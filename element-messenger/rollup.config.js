import path from 'path'
import copy from 'rollup-plugin-copy'
import vue from 'rollup-plugin-vue'
import { babel } from '@rollup/plugin-babel'
import del from 'rollup-plugin-delete'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import { uglify } from "rollup-plugin-uglify"

const dev = process.env.SERVER === 'true'

export default {
  input: path.resolve(__dirname, 'src/app.js'),
  output: {
    format: 'amd',
    file: 'dist/element-messenger.bundle.js',
    inlineDynamicImports: true,
  },
  external: [
    'vue',
    'l10n/translations'
  ],
  plugins: [
    vue(),
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
    babel({babelHelpers: 'bundled'}),
    postcss({
      extract: path.join('css', 'web.css'),
      minimize: !dev
    }),
    dev && serve({
      contentBase: ['dist']
    }),
    !dev && uglify(),
  ]
}
