import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {SECONDARY, WHITE} from '../Constants/Colors';
import RegisterInputBox from '../Components/RegisterInputBox';
import BtnComponent from '../Components/BtnComponent';
import {Height, Width} from '../Constants/Constants';
import {signUpApiCall} from '../Apis/Repo';
import {
  isInvalidPassword,
  isInvalidPhoneNumber,
  isPassword,
  PhoneNumber,
} from '../Constants/Validations';
import {
  MATCH_ERROR,
  MINIMUM_PASSWORD,
  PASSWORD_ERROR,
  PHONE_EMPTY_ERROR,
  PHONE_LENGTH_ERROR,
} from '../Constants/Strings';
import {
  isNullOrEmpty,
  phoneLengthNotValid,
  stringsNotEqual,
} from '../Constants/TextUtils';

export default function RegisterScreen(props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Error, setError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passErrorMsg, setPassErrorMsg] = useState(false);
  const [confirmpassError, setConfirmPassError] = useState(false);
  const [confirmpassErrorMsg, setConfirmPassErrorMsg] = useState(false);
  // console.log('password', password);
  // console.log('confirmPassword', confirmPassword);

  const NumberCheck = value => {
    if (value == '') {
      setError(true);
      setErrorMsg('Enter Number');
    } else if (PhoneNumber(value)) {
      setError(true);
      setErrorMsg('Inavlid Number');
    } else {
      setError(false);
    }
  };

  const PasswordCheck = value => {
    if (value == '') {
      setPassError(true);
      setPassErrorMsg('Enter Password');
    } else if (isPassword(value)) {
      setPassError(true);
      setPassErrorMsg('Inavlid Password');
    } else {
      setPassError(false);
    }
  };

  const ConfirmPassCheck = value => {
    console.log('value', confirmPassword);
    if (value == '') {
      setConfirmPassError(true);
      setConfirmPassErrorMsg('Enter Confirm Password');
    } else if (stringsNotEqual(value, password)) {
      setConfirmPassError(true);
      setConfirmPassErrorMsg('Password !match');
    } else {
      setConfirmPassError(false);
    }
  };

  const onSignUp = () => {
    if (isNullOrEmpty(phoneNumber)) alert(PHONE_EMPTY_ERROR);
    else if (phoneLengthNotValid(phoneNumber)) alert(PHONE_LENGTH_ERROR);
    else if (isNullOrEmpty(password)) alert(PASSWORD_ERROR);
    else if (isInvalidPassword(password)) alert(MINIMUM_PASSWORD);
    else if (isNullOrEmpty(confirmPassword)) alert(PASSWORD_ERROR);
    else if (stringsNotEqual(password, confirmPassword)) alert(MATCH_ERROR);
    else {
      let object = {
        Phoneno: phoneNumber,
        LoginPassword: password,
      };
      console.log('object', object);

      let updateinfo = new FormData();
      updateinfo.append('Model', JSON.stringify(object));

      signUpApiCall(updateinfo)
        .then(res => res.json())
        .then(data => {
          console.log('data', data);

          if (data.status == 335) {
            props.navigation.push('PhoneVerification', {
              paramKey: phoneNumber,
              paramKey1: password,
            });
          } else {
            alert(data.message);
            console.log('ADD');
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  };

  return (
    <SafeAreaView style={{height: Height, width: Width}}>
      <ScrollView style={{flex: 1}}>
        <ImageBackground
          source={require('../Assets/registerbg.png')}
          style={{flex: 1, minHeight: Height}}>
          <View
            style={{
              width: '100%',
              height: '100%',
              paddingVertical: 20,
              paddingHorizontal: 20,
              paddingBottom: 50,
              display: 'flex',
              justifyContent: 'space-evenly',
            }}>
            <Image
              source={require('../Assets/vinvilightlogo.png')}
              style={{
                marginVertical: 20,
                alignSelf: 'center',
                width: 100,
                height: 55,
              }}></Image>
            <Text
              style={{
                fontSize: 30,
                color: WHITE,
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              Join Us
            </Text>
            <RegisterInputBox
              placeholder="Phone"
              keyboardType={'number-pad'}
              maxLength={12}
              ERROR={Error}
              ERROR_MESSAGE={ErrorMsg}
              onChange={value => {
                NumberCheck(value);
                setPhoneNumber(value);
              }}
            />
            <RegisterInputBox
              placeholder="Password"
              inputType="password"
              keyboardType={'default'}
              ERROR={passError}
              ERROR_MESSAGE={passErrorMsg}
              onChange={value => {
                PasswordCheck(value);
                setPassword(value);
              }}
            />

            <RegisterInputBox
              placeholder="Confirm Password"
              inputType="password"
              ERROR={confirmpassError}
              ERROR_MESSAGE={confirmpassErrorMsg}
              onChange={value => {
                ConfirmPassCheck();
                setConfirmPassword(value);
              }}
            />
            <BtnComponent
              placeholder="Sign Up"
              onPress={() => {
                onSignUp();
              }}
            />
            <Text style={{alignSelf: 'center', color: WHITE, marginBottom: 10}}>
              OR
            </Text>
            <View
              style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={{color: WHITE, fontSize: 14}}>
                Already have an account?
              </Text>
              <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={() => {
                  props.navigation.push('Login');
                }}>
                <Text
                  style={{
                    color: SECONDARY,
                    textDecorationStyle: 'solid',
                    textDecorationLine: 'underline',
                    fontSize: 14,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
