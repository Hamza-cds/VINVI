import React from 'react';
import {Modal, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {DotIndicator} from 'react-native-indicators';
import {WHITE} from '../Constants/Colors';

export default function Loader({cancil, onPress}) {
  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      {cancil ? (
        <TouchableOpacity
          onPress={onPress}
          style={{
            position: 'absolute',
            right: 15,
            top: 15,
            zIndex: 1,
          }}>
          <Entypo name="cross" size={23} color={WHITE} />
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        {/* <View
          style={{
            backgroundColor: 'white',
            borderRadius: 15,
            paddingHorizontal: 7,
            height: 20,
            justifyContent: 'center',
          }}> */}
        <ActivityIndicator size="large" color={'#113066'} />
        {/* <DotIndicator
            style={{width: 30, height: 30}}
            size={6}
            count={3}
            color={'#113066'}
          /> */}
        {/* </View> */}
      </View>
    </Modal>
  );
}
