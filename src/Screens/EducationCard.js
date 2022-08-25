import React from 'react';
import {View, Text} from 'react-native';

export function EducationCard({item}) {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 5,
        marginRight: 10,
        minWidth: 250,
        marginTop: 10,
      }}>
      <Text
        style={{
          color: '#606060',
        }}>
        {item.institute ? item.institute : 'dummy institute'}
      </Text>
      <Text
        style={{
          color: '#606060',
        }}>
        {/* {item.startDateMonth
          ? item.startDateMonth
          : 'dummy month' + ' ' + item.startDateYear
          ? item.startDateYear
          : 'dummy year' + ' ' + '-' + ' ' + item.endDateMonth
          ? item.endDateMonth
          : 'dummy month' + ' ' + item.endDateYear
          ? item.endDateYear
          : 'dummy year'} */}
        {item.startDateMonth +
          ' ' +
          item.startDateYear +
          ' ' +
          '-' +
          ' ' +
          item.endDateMonth +
          ' ' +
          item.endDateYear}
      </Text>
      <Text
        style={{
          color: '#606060',
        }}>
        {item.degree ? item.degree : 'dummy degree'}
      </Text>
    </View>
  );
}
