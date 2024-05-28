module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // Reanimated plugin has to be listed last.
    ],
  //   "plugins": [
  //    https://e15f-196-113-159-192.ngrok-free.app [
  //       "expo-barcode-scanner",
  //       {
  //         "cameraPermission": "Allow $(PRODUCT_NAME) to access camera."
  //       }
  //     ]
  //   ]
  // }
  };
}
