import React from 'react';
import {View, Text} from 'react-native';
import {FIFTH, GREY} from '../Constants/Colors';

export default function OtherMessage({message}) {
  return (
    <View style={{alignSelf: 'flex-start', marginBottom: 20}}>
      <View
        style={{
          // width: '80%',
          padding: 10,
          backgroundColor: GREY,
          borderRadius: 10,
        }}>
        <Text style={{color: 'black', fontSize: 13}}>{message}</Text>
      </View>
    </View>
  );
}
