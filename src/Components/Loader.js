import React from 'react';
import {Modal, View} from 'react-native';
import {DotIndicator} from 'react-native-indicators';

export default function Loader() {
  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 15,
            paddingHorizontal: 7,
            height: 20,
            justifyContent: 'center',
          }}>
          <DotIndicator
            style={{width: 30, height: 30}}
            size={6}
            count={3}
            color={'#113066'}
          />
        </View>
      </View>
    </Modal>
  );
}
