import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import SearchIndividualScreen from '../Screens/SearchIndividualScreen';
// import SearchBusinessScreen from '../Screens/SearchBusinessScreen';
import SentRequestScreen from '../Screens/SentRequestScreen';
import RecievedRequestScreen from '../Screens/RecievedRequestScreen';
import {PRIMARY, SECONDARY, WHITE} from '../Constants/Colors';
import {useIsFocused} from '@react-navigation/native';
import MyQrCodeSc from '../Screens/MyQrCodeSc';
import ScanQrCodeSc from '../Screens/ScanQrCodeSc';
import {TabBarIndicator} from 'react-native-tab-view';

const Tab = createMaterialTopTabNavigator();

export default function TopTabsNavigator({variant}) {
  if (variant === 'search') {
    return (
      <Tab.Navigator
        // initialRouteName="Search Individual"
        initialRouteName="My Code"
        tabBarOptions={{
          labelStyle: {fontSize: 12},
          activeTintColor: PRIMARY,
          inactiveTintColor: 'grey',
          indicatorStyle: {
            borderBottomWidth: 2,
            borderColor: PRIMARY,
          },
          style: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            elevation: 0,
            marginHorizontal: 20,
            marginTop: 10,
            marginBottom: 30,
            color: 'red',
            // color: useIsFocused ? 'pink' : null,
          },
          bounces: true,
        }}>
        <Tab.Screen
          // name="Search Individual"
          // component={SearchIndividualScreen}
          name="My Code"
          component={MyQrCodeSc}
        />
        <Tab.Screen
          //  name="Search Buisness"
          // component={SearchBusinessScreen}
          name="Scan"
          component={ScanQrCodeSc}
        />
      </Tab.Navigator>
    );
  } else if (variant === 'request') {
    return (
      <Tab.Navigator
        initialRouteName="SentRequestScreen"
        tabBarOptions={{
          labelStyle: {fontSize: 12, color: WHITE},
          style: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            elevation: 0,
            marginHorizontal: 20,
            marginTop: 10,
            marginBottom: 30,
          },
          bounces: true,
        }}>
        <Tab.Screen name="SentRequestScreen" component={SentRequestScreen} />
        <Tab.Screen
          name="RecievedRequestScreen"
          component={RecievedRequestScreen}
        />
      </Tab.Navigator>
    );
  }
}
