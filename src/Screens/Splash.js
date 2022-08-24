import React, {useState, useEffect} from 'react';
import {ImageBackground, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

export default function Splash({navigation}) {
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('isFirstTimeRunApp')
      .then(res => {
        console.log('res', res);
        if (res != undefined && res == 'true' && userData != null) {
          AsyncStorage.getItem('logedIn')
            .then(result => {
              console.log('result', result);
              if (result == 'true') goToRespectivePage('Dashboard');
              else goToRespectivePage('Login');
            })
            .catch(err => {
              console.log('err', err);
              goToRespectivePage('Login');
            });
        } else if (res != undefined && res == 'true' && userData == null) {
          AsyncStorage.getItem('logedIn')
            .then(result => {
              console.log('result', result);
              if (result == 'true') goToRespectivePage('Login');
              else goToRespectivePage('Login');
            })
            .catch(err => {
              console.log('err', err);
              goToRespectivePage('Login');
            });
        } else goToRespectivePage('welcome');
      })
      .catch(err => {
        console.log('err', err);
        goToRespectivePage('welcome');
      });
  }, []);

  const goToRespectivePage = pageName => {
    //   props.navigation.replace(pageName);
    SplashScreen.hide();
    navigation.reset({
      index: 0,
      routes: [{name: pageName}],
    });
  };

  return (
    <></>
    // <View>
    //   <ImageBackground
    //     style={{width: '100%', height: '100%'}}
    //     source={require('../Assets/Splash.png')}
    //   />
    // </View>
  );
}
