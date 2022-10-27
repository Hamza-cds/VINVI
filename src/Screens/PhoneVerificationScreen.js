import React, {useState} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {SECONDARY, LIGHT_TEXT_COLOR} from '../Constants/Colors';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import PhoneVerificationCell from '../Components/PhoneVerificationCell';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Height, Width} from '../Constants/Constants';
import {isNullOrEmpty} from '../Constants/TextUtils';
import {CODE_ERROR} from '../Constants/Strings';
import {verifyUserApiCall} from '../Apis/Repo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';

export default function PhoneVerificationScreen(props, navigation) {
  console.log('props', props);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onVerify = () => {
    if (isNullOrEmpty(code)) alert(CODE_ERROR);
    else {
      let object = {
        VerificationCode: code,
        Phoneno: props.route.params.phone,
        LoginPassword: props.route.params.password,
      };
      console.log('object', object);

      setIsLoading(true);
      verifyUserApiCall(object)
        .then(response => {
          console.log('response', response);

          if (response.data.status == 98) {
            setIsLoading(false);
            alert(CODE_ERROR);
          } else setIsLoading(false);
          AsyncStorage.setItem(
            'user_data',
            JSON.stringify(response.data.result),
          );

          props.navigation.replace('Login');
        })
        .catch(err => {
          setIsLoading(false);
          console.log('err', err);
        });
    }
  };

  return (
    <SafeAreaView style={{height: Height, width: Width}}>
      <ImageBackground
        source={require('../Assets/loginbg.png')}
        style={{flex: 1, height: Height}}>
        <Header
          navigation={navigation}
          variant="light"
          headerName=""
          onPress={() => {
            props.navigation.push('ForgotPassword');
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
              Phone Verification
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: LIGHT_TEXT_COLOR,
                marginBottom: 20,
              }}>
              Enter the 6-Digit Code you Recieved on you phone
            </Text>
            <PhoneVerificationCell onChange={text => setCode(text)} />
          </View>
          <BtnComponent
            placeholder="Verify"
            onPress={() => {
              onVerify();
            }}
            // onPress={() => {
            //   navigation.navigate('PhoneVerification');
            // }}
          />
        </View>
        {isLoading ? <Loader /> : null}
      </ImageBackground>
    </SafeAreaView>
  );
}
