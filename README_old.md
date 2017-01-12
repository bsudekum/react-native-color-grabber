## React native color grabber

_Given an image, returns dominant colors_

#### Install:

1. `npm install react-native-color-grabber --save`
2. Add `node_modules/color-grabber/color-grabber` to your project
3. Run and build


### api

```js
var colorGrabber = require('react-native').NativeModules.colorGrabber
colorGrabber.getColors(image, (err, res) => {
    console.log(res);
    // Returns:
    // {
    //  'UIDeviceRGBColorSpace 0.0784314 0.0941176 0.0823529 1': '0.1666667',
    //  'UIDeviceRGBColorSpace 0.215686 0.203922 0.262745 1': '0.1666667',
    //  'UIDeviceRGBColorSpace 0.517647 0.45098 0.380392 1': '0.6666667'
    // }
});
```

### Example:
![](https://cldup.com/73LEp_q3UE.gif)

> Creating a map style from the dominant colors in an image

### Notes

* Only tested with images from `assets-library://`
* [Code from](http://stackoverflow.com/a/29266983/1522419)
