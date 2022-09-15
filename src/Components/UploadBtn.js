import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, Image} from 'react-native';
import {PRIMARY, WHITE} from '../Constants/Colors';
import BtnComponent from '../Components/BtnComponent';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import {URL} from '../Constants/Constants';

const UploadBtn = ({svg, placeholder, onCallBack, label}) => {
  const [modalVisible, setModalVisible] = useState(false);
  console.log('svg', svg);
  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          // paddingVertical: 20,
          borderRadius: 5,
          marginVertical: 10,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: PRIMARY,
          height: 200,
          width: '100%',
        }}>
        {svg ? (
          <Image
            source={{uri: svg.path}}
            style={{height: 200, width: '100%'}}
          />
        ) : (
          <Text
            style={{
              fontSize: 14,
              color: '#A8A8A8',
              fontWeight: 'bold',
              marginVertical: 80,
            }}>
            {label}
          </Text>
        )}
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 14,
          color: '#242424',
          fontWeight: 'bold',
        }}>
        {placeholder}
      </Text>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '55%',
            backgroundColor: 'rgba(255,255,255,.5)',
          }}
          onPress={() => setModalVisible(!modalVisible)}
        />
        <View
          style={{
            width: '100%',
            backgroundColor: WHITE,
            bottom: 0,
            padding: 20,
            position: 'absolute',
            height: '45%',
          }}>
          <BtnComponent
            placeholder="Open Camera"
            onPress={() => {
              ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: false,
              }).then(image => {
                onCallBack(image);
                setModalVisible(false);
                // RNFS.readFile(image.path, 'base64').then(res => {
                //   // console.log("res", res)
                //   onCallBack(
                //     res,
                //     placeholder == 'Profile Photo' ? 'profile' : 'cover',
                //   );
                // });
              });
            }}
          />
          <BtnComponent
            placeholder="Upload Image"
            onPress={() => {
              ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                console.log('ye ha image ', image);
                onCallBack(image);
                setModalVisible(false);
                // RNFS.readFile(image.path, 'base64').then(res => {
                //   // console.log("res", res)
                //   onCallBack(
                //     res,
                //     placeholder == 'Profile Photo' ? 'profile' : 'cover',
                //   );
                // });
              });
            }}
          />
          <BtnComponent
            placeholder="Close"
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </Modal>
    </>
  );
};

export default UploadBtn;
