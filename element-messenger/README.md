# Simple Element Messenger Integration

Element is a client solution for the popular Matrix chat protocol. This extension allows to embed an Element client into your ownCloud environment.

## Building

You can build this app like any other Phoenix app:

    yarn install
    yarn build

The build process will automatically build the project in the element-file-picker subfolder and include it with the build artifacts of the top level project.

You can also build the app via the complete build process of Phoenix:

    yarn install-all
    yarn build-all

Please note that the app requires the usual build environment of Phoenix because it relies on Babel configuration files from the main project.
We recommend to put the element-messenger folder in the apps folder of the Phoenix project file structure.

## Infrastructure Requirements
You will need a self hosted Element client as the official client does not allow for frame based embedding. Just follow the given setup instructions of the Element client and set your webserver to emit correct X-Frame-Options headers for your environment. See https://developer.mozilla.org/de/docs/Web/HTTP/Headers/X-Frame-Options

Furthermore extend your main config.json with a configuration that looks like the following:

    "element": {
       "server": "<url to your hosted element app>"
     }

After deployment you will need to create a file-picker.config.json file if you want to use the file picker widget in Matrix.
Look here for further information: https://owncloud.github.io/integration/file_picker/installation/
Please put the finished file in the Phoenix file structure under apps/element-messenger/element-file-picker/file-picker-config.json
You also can look at the file-picker-config.sample.json file in the element-file-picker folder for inspiration.

If your Element Web App or Integration Server runs under a different host you might need to allow that host to embed widgets from your host.
You should set a X-Frame-Option header atleast for the element-file-picker subfolder.
Look at this for further information https://developer.mozilla.org/de/docs/Web/HTTP/Headers/X-Frame-Options

An example .htaccess configuration could be:

    Header set X-Frame-Options "ALLOW-FROM https://www.myelementdomain.de"

## Integrating widget into Matrix

Currently the only way is to run

    /addwidget https://yourdomain.com/apps/element-messenger/element-file-picker/index.html

in any room/conversation where you want the widget.

This might change in the future if an official support for ownCloud is integrated into the Matrix integration server.
