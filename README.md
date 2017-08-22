# Reactipug

Reactipug is the greatest app the world never knew it needed.

Featured at /dev/world/2017.

![Screenshot](/docs/SS1.png)

# Developing

1. Install [Visual Studio Code.](https://code.visualstudio.com)
2. Install Node/NPM. We use Node v8.4.0. Use something like NVM.
3. Install Yarn: `brew install yarn`
4. Install [Xcode.](https://developer.apple.com) We use v8.3.3.
5. Install JavaScript dependencies: `yarn`
6. Run the React Native packager: `yarn start`
7. Open the native app code in Xcode: `open ios/Reactipug.xcodeproj`
8. Click on Build & Run. It's the play button in the top-right.

You can now make changes to the TypeScript code and it'll automatically
recompile. To see your changes, press CMD+R in the iOS Simulator. Any changes
in Objective-C will require you to rebuild in Xcode.

## Maintenance

### Clearing React Native Caches

Run this command to start the packager with clean caches:

```sh
node node_modules/react-native/local-cli/cli.js start -- --resetCache
```

You can then close this packager and start everything again with `yarn start`.
