import React from 'react';
import {View, Text} from 'react-native';
import {FORTH, GREY, SECONDARY, WHITE} from '../Constants/Colors';

export default function UserMessage({message}) {
  return (
    <View style={{alignItems: 'flex-end', marginBottom: 20}}>
      <View
        style={{
          // width: '80%',
          padding: 10,
          backgroundColor: FORTH,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontSize: 15}}>{message}</Text>
      </View>
    </View>
  );
}
