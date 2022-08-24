import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {PRIMARY, WHITE} from '../Constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export function JobHistoryCard({item, onPress}) {
  console.log('item', item);
  return (
    <View
      style={{
        backgroundColor: WHITE,
        width: 250,
        // padding: 10,
        marginRight: 10,
        borderRadius: 10,
        marginTop: 10,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{alignSelf: 'flex-end', marginTop: -7, marginRight: -7}}>
        <AntDesign name="closecircle" size={23} color={PRIMARY} />
      </TouchableOpacity>
      <View style={{padding: 10}}>
        <Text
          style={{
            color: '#7A7A7A',
          }}>
          {item.industryType}
        </Text>
        <Text
          style={{
            color: '#7A7A7A',
          }}>
          {item.companyName}
        </Text>
        <Text
          style={{
            color: '#7A7A7A',
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: '#7A7A7A',
          }}>
          {item.employeeType}
        </Text>
        <Text
          style={{
            color: '#7A7A7A',
            marginVertical: 10,
          }}>
          {item.startMonth +
            ' ' +
            item.startYear +
            '  ' +
            '-' +
            '  ' +
            item.endMonth +
            ' ' +
            item.endYear}
        </Text>
        <Text
          style={{
            color: '#7A7A7A',
            fontSize: 12,
          }}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}
