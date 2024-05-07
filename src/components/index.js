import { defineAsyncComponent } from 'vue'
export default {
  install(app) {
    const components = import.meta.glob('./*/index.vue')
    for (const [fullPath, fn] of Object.entries(components)) {
      const compName = /\.\/(.*)\/index\.vue/.exec(fullPath)[1]
      app.component(compName, defineAsyncComponent(fn))
    }
  }
}
