import React from 'react';
import {View, Text} from 'react-native';
import {WHITE} from '../Constants/Colors';

export function SkillCard({Skillname}) {
  return (
    <View
      style={{
        backgroundColor: WHITE,
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
      }}>
      <Text
        style={{
          color: '#7A7A7A',
        }}>
        {Skillname}
      </Text>
    </View>
  );
}
