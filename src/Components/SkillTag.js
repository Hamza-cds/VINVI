import React from 'react';
import {View, Text} from 'react-native';
import {SECONDARY} from '../Constants/Colors';

export default function SkillTag({item}) {
  console.log('skill item', item);
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: SECONDARY,
        marginRight: 10,
        marginBottom: 10,
      }}>
      <Text style={{color: SECONDARY, fontSize: 12}}>
        {item ? item : 'skill'}
      </Text>
    </View>
  );
}
