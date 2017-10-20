(function () {
  let plugin = {}

  plugin.install = (Vue, G2, opts = {}) => {

    if (!G2) {
      console.error('You have to install G2')
      return
    }

  }

  if (typeof exports == "object") {
    // commonjs
    module.exports = plugin
  } else if (typeof define == "function" && define.amd) {
    // amd
    define([], function () {
      return plugin
    })
  } else if (window.Vue && window.G2) {
    // script
    window.plugin = plugin
    Vue.use(plugin, window.G2)
  }

})()