import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../Screens/Splash';
import IntroSc from '../Screens/IntroSc';
import RegisterScreen from '../Screens/RegisterScreen';
import LoginScreen from '../Screens/LoginScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import PhoneVerificationScreen from '../Screens/PhoneVerificationScreen';
import DrawerNavigation from '../Navigation/DrawerNavigation';
import AddCardScreen from '../Screens/AddCardScreen';
import NewPersonalCardScreen1 from '../Screens/NewPersonalCardScreen1';
import NewPersonalCardScreen2 from '../Screens/NewPersonalCardScreen2';
import NewPersonalCardScreen3 from '../Screens/NewPersonalCardScreen3';
import NewPersonalCardScreen4 from '../Screens/NewPersonalCardScreen4';
import NewBusinessCardScreen1 from '../Screens/NewBusinessCardScreen1';
import SearchScreen from '../Screens/SearchScreen';
import SearchResultScreen from '../Screens/SearchResultScreen';
import MessagesScreen from '../Screens/MessagesScreen';
import ChangePassowrdScreen from '../Screens/ChangePassowrdScreen';
import RequestScreen from '../Screens/RequestScreen';
import BusinessScreen from '../Screens/BusinessScreen';
import IndividualScreen from '../Screens/IndividualScreen';
import EditProfile from '../Screens/EditProfile';
import NewBusinessCardScreen2 from '../Screens/NewBusinessCardScreen2';
import NewBusinessCardScreen3 from '../Screens/NewBusinessCardScreen3';
import MyCardsDashboardScreen from '../Screens/MyCardsDashboardScreen';

Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Welcome"
        component={IntroSc}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="PhoneVerification"
        component={PhoneVerificationScreen}
      />
      <Stack.Screen name="Dashboard" component={DrawerNavigation} />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
      <Stack.Screen
        name="NewPersonalCard1"
        component={NewPersonalCardScreen1}
      />
      <Stack.Screen
        name="NewPersonalCard2"
        component={NewPersonalCardScreen2}
      />
      <Stack.Screen
        name="NewPersonalCard3"
        component={NewPersonalCardScreen3}
      />
      <Stack.Screen
        name="NewPersonalCard4"
        component={NewPersonalCardScreen4}
      />
      <Stack.Screen
        name="NewBuisnessCard1"
        component={NewBusinessCardScreen1}
      />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Request" component={RequestScreen} />
      <Stack.Screen name="SearchResult" component={SearchResultScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="IndividualScreen" component={IndividualScreen} />
      <Stack.Screen name="BusinessScreen" component={BusinessScreen} />
      <Stack.Screen name="ChangePassowrd" component={ChangePassowrdScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen
        name="MyCardsDashboardScreen"
        component={MyCardsDashboardScreen}
      />
      <Stack.Screen
        name="NewBusinessCard2"
        component={NewBusinessCardScreen2}
      />
      <Stack.Screen
        name="NewBusinessCard3"
        component={NewBusinessCardScreen3}
      />
    </Stack.Navigator>
  );
}
