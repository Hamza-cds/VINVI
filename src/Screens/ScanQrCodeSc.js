import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Height, Width} from '../Constants/Constants';
import {Camera} from 'react-native-camera-kit';

export default function ScanQrCodeSc() {
  return (
    <View style={{flex: 1}}>
      <Camera
        style={{
          width: '100%',
          height: '100%',
        }}
        scanBarcode={true}
        ratioOverlay={['16:9', '1:1', '3:4']}
        onReadCode={event => alert('QR code found\n', event)} // optional
        showFrame={false} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
        laserColor="green" // (default red) optional, color of laser in scanner frame
        frameColor="white" // (default white) optional, color of border of scanner frame
      />
    </View>
  );
}
