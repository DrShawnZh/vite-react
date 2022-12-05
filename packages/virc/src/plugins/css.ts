const transCssFile = () => ({
  name: "trans-css-file",
  resolveId: (...args) => {
    console.log(args, 'resolveId')
    return 'id'
  },
  resolveDynamicImport: (...args) => {
    console.log(args, 'resolveDynamicImport')
    return 'id'
  },
  load: (...args) => {
    console.log(args, 'load')
    return ''
  }
})

export default transCssFile