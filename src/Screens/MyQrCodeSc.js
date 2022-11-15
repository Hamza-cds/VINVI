import React from 'react';
import {View, Text, Image} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';
import CryptoJS from 'react-native-crypto-js';

export default function MyQrCodeSc() {
  var date = new Date();

  const DATA = useSelector(state => state.UserData);
  console.log('Header dispatch DATA', DATA);
  let ciphertext = CryptoJS.AES.encrypt(
    date.getTime() +
      '_' +
      JSON.stringify(DATA.id) +
      '_' +
      date.getTime() +
      '|' +
      'qr',
    'secret key 123',
  ).toString();

  return (
    <View
      style={{
        paddingHorizontal: 20,
        // backgroundColor: 'red',
        paddingVertical: 20,
        height: '100%',
      }}>
      <View
        style={{
          height: 300,
          width: 300,
          marginTop: 50,
          backgroundColor: 'white',
          alignSelf: 'center',
          borderRadius: 10,
        }}>
        <Image
          source={require('../Assets/profilePic.png')}
          style={{
            height: 70,
            width: 70,
            borderRadius: 35,
            position: 'absolute',
            top: -33,
            alignSelf: 'center',
          }}
        />
        <Text style={{alignSelf: 'center', marginTop: 50}}>User Name</Text>
        <Text style={{alignSelf: 'center', marginTop: 5}}>User position</Text>

        <View style={{alignItems: 'center', marginTop: 30}}>
          <QRCode size={150} value={ciphertext} />
        </View>
      </View>
    </View>
  );
}
