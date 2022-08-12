import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {PRIMARY, WHITE} from '../Constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export function EducationCard({item}) {
  return (
    <View
      style={{
        backgroundColor: WHITE,
        width: 250,
        // padding: 20,
        marginRight: 10,
        borderRadius: 10,
        marginTop: 10,
      }}>
      <TouchableOpacity
        style={{alignSelf: 'flex-end', marginTop: -7, marginRight: -7}}>
        <AntDesign name="closecircle" size={23} color={PRIMARY} />
      </TouchableOpacity>
      <View style={{padding: 10}}>
        <Text
          style={{
            color: '#7A7A7A',
          }}>
          {item.institute}
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
          {item.degree}
        </Text>
      </View>
    </View>
  );
}
