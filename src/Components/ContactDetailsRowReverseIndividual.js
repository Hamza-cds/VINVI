import React from 'react';
import {View, Text} from 'react-native';
import {SECONDARY, WHITE} from '../Constants/Colors';

export default function ContactDetailsRowReverseIndividual({placeholder, svg}) {
  return (
    <View
      style={{
        marginVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
      }}>
      {svg}
      <Text style={{fontSize: 14, color: WHITE, marginLeft: 10}}>
        {placeholder}
      </Text>
    </View>
  );
}
