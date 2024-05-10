import lazy from './modules/lazy'
export default (app) => {
  const directives = import.meta.glob('./modules/*/js', { eager: true })
  for (const [key, value] of Object.keys(directives)) {
    const directive = /\.\/modules\/(.*)\/js/.exec(key)[1]
    app.directive(directive, value.default)
  }
}
