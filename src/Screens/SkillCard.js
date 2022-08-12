import React from 'react';
import {View, Text} from 'react-native';

export function SkillCard({Skillname}) {
  return (
    <View
      style={{
        backgroundColor: '#EFEFEF',
        padding: 10,
        marginRight: 10,
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
