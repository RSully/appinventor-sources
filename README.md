### Running on Linux/OSX:

To run locally first clone the repo.
All dependencies required for App Inventor vanilla are required
(specifically Java compiler/runtime and ant).

Run the 2 shell scripts in separate terminal windows
(`startAIServer.sh`, `startBuildServer.sh`).

In another terminal run a webserver from the `war` directory
(ex: `cd war; python3 -m http.server`).

Browse to http://localhost:8888/

Login with the default login and import `shell.aia`. Select WebViewer1 in the AI designer and modify its HomeUrl to your server’s internal IP address, at the port from the webserver you ran from `war` (ex: `http://192.168.x.x:8000/webviewstring.html`).

Install the custom companion app to your android phone, found in `appinventor/build/buildserver/MIT Custom Companion.apk`.
To install, you’ll likely need to remove the official version.

Launch the companion and connect to the custom server and run the shell app.


### Copyright

All code copyright its authors.

Resources thanks to https://github.com/leerob/Space_Invaders
ship from https://duncanbowring.files.wordpress.com/2012/08/ship.png
