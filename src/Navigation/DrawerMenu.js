import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Image, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {PRIMARY, SECONDARY, WHITE} from '../Constants/Colors';
import {URL} from '../Constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const CustomSidebarMenu = props => {
  // let [userData, setUserData] = useState('');
  const DATA = useSelector(state => state.UserData);

  // useEffect(() => {
  //   AsyncStorage.getItem('user_data').then(response => {
  //     setUserData((userData = JSON.parse(response)));
  //     console.log('userdata', userData);
  //   });
  // }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: SECONDARY}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          paddingHorizontal: 10,
          paddingVertical: 40,
          position: 'absolute',
          top: 5,
          left: 0,
          backgroundColor: SECONDARY,
          zIndex: 1,
        }}>
        <View
          style={{
            // backgroundColor: 'red',
            height: 50,
            width: 40,
            position: 'absolute',
            left: 15,
            top: 40,
          }}>
          {DATA.profileImage ? (
            <Image
              style={{height: 50, width: 50, borderRadius: 25}}
              source={{uri: URL.concat(DATA.profileImage)}}
            />
          ) : (
            <Ionicons
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                // Left: -20,
                Top: 7,
                position: 'absolute',
              }}
              name="md-person"
              size={40}
              color={WHITE}
            />
          )}
        </View>
        <View style={{marginLeft: 50}}>
          <Text
            numberOfLines={1}
            style={{
              color: WHITE,
              fontSize: 18,
              fontWeight: 'bold',
              width: 180,
            }}>
            {/* {userData.firstName + '' + userData.lastName} */}
            {DATA.firstName ? DATA.firstName : 'name'}
          </Text>
          <Text style={{color: WHITE, fontSize: 14}}>
            {DATA.phoneno ? DATA.phoneno : 'number'}
          </Text>
        </View>
      </View>
      <View style={{marginTop: 90}}></View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {/* <Text>hamza</Text> */}
    </SafeAreaView>
  );
};

export default CustomSidebarMenu;
