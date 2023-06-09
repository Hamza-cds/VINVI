import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {GREY, SECONDARY, TEXT_COLOR, WHITE} from '../Constants/Colors';
import BtnComponent from '../Components/BtnComponent';
import OutlinedInputBox from '../Components/OutlinedInputBox';
import {Height, Width} from '../Constants/Constants';
import {isNullOrEmpty, phoneLengthNotValid} from '../Constants/TextUtils';
import {
  PASSWORD_ERROR,
  PHONE_EMPTY_ERROR,
  PHONE_LENGTH_ERROR,
  INCOMPLETE_PASSWORD,
} from '../Constants/Strings';
import {loginApiCall} from '../Apis/Repo';
import {
  isInvalidPassword,
  isInvalidPhoneNumber,
  notValidNumber,
  PhoneNumber,
} from '../Constants/Validations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';
import {useDispatch} from 'react-redux';
import {UserData, UserCredential} from '../../Store/Action';
import RegisterInputBox from '../Components/RegisterInputBox';

export default function LoginScreen(props) {
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [logedIn, setLogedIn] = useState(true);
  const [Error, setError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState(false);
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('fcmToken').then(data => {
      if (!isNullOrEmpty(data)) setFcmToken(data);
    });
  }, []);

  const onLogin = () => {
    if (isNullOrEmpty(phoneNumber)) {
      alert(PHONE_EMPTY_ERROR);
    } else if (phoneLengthNotValid(phoneNumber)) {
      alert(PHONE_LENGTH_ERROR);
    } else if (isNullOrEmpty(password)) {
      alert(PASSWORD_ERROR);
    } else if (isInvalidPassword(password)) alert(INCOMPLETE_PASSWORD);
    else {
      let object = {
        Phoneno: phoneNumber,
        Password: password,
        FCMToken: fcmToken,
      };
      console.log('object', object);

      setIsLoading(true);
      loginApiCall(object)
        .then(response => {
          console.log('response', response);

          if (response.data.status == 200) {
            AsyncStorage.setItem(
              'user_data',
              JSON.stringify(response.data.result),
            );
            dispatch(UserData(response.data.result));
            dispatch(UserCredential(password));
            AsyncStorage.setItem('logedIn', JSON.stringify(logedIn));

            AsyncStorage.setItem('phone', phoneNumber);
            AsyncStorage.setItem('password', password);
            setIsLoading(false);
            // props.navigation.navigate('NewPersonalCard4');
            props.navigation.replace('Dashboard', {
              paramKey: phoneNumber,
            });
          } else if (response.data.status == 335) {
            setIsLoading(false);
            props.navigation.push('PhoneVerification', {
              phone: phoneNumber,
              password: password,
            });
          } else {
            setIsLoading(false);
            alert(response.data.message);
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  };

  const NumberCheck = value => {
    // debugger;
    if (value == '') {
      setError(true);
      setErrorMsg('Enter Number');
    } else if (PhoneNumber(value)) {
      setError(true);
      setErrorMsg('Invalid Number');
    } else {
      setError(false);
    }
  };

  return (
    <SafeAreaView style={{height: Height, width: Width}}>
      <ScrollView style={{flex: 1}}>
        <ImageBackground
          source={require('../Assets/loginbg.png')}
          style={{flex: 1, minHeight: Height}}>
          <View
            style={{
              width: '100%',
              height: '100%',
              paddingVertical: 20,
              paddingHorizontal: 30,
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../Assets/vinvilogo.png')}
              style={{
                marginTop: 20,
                alignSelf: 'center',
                width: 100,
                height: 55,
              }}
            />
            <Text
              style={{
                fontSize: 30,
                color: SECONDARY,
                fontWeight: 'bold',
                // marginBottom: 20,
              }}>
              Login
            </Text>

            {/* <RegisterInputBox
              placeholder="Phone"
              keyboardType={'number-pad'}
              maxLength={12}
              onChange={value => {
                setPhoneNumber(value);
              }}
            />
            <RegisterInputBox
              placeholder="Password"
              inputType="password"
              keyboardType={'default'}
              onChange={value => {
                setPassword(value);
              }}
            /> */}

            <RegisterInputBox
              placeholder="Phone"
              keyboardType={'numeric'}
              backgroundColor={GREY}
              maxLength={11}
              ERROR={Error}
              ERROR_MESSAGE={ErrorMsg}
              onChange={value => {
                NumberCheck(value);
                setPhoneNumber(value);
              }}
            />
            <View style={{marginTop: -30}}>
              <RegisterInputBox
                placeholder="Password"
                inputType="password"
                KeyboardType={'default'}
                backgroundColor={GREY}
                onChange={value => {
                  setPassword(value);
                }}
              />
            </View>
            <View
              style={{
                marginTop: -35,
                // display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={() => {
                  props.navigation.push('ForgotPassword');
                }}>
                <Text
                  style={{
                    color: TEXT_COLOR,
                    textDecorationStyle: 'solid',
                    textDecorationLine: 'underline',
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <BtnComponent
              placeholder="Login"
              onPress={() => {
                onLogin();
              }}
            />
            <Text
              style={{
                alignSelf: 'center',
                color: SECONDARY,
                marginBottom: 25,
              }}>
              OR
            </Text>

            <View
              style={{
                // marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={{color: GREY, fontSize: 14, marginBottom: 80}}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => {
                  props.navigation.push('Register');
                }}>
                <Text
                  style={{
                    color: WHITE,
                    textDecorationStyle: 'solid',
                    textDecorationLine: 'underline',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {isLoading ? <Loader /> : null}
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
