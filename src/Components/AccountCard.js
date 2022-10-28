import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SECONDARY, WHITE} from '../Constants/Colors';
import {USER_NAME, USER_EMAIL, URL} from '../Constants/Constants';
import {useNavigation} from '@react-navigation/native';
import {isNullOrEmpty} from '../Constants/TextUtils';

export default function AccountCard({item}) {
  console.log('jkahslfsnd asjdfhasdkfj item', item);
  const navigation = useNavigation();
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: WHITE,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        paddingHorizontal: 30,
        paddingVertical: 15,
        marginBottom: 20,
        marginHorizontal: 20,
      }}>
      <Image
        source={
          !isNullOrEmpty(item)
            ? !isNullOrEmpty(item.profileImage)
              ? {uri: URL.concat(item.profileImage)}
              : require('../Assets/profilePic.png')
            : require('../Assets/profilePic.png')
        }
        style={{
          height: 70,
          width: 70,
          borderRadius: 35,
        }}
      />
      <View style={{marginLeft: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          {item ? (item.firstName ? item.firstName : 'name') : 'name'}
        </Text>
        <Text style={{fontSize: 14}}>
          {item ? (item.email ? item.email : 'email') : 'email'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditProfile');
        }}
        style={{
          borderRadius: 5,
          borderColor: SECONDARY,
          position: 'absolute',
          top: 1,
          right: 1,
          backgroundColor: WHITE,
          padding: 5,
        }}>
        <Image source={require('../Assets/editProf.png')} />
      </TouchableOpacity>
    </View>
  );
}
