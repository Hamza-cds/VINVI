import React, {useState} from 'react';
import {View, Text, ImageBackground, SafeAreaView} from 'react-native';
import {SECONDARY, LIGHT_TEXT_COLOR} from '../Constants/Colors';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import {Height, Width} from '../Constants/Constants';
import RegisterInputBox from '../Components/RegisterInputBox';
import {isNullOrEmpty, stringsNotEqual} from '../Constants/TextUtils';
import {PhoneNumber} from '../Constants/Validations';
import {GenerateCodeApiCall} from '../Apis/Repo';
import Loader from '../Components/Loader';

const ForgetPasswordScreen = props => {
  console.log('props', props);
  const navigation = props.navigation;
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [conPass, setConPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [Error, setError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passErrorMsg, setPassErrorMsg] = useState(false);
  const [confirmpassError, setConfirmPassError] = useState(false);
  const [confirmpassErrorMsg, setConfirmPassErrorMsg] = useState(false);

  const onSend = () => {
    if (isNullOrEmpty(phone)) {
      setError(true);
      setErrorMsg('Enter Number');
    } else if (isNullOrEmpty(pass)) {
      setPass(true);
      setPassErrorMsg('Enter Password');
    } else if (isNullOrEmpty(conPass)) {
      setConfirmPassError(true);
      setConfirmPassErrorMsg('Enter Password');
    } else {
      let object = {
        phoneno: phone,
      };
      console.log('object', object);

      setIsLoading(true);
      GenerateCodeApiCall(object)
        .then(response => {
          console.log('response', response);

          if (response.data.status == 200) {
            setIsLoading(false);
            navigation.navigate('PhoneVerification', {
              phone: phone,
              password: pass,
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

  const PasswordCheck = value => {
    if (isNullOrEmpty(value)) {
      setPassError(true);
      setPassErrorMsg('Enter Password');
    } else {
      setPassError(false);
    }
  };

  const ConfirmPassCheck = value => {
    if (isNullOrEmpty(value)) {
      setConfirmPassError(true);
      setConfirmPassErrorMsg('Enter Password');
    } else if (stringsNotEqual(pass, value)) {
      setConfirmPassError(true);
      setConfirmPassErrorMsg('Password !match');
    } else {
      setConfirmPassError(false);
    }
  };

  const NumberCheck = value => {
    if (isNullOrEmpty(value)) {
      setError(true);
      setErrorMsg('Enter Number');
    } else if (PhoneNumber(value)) {
      setError(true);
      setErrorMsg('Inavlid Number');
    } else {
      setError(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        height: Height,
        widht: Width,
      }}>
      <ImageBackground
        source={require('../Assets/loginbg.png')}
        style={{
          flex: 1,
          height: Height,
        }}>
        <Header
          navigation={navigation}
          variant="light"
          headerName=""
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
        <View
          style={{
            paddingVertical: 50,
            paddingHorizontal: 20,
            display: 'flex',
            justifyContent: 'space-between',
            height: Height - 100,
          }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: SECONDARY,
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              Forgot Password
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: LIGHT_TEXT_COLOR,
                marginBottom: 20,
              }}>
              Enter you phone number and set your password
            </Text>
            <RegisterInputBox
              placeholder="Phone"
              inputType="text"
              keyboardType={'numeric'}
              maxLength={11}
              ERROR={Error}
              ERROR_MESSAGE={ErrorMsg}
              KeyboardType={'numeric'}
              backgroundColor={'#EFEFEF'}
              onChange={value => {
                setPhone(value);
                NumberCheck(value);
              }}
            />

            <RegisterInputBox
              placeholder="New Password"
              inputType="password"
              keyboardType={'default'}
              ERROR={passError}
              ERROR_MESSAGE={passErrorMsg}
              backgroundColor={'#EFEFEF'}
              onChange={value => {
                setPass(value);
                PasswordCheck(value);
              }}
            />

            <RegisterInputBox
              placeholder="Confirm New Password"
              inputType="password"
              ERROR={confirmpassError}
              ERROR_MESSAGE={confirmpassErrorMsg}
              backgroundColor={'#EFEFEF'}
              onChange={value => {
                setConPass(value);
                ConfirmPassCheck(value);
              }}
            />
          </View>
          <BtnComponent
            placeholder="Send Code"
            onPress={() => {
              onSend();
            }}
          />
        </View>
        {isLoading ? <Loader /> : null}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ForgetPasswordScreen;
