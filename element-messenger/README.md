# Simple Element Messenger Integration

Element is a client solution for the popular Matrix chat protocol.
This extension has two parts, the first one lets you embed a self-hosted Elements client into your ownCloud environment.
The second is a widget for usage within Elements, that allows to directly share files with within chat rooms.

## Building

You can build this app like any other Phoenix app:

    yarn install
    yarn build

The build process will automatically build the project in the element-file-picker.

## Infrastructure Requirements and Deployment for embedded Elements client
You will need a self hosted Element client as the official client does not allow for frame based embedding. Just follow the given setup instructions of the Element client and set your webserver to emit correct X-Frame-Options headers for your environment. See https://developer.mozilla.org/de/docs/Web/HTTP/Headers/X-Frame-Options

Furthermore extend your main config.json with a configuration that looks like the following:

    "external_apps": [
      {
        "id": "element-messenger",
        "path": "web-app-element-messenger",
        "config": {
          "server": "<path to your Element instance>"
        }
      }
    ]

To deploy the app just deploy the contents of the top level dist folder in your instance of ownCloud Web to the **js** folder.

## Deployment of Elements file picker widget
Please deploy the contents (the widget) of the dist folder within the element-file-picker folder on your server.
You can deploy it anywhere you like. After deployment you will need to create a file-picker.config.json file if you want to use the file picker widget in Matrix.
Look here for further information: https://owncloud.github.io/integration/file_picker/installation/
Please put the finished as file-picker-config.json in the same folder as the widget.
You also can look at the file-picker-config.sample.json file in the element-file-picker folder for inspiration.

If your Element Web App or Integration Server runs under a different host you might need to allow that host to embed widgets from your host.
You should set a X-Frame-Option header atleast for the element-file-picker subfolder.
Look at this for further information https://developer.mozilla.org/de/docs/Web/HTTP/Headers/X-Frame-Options

An example .htaccess configuration could be:

    Header set X-Frame-Options "ALLOW-FROM https://www.myelementdomain.de"

If you want to use it with the official Element client put https://app.element.io/ in the header.

## Integrating widget into Matrix

Currently the only way is to run

    /addwidget https://yourdomain.com/yourwidgetpath/index.html

in any room/conversation where you want the widget.

This might change in the future if an official support for ownCloud is integrated into the Matrix integration server.
