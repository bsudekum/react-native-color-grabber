import {
  Dimensions,
  Platform,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import {getSwatches} from 'react-native-color-grabber';


export default function(storeImage) {
  var max = Math.max(Dimensions.get('window').width,Dimensions.get('window').height);
  
  const options = {
    quality: 0.5,
    maxWidth: max|0, /* convert double to int by bitwise OR */
    maxHeight: max|0,
  };
  //console.log("In ImagePicker");
  ImagePicker.launchImageLibrary(options, (response) => {
    var colors = {};
    
    //console.log('Response = ', response);
    if (response.didCancel) {
      console.log('User cancelled photo picker');
    }
    else if (response.error) {
      console.log('ImagePickerManager Error: ', response.error);
    }
    else {
      colors.image = response.data;
      getSwatches({}, Platform.OS === 'ios' ? response.origURL : response.path, (error, swatches) => {
        if ( error) {
          console.log(error);
          colors.swatches = error;
        } else {
          swatches.sort((a, b) => {
            return b.population - a.population;
          });
          console.log(swatches);
          colors.swatches = swatches
        }
        storeImage(colors);
      }); 
    }
  });
}
