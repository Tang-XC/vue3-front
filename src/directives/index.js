import lazy from './modules/lazy'
export default (app) => {
  const directives = import.meta.glob('./modules/*.js', { eager: true })
  const keys = Object.keys(directives)
  keys.forEach((key) => {
    const name = key.replace('./modules/', '').replace('.js', '')
    const directive = directives[key].default
    app.directive(name, directive)
  })
}
