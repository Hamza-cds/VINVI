import React from 'react';
import {View, Text} from 'react-native';

export default function OtherMessage({message}) {
  console.log('other USer mesaages', message);
  return (
    <View style={{alignSelf: 'flex-start', marginBottom: 20}}>
      <View
        style={{
          width: '80%',
          padding: 20,
          backgroundColor: 'yellow',
          borderRadius: 10,
        }}>
        <Text style={{color: 'black', fontSize: 13}}>{message}</Text>
      </View>
    </View>
  );
}
