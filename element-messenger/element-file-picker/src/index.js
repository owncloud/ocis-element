import Vue from './vue'
import App from '@ownclouders/file-picker'

Vue.config.productionTip = false

new Vue({
  render: h => {
    return h(App, {
      props: {
        variation: 'resource'
      }
    })
  }
}).$mount('#app')

let widgetId = ''
window.addEventListener('message', function (event) {
  console.log(event)
  if (!window.parent || !event.data) {
    return
  }

  if (
    !event.data.requestId ||
    !event.data.widgetId ||
    !event.data.action ||
    event.data.api !== 'toWidget'
  ) {
    return
  }

  widgetId = event.data.widgetId

  let response = {}

  // If event.data.action is visibility a empty object is enough
  if (event.data.action === 'capabilities') {
    response = {
      capabilities: ['m.text']
    }
  } else if (event.data.action !== 'visibility') {
    response = {
      error: {
        message: 'Not supported'
      }
    }
  }

  window.parent.postMessage({...event.data, response}, event.origin)
})
