import Vue from './vue'
import App from '@ownclouders/file-picker'
import mxwidgets from 'matrix-widget-api'

let widgetId = /widgetId=(.*)&/g.exec(window.location.search);
if (!widgetId) {
  widgetId = /widgetId=(.*)$/g.exec(window.location.search);
}

if (widgetId) {
  const api = new mxwidgets.WidgetApi(decodeURIComponent(widgetId[1]), '*');

  api.requestCapabilityToSendMessage('m.text');

  api.on("ready", function () {
    Vue.config.productionTip = false

    var location = window.location.pathname;
    location = location.substring(0, location.lastIndexOf('/')) + "/file-picker-config.json";

    let instance = new Vue({
      render: h => {
        return h(App, {
          props: {
            variation: 'resource',
            configLocation: location
          }
        })
      }
    }).$mount('#file-picker');

    instance.$children[0].selectResources = function(resources) {
      // Currently the App does not expose the client in a usual way.
      // That's why we are directly accessing it.
      // TODO: Change in future versions
      const client = Vue.prototype.$client;
      let counter = 0;
      const shareResults = [];
      for (var resid in resources) {
        client.shares.shareFileWithLink(resources[resid].path).then(result => {
          counter++;
          if (result && result.shareInfo && result.shareInfo.url) {
            shareResults.push(result);
            if (counter === resources.length) {
              let text = "";
              let htmlText = "";
              for (var i in shareResults) {
                text += 'Download ' + shareResults[i].shareInfo.file_target.replace(/^\//g, '') + ': ' + shareResults[i].shareInfo.url + "\n";
                htmlText += '<a href="' + shareResults[i].shareInfo.url + '">Download ' + shareResults[i].shareInfo.file_target.replace(/^\//g, '') + ' from owncloud</a><br>';
              }
              api.sendRoomEvent('m.room.message', {
                "body": text,
                "format": "org.matrix.custom.html",
                "formatted_body": htmlText,
                "msgtype": "m.text"
              });
            }
          }
        })
      }
    };
  });

  api.start();
} else {
  alert("Could not initialize communication with element client.");
}
