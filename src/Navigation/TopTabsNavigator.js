import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchIndividualScreen from '../Screens/SearchIndividualScreen';
import SearchBuisnessScreen from '../Screens/SearchBuisnessScreen';
import SentRequestScreen from '../Screens/SentRequestScreen';
import RecievedRequestScreen from '../Screens/RecievedRequestScreen';
import {PRIMARY1, WHITE} from '../Constants/Colors';
import {useIsFocused} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export default function TopTabsNavigator({variant}) {
  if (variant === 'search') {
    return (
      <Tab.Navigator
        initialRouteName="Search Individual"
        tabBarOptions={{
          labelStyle: {fontSize: 12, color: 'grey'},
          style: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            elevation: 0,
            marginHorizontal: 20,
            marginTop: 10,
            marginBottom: 30,
            color: useIsFocused ? PRIMARY1 : null,
          },
          bounces: true,
        }}>
        <Tab.Screen
          name="Search Individual"
          component={SearchIndividualScreen}
        />
        <Tab.Screen name="Search Buisness" component={SearchBuisnessScreen} />
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
