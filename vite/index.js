const vue = require('@vitejs/plugin-vue')
const react = require('@vitejs/plugin-react')
const vueJsx = require('@vitejs/plugin-vue-jsx')
// const requireTransform = require('vite-plugin-require-transform').default
// function ReactDOMTransformPlugin() {
//   return {
//     async resolveId(source, importer, options) {
//       if (source.match(/react-dom\/client/)) {
//         const resolution = await this.resolve(source, importer, { skipSelf: true, ...options })
//         if (!resolution) {
//           return { id: 'veaury-fake-react-dom-client', moduleSideEffects: true }
//         }
//       }
//     },
//     load(id) {
//       if (id === 'veaury-fake-react-dom-client') {
//         return `export * from 'react-dom'; export {default} from 'react-dom';`
//       }
//     }
//   }
// }

function veauryVitePlugins({type, vueJsxInclude = null, vueJsxExclude = null, vueOptions = {}, vueJsxOptions: initVueJsxOptions = {}, reactOptions = {}}) {

  let vueJsxOptions = {...initVueJsxOptions}
  if (type === 'react') {
    vueJsxOptions.include = vueJsxInclude || [/vue&type=script&lang\.[tj]sx?$/, /vue&type=script&setup=true&lang\.[tj]sx?$/, /[/\\]vue_app[\\/$]+/]
  }
  if (type === 'vue') {
    vueJsxOptions.exclude = vueJsxExclude || [/[/\\]react_app[\\/$]+/]
  }
  if (type === 'custom') {
    if (vueJsxInclude) {
      vueJsxOptions.include = vueJsxInclude
    }
    if (vueJsxExclude) {
      vueJsxOptions.exclude = vueJsxExclude
    }
  }

  return [
    // ReactDOMTransformPlugin(),
    // requireTransform({
    //   fileRegex: /veaury/
    // }),
    vue(vueOptions),
    // Make vueJsx plugin run time earlier
    {
      ...vueJsx(vueJsxOptions),
      enforce: 'pre'
    },
    // recover esbuild include
    {
      config(){
        return {
          esbuild: {
            include: /\.[jt]sx*$/
          }
        }
      }
    },
    react(reactOptions)
  ]
}

module.exports = veauryVitePlugins
