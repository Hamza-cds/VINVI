import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Camera, CameraScreen} from 'react-native-camera-kit';

export default function ScanQrCodeSc({navigation, route}) {
  return (
    <View style={{flex: 1}}>
      <CameraScreen
        style={{
          width: '100%',
          height: '100%',
        }}
        scanBarcode={true}
        ratioOverlay={['16:9', '1:1', '3:4']}
        onReadCode={event => {
          // console.log(
          //   '2  093847y1929rhqwefh8qehfwqeuryhwfu',
          //   event.nativeEvent.codeStringValue,
          // );
          navigation.navigate('IndividualScreen', {
            param: event.nativeEvent.codeStringValue,
          });
        }}
        showFrame={false} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
        laserColor="green" // (default red) optional, color of laser in scanner frame
        frameColor="white" // (default white) optional, color of border of scanner frame
      />
    </View>
  );
}
