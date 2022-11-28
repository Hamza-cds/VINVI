import React from 'react';
import {View, Text} from 'react-native';
import {SECONDARY, WHITE} from '../Constants/Colors';

export default function UserMessage({message}) {
  console.log('user mesaages', message);
  return (
    <View style={{alignItems: 'flex-end', marginBottom: 20}}>
      <View
        style={{
          width: '80%',
          backgroundColor: 'yellow',
          padding: 20,
          borderRadius: 10,
        }}>
        <Text style={{color: 'black', fontSize: 15}}>{message}</Text>
      </View>
    </View>
  );
}
