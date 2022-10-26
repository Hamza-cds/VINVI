import React, {useState, useEffect} from 'react';
import {ImageBackground, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {UserData, UserCredential} from '../../Store/Action';
import {useDispatch} from 'react-redux';
import {loginApiCall} from '../Apis/Repo';
import {isNullOrEmpty} from '../Constants/TextUtils';

export default function Splash(props) {
  let [userData, setUserData] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      dispatch(UserData(userData));
      console.log('userdata', userData);
    });
  }, []);

  useEffect(() => {
    onHandleUserLoginCheck();
  }, []);

  // useEffect(() => {
  //   AsyncStorage.getItem('isFirstTimeRunApp')
  //     .then(res => {
  //       console.log('res', res);
  //       if (res != undefined && res == 'true' && userData != null) {
  //         AsyncStorage.getItem('logedIn')
  //           .then(result => {
  //             console.log('result', result);
  //             if (result == 'true') goToRespectivePage('Dashboard');
  //             else goToRespectivePage('Login');
  //           })
  //           .catch(err => {
  //             console.log('err', err);
  //             goToRespectivePage('Login');
  //           });
  //       } else if (res != undefined && res == 'true' && userData == null) {
  //         AsyncStorage.getItem('logedIn')
  //           .then(result => {
  //             console.log('result', result);
  //             if (result == 'true') goToRespectivePage('Login');
  //             else goToRespectivePage('Login');
  //           })
  //           .catch(err => {
  //             console.log('err', err);
  //             goToRespectivePage('Login');
  //           });
  //       } else goToRespectivePage('welcome');
  //     })
  //     .catch(err => {
  //       console.log('err', err);
  //       goToRespectivePage('welcome');
  //     });
  // }, []);

  const onHandleUserLoginCheck = () => {
    AsyncStorage.getItem('isFirstTimeRunApp')
      .then(res => {
        console.log('spalsh res', res);
        if (!isNullOrEmpty(res)) {
          AsyncStorage.getItem('user_data')
            .then(result => {
              // console.log('spalsh result', result);
              if (!isNullOrEmpty(result)) onHandleLogin();
              else goToRespectivePage('Login');
            })
            .catch(err => {
              goToRespectivePage('Login');
            });
        } else {
          goToRespectivePage('Welcome');
        }
      })
      .catch(err => {
        goToRespectivePage('Welcome');
      });
  };

  const onHandleLogin = async () => {
    let phone = await AsyncStorage.getItem('phone');
    let password = await AsyncStorage.getItem('password');
    let object = {
      Phoneno: phone,
      Password: password,
    };
    loginApiCall(object)
      .then(response => {
        console.log('splash login response', response);
        // if (response.data.status != 200) {
        //   goToRespectivePage('Login');
        // } else
        if (response.data.status == 200) {
          SplashScreen.hide();
          dispatch(UserData(response.data.result));
          dispatch(UserCredential(password));
          AsyncStorage.setItem(
            'user_data',
            JSON.stringify(response.data.result),
          );
          AsyncStorage.setItem('isLogin', JSON.stringify(true));
          AsyncStorage.setItem('phone', phone);
          AsyncStorage.setItem('password', password);
          props.navigation.replace('Dashboard', {
            phone: phone,
            password: password,
          });
        } else goToRespectivePage('Login');
      })
      .catch(err => {
        goToRespectivePage('Login');
      });
  };

  const goToRespectivePage = pageName => {
    // props.navigation.replace(pageName);
    SplashScreen.hide();
    props.navigation.reset({
      index: 0,
      routes: [{name: pageName}],
    });
  };

  // const goToRespectivePage = pageName => {
  //   //   props.navigation.replace(pageName);
  //   SplashScreen.hide();
  //   navigation.reset({
  //     index: 0,
  //     routes: [{name: pageName}],
  //   });
  // };

  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={require('../Assets/Splash.png')}
    />
  );
}
