import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';

export function EducationCard({item, edit, onPress}) {
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
      {edit == true ? (
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            marginTop: -10,
            marginRight: -10,
            padding: 3,
          }}
          onPress={onPress}
          // onPress={() => {
          //   setEdit(true);
          // }}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={21.004}
            height={21.009}
            viewBox="0 0 21.004 21.009">
            <Path
              data-name="Icon ionic-ios-settings"
              d="M23.77 15a2.7 2.7 0 011.73-2.52 10.713 10.713 0 00-1.3-3.123 2.739 2.739 0 01-1.1.235 2.7 2.7 0 01-2.467-3.8 10.681 10.681 0 00-3.118-1.3 2.7 2.7 0 01-5.043 0A10.713 10.713 0 009.357 5.8 2.7 2.7 0 016.89 9.6a2.65 2.65 0 01-1.1-.235 10.95 10.95 0 00-1.29 3.121 2.7 2.7 0 01.005 5.043 10.713 10.713 0 001.3 3.123 2.7 2.7 0 013.561 3.561 10.776 10.776 0 003.123 1.3 2.7 2.7 0 015.032 0 10.713 10.713 0 003.123-1.3 2.7 2.7 0 013.556-3.561 10.776 10.776 0 001.3-3.123A2.716 2.716 0 0123.77 15zm-8.719 4.37A4.376 4.376 0 1119.427 15a4.375 4.375 0 01-4.376 4.372z"
              transform="translate(-4.5 -4.5)"
              fill="#113066"
            />
          </Svg>
        </TouchableOpacity>
      ) : null}

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
