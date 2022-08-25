import React from 'react';
import {View, Text} from 'react-native';

export function JobCard({item}) {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 5,
        marginRight: 10,
        width: 250,
        marginTop: 10,
      }}>
      <Text
        style={{
          color: '#606060',
        }}>
        {item.companyName ? item.companyName : 'dummy company'}
      </Text>
      <Text
        style={{
          color: '#606060',
        }}>
        {item.startMonth +
          ' ' +
          item.startYear +
          ' ' +
          '-' +
          ' ' +
          item.endMonth +
          ' ' +
          item.endYear}
      </Text>
      {/* <Text
        style={{
          color: '#606060',
        }}>
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
        laying out print, graphic or web designs. The passage is attributed to
        an unknown typesetter in the 15th century
      </Text> */}
    </View>
  );
}
