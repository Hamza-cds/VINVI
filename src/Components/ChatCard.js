import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SECONDARY, LIGHT_TEXT_COLOR, WHITE} from '../Constants/Colors';

export default function ChatCard({
  name,
  picture,
  lastMessage,
  timeStamp,
  badgeValue,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: WHITE,
        borderRadius: 5,
        marginBottom: 20,
        shadowColor: 'rgba(0,0,0,.5)',
        shadowOffset: {
          width: 8,
          height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal: 20,
      }}>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={picture}
          style={{width: 55, height: 55, borderRadius: 30}}
        />
        <View style={{marginLeft: 10}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{name}</Text>
          <Text style={{fontSize: 14, color: '#3C50FF'}}>{lastMessage}</Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={{fontSize: 14, color: LIGHT_TEXT_COLOR, marginBottom: 5}}>
          {timeStamp}
        </Text>
        {/* <View
          style={{
            backgroundColor: SECONDARY,
            width: 22,
            height: 22,
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: WHITE}}>{badgeValue}</Text>
        </View> */}
      </View>
    </TouchableOpacity>
  );
}
