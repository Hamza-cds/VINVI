import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {SECONDARY, LIGHT_TEXT_COLOR} from '../Constants/Colors';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import {Height, Width} from '../Constants/Constants';
import RegisterInputBox from '../Components/RegisterInputBox';
import {isNullOrEmpty, stringsNotEqual} from '../Constants/TextUtils';
import {isInvalidPassword, PhoneNumber} from '../Constants/Validations';
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
    // debugger;
    if (isNullOrEmpty(phone)) {
      setError(true);
      setErrorMsg('Enter Number');
      alert("Phone number can't be empty");
    } else if (PhoneNumber(phone)) {
      alert('Invalid Phone Number');
    } else if (isNullOrEmpty(pass)) {
      setPassError(true);
      setPassErrorMsg('Enter Password');
      alert("Password can't be empty");
    } else if (isNullOrEmpty(conPass)) {
      setConfirmPassError(true);
      setConfirmPassErrorMsg('Enter Password');
      alert("Confirm Password can't be empty");
    } else if (stringsNotEqual(pass, conPass)) {
      setConfirmPassError(true);
      setConfirmPassErrorMsg('Passwords do not match');
      alert('Passwords do not match');
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
    } else if (isInvalidPassword(value)) {
      setPassError(true);
      setPassErrorMsg('Min 8 characters');
    } else if (!isNullOrEmpty(conPass)) {
      if (stringsNotEqual(value, conPass)) {
        setPassError(false);
        setConfirmPassError(true);
        setConfirmPassErrorMsg('Passwords do not match');
      } else {
        setPassError(false);
        setConfirmPassError(false);
      }
    } else {
      setConfirmPassError(false);
      setPassError(false);
    }
  };

  const ConfirmPassCheck = value => {
    console.log('value', value);
    if (isNullOrEmpty(value)) {
      setConfirmPassError(true);
      setConfirmPassErrorMsg('Enter Confirm Password');
    } else if (stringsNotEqual(pass, value)) {
      setConfirmPassError(true);
      setConfirmPassErrorMsg('Passwords do not match');
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
      setErrorMsg('Invalid Number');
    } else {
      setError(false);
    }
  };

  return (
    <>
      <ImageBackground
        source={require('../Assets/loginbg.png')}
        style={{
          flex: 1,
          height: Height,
          width: Width,
        }}>
        {/* <Header
          navigation={navigation}
          variant="light"
          headerName="Forgot Password"
          back={true}
          onPress={() => {
            navigation.navigate('Login');
          }}
        /> */}

        <View
          style={{
            paddingVertical: 50,
            paddingHorizontal: 20,
            display: 'flex',
            justifyContent: 'space-between',
            height: Height - 100,
          }}>
          <View style={{marginTop: 50}}>
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
              Enter your phone number and set your password
            </Text>

            <ScrollView>
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
            </ScrollView>
          </View>
          <View style={{marginBottom: 70}}>
            <BtnComponent
              placeholder="Send Code"
              onPress={() => {
                onSend();
                // navigation.navigate('PhoneVerification');
              }}
            />
          </View>
        </View>
        {isLoading ? <Loader /> : null}
      </ImageBackground>
    </>
  );
};

export default ForgetPasswordScreen;
