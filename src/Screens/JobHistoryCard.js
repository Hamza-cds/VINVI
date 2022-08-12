import React from 'react';
import {View, Text} from 'react-native';
import {WHITE} from '../Constants/Colors';

export function JobHistoryCard({item}) {
  return (
    <View
      style={{
        backgroundColor: WHITE,
        width: 250,
        padding: 20,
        marginRight: 10,
        borderRadius: 10,
        marginTop: 10,
      }}>
      <Text
        style={{
          color: '#7A7A7A',
        }}>
        {item.companyName}
      </Text>
      <Text
        style={{
          color: '#7A7A7A',
          marginVertical: 10,
        }}>
        {item.fromDate + '  ' + '-' + '  ' + item.toDate}
      </Text>
      <Text
        style={{
          color: '#7A7A7A',
          fontSize: 12,
        }}>
        {item.description}
      </Text>
    </View>
  );
}
