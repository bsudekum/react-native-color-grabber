# react-native-color-grabber

Calculates the dominant colors of an image.

On Android, it wraps the [Android Pallete Class](https://developer.android.com/reference/android/support/v7/graphics/Palette.html) to pick colors from an image.

On iOS, it implements code from [this Stack Overflow answer.](http://stackoverflow.com/a/29266983/1522419)

Includes a small example app. This version (1.0.0) implements a new API, although for iOS the old (v0) API is still supported.

## Getting started

`$ npm install react-native-color-grabber --save`

### Mostly automatic installation for Android

`$ react-native link react-native-color-grabber`
(iOS currently requires manual installation.)

### Manual installation


#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import io.colorGrabber.colorGrabberPackage;` to the imports at the top of the file
  - Add `new colorGrabberPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:

  ```
   include ':react-native-color-grabber'
   project(':react-native-color-grabber').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-color-grabber/android')
  ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
```
   compile project(':react-native-color-grabber')
```

#### iOS

1. Add `node_modules/color-grabber/color-grabber` to your Xcode project
2. In your project `Build Settings` under `Header Search Paths` add
```
  $(SRCROOT)/../node_modules/react-native/React
```


## API

### `getAllSwatches(options, image, (error, swatches) => {})`

#### options
An object containing option properties. Currently the only supported property is `threshold`, valid for iOS only, which determines whether white or black text will be selected to contrast with the selected color. It is the value for `L`, in the complex formula at the end of this [StackOverflow comment](http://stackoverflow.com/a/3943023/1404185). The default value is 0.179.

#### image
A path to an image such as that returned by [`react-native-image-picker`](https://github.com/marcshilling/react-native-image-picker). For iOS use the `origURL` field of the image picker response, because only images from `assets-library://` have been tested. For Android use the `path` field.

#### callback
The callback is passed an error parameter and an array of swatches representing the dominant colors in the image. Typically 16 swatches are returned on Android, fewer on iOS.

### `getNamedSwatches(image, (error, swatches) => {})`

Android only.

#### image

Same as in `getAllSwatches`

#### swatches

An object keyed by the qualities of colors defined by the Android `Palette` Class.
The keys are the following:

* "Vibrant"
* "Vibrant Dark"
* "Vibrant Light"
* "Muted"
* "Muted Dark"
* "Muted Light"

The values are swatches (possibly `null`) or with the fields defined below.


### Swatch Fields

Colors include alpha in the `react-native` hexadecimal `#rrggbbaa` format.

Field | Info
------ | ----
color | The main color of the swatch.
population | The dominance of this swatch in the image. You can sort on this field to find the most dominant swatch. Android: A positive integer. iOS: A floating point number between 0 and 1.
titleTextColor | A text color which contrasts well with the main swatch color for use in titles.
bodyTextColor | A text color which contrasts well with the main swatch color for use as body text.
swatchInfo | A string encapsulating all the above and more. Can be used for debugging. Android: Note that the hex strings are in the format `#aarrggbb` rather than the `react-native` format. iOS: the result string returned by the old (v0) API.

### Example
```javascript

  import {getAllSwatches} from 'react-native-color-grabber';
  import ImagePicker from 'react-native-image-picker'

  ImagePicker.launchImageLibrary({}, (response)  => {
    var path =  Platform.OS === 'ios' ? response.origURL : response.path;
    getAllSwatches({}, path, (error, swatches) => {
      if (error) {
        console.log(error);
      } else {
        swatches.sort((a, b) => {
          return b.population - a.population;
        });
        swatches.forEach((swatch) => {
          console.log(swatch.swatchInfo);
        });
      }
    });
  });
```

## Backward Compatibility.

The original (v0) API for iOS as defined [here](./README_old.md) is available by importing directly from `NativeModules`:
```
  NativeModules.colorGrabber.getColors(response.origURL, (err, res) => {});
```
