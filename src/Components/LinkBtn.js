import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {LIGHT_TEXT_COLOR} from '../Constants/Colors';

export default function LinkBtn({svg, placeholder, onChange}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
      }}>
      {svg}
      <TextInput
        placeholder={placeholder}
        onChangeText={onChange}
        style={{
          fontSize: 14,
          color: LIGHT_TEXT_COLOR,
          marginLeft: 20,
          flex: 1,
        }}></TextInput>
    </View>
  );
}
