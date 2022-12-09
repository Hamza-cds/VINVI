import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {SECONDARY, WHITE} from '../Constants/Colors';
import RegisterInputBox from '../Components/RegisterInputBox';
import BtnComponent from '../Components/BtnComponent';
import {Height, Width} from '../Constants/Constants';
import {signUpApiCall} from '../Apis/Repo';
import {
  isInvalidEmail,
  isInvalidPassword,
  isInvalidPhoneNumber,
  isPassword,
  PhoneNumber,
} from '../Constants/Validations';
import {
  EMPTY_OTHERINFO,
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
import Loader from '../Components/Loader';

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
  const [isLoading, setIsLoading] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [nameErrMsg, setNameErrMsg] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [cityErr, setCityErr] = useState(false);
  const [cityErrMsg, setCityErrMsg] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  const NameCheck = value => {
    if (value == '') {
      setNameErr(true);
      setNameErrMsg('Enter Name');
    } else {
      setNameErr(false);
    }
  };

  const NumberCheck = value => {
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

  const EmailCheck = value => {
    if (value == '') {
      setEmailErr(true);
      setEmailErrMsg('Enter Email');
    } else if (isInvalidEmail(value)) {
      setEmailErr(true);
      setEmailErrMsg('Enter Valid Email');
    } else {
      setEmailErr(false);
    }
  };

  const CityCheck = value => {
    if (value == '') {
      setCityErr(true);
      setCityErrMsg('Enter City');
    } else {
      setCityErr(false);
    }
  };

  const PasswordCheck = value => {
    if (isNullOrEmpty(value)) {
      setPassError(true);
      setPassErrorMsg('Enter Password');
    } else if (isInvalidPassword(value)) {
      setPassError(true);
      setPassErrorMsg('Min 8 characters');
    } else if (stringsNotEqual(confirmPassword, value)) {
      setPassError(false);
      setConfirmPassError(true);
      setConfirmPassErrorMsg('Passwords do not match');
    } else {
      setConfirmPassError(false);
      setPassError(false);
    }
  };

  const ConfirmPassCheck = value => {
    if (isNullOrEmpty(value)) {
      setConfirmPassError(true);
      setConfirmPassErrorMsg('Enter Confirm Password');
    } else if (stringsNotEqual(password, value)) {
      setConfirmPassError(true);
      setConfirmPassErrorMsg('Passwords do not match');
    } else {
      setConfirmPassError(false);
    }
  };

  const onSignUp = () => {
    if (isNullOrEmpty(name)) {
      alert('Enter name');
    } else if (isNullOrEmpty(phoneNumber)) alert(PHONE_EMPTY_ERROR);
    else if (isNullOrEmpty(email)) {
      alert('Enter email');
    } else if (isNullOrEmpty(city)) {
      alert('Enter city');
    }
    // else if (phoneLengthNotValid(phoneNumber)) alert(PHONE_LENGTH_ERROR);
    else if (isNullOrEmpty(password)) alert(PASSWORD_ERROR);
    else if (isNullOrEmpty(confirmPassword))
      alert("Confirm password can't be empty");
    else if (stringsNotEqual(password, confirmPassword)) alert(MATCH_ERROR);
    else {
      let object = {
        FirstName: name,
        Phoneno: phoneNumber,
        Email: email,
        City: city,
        LoginPassword: password,
      };
      console.log('object', object);

      let updateinfo = new FormData();
      updateinfo.append('Model', JSON.stringify(object));

      setIsLoading(true);
      signUpApiCall(updateinfo)
        .then(res => res.json())
        .then(data => {
          console.log('data', data);

          if (data.status == 335) {
            setIsLoading(false);
            props.navigation.push('PhoneVerification', {
              phone: phoneNumber,
              password: password,
            });
          } else {
            setIsLoading(false);
            alert(data.message);
            console.log('ADD');
          }
        })
        .catch(err => {
          setIsLoading(false);
          console.log('err', err);
        });
    }
  };

  return (
    <>
      <ImageBackground
        source={require('../Assets/registerbg.png')}
        style={{flex: 1}}>
        {/* <View
            style={{
              // width: '100%',
              // height: '100%',
              paddingVertical: 20,
              paddingHorizontal: 20,
              paddingBottom: 50,
              // display: 'flex',
              // justifyContent: 'space-evenly',
            }}> */}
        <Image
          source={require('../Assets/vinvilightlogo.png')}
          style={{
            marginBottom: 20,
            marginTop: 30,
            alignSelf: 'center',
            width: 100,
            height: 55,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            color: WHITE,
            fontWeight: 'bold',
            marginBottom: 5,
            marginHorizontal: 20,
          }}>
          Join Us
        </Text>

        <ScrollView style={{paddingHorizontal: 20}}>
          <RegisterInputBox
            placeholder="Name"
            keyboardType={'default'}
            maxLength={30}
            ERROR={nameErr}
            ERROR_MESSAGE={nameErrMsg}
            onChange={value => {
              NameCheck(value);
              setName(value);
            }}
          />

          <RegisterInputBox
            placeholder="Phone"
            keyboardType={'number-pad'}
            maxLength={11}
            ERROR={Error}
            ERROR_MESSAGE={ErrorMsg}
            onChange={value => {
              NumberCheck(value);
              setPhoneNumber(value);
            }}
          />

          <RegisterInputBox
            placeholder="Email"
            keyboardType={'email-address'}
            maxLength={30}
            ERROR={emailErr}
            ERROR_MESSAGE={emailErrMsg}
            onChange={value => {
              EmailCheck(value);
              setEmail(value);
            }}
          />

          <RegisterInputBox
            placeholder="City"
            keyboardType={'default'}
            maxLength={30}
            ERROR={cityErr}
            ERROR_MESSAGE={cityErrMsg}
            onChange={value => {
              CityCheck(value);
              setCity(value);
            }}
          />
          <RegisterInputBox
            placeholder="Password"
            inputType="password"
            keyboardType={'default'}
            maxLength={100}
            ERROR={passError}
            secure={true}
            ERROR_MESSAGE={passErrorMsg}
            onChange={value => {
              PasswordCheck(value);
              setPassword(value);
            }}
          />

          <RegisterInputBox
            placeholder="Confirm Password"
            inputType="password"
            secure={true}
            maxLength={100}
            keyboardType={'default'}
            ERROR={confirmpassError}
            ERROR_MESSAGE={confirmpassErrorMsg}
            onChange={value => {
              ConfirmPassCheck(value);
              setConfirmPassword(value);
            }}
          />
          <View style={{marginTop: 20}}>
            <BtnComponent
              placeholder="Sign Up"
              onPress={() => {
                onSignUp();
              }}
            />
          </View>
          <Text style={{alignSelf: 'center', color: WHITE, marginBottom: 10}}>
            OR
          </Text>
          <View
            style={{
              marginTop: 10,
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
          {/* </View> */}
        </ScrollView>
        {isLoading ? <Loader /> : null}
      </ImageBackground>
    </>
  );
}
