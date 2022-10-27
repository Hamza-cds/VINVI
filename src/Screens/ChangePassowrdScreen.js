import React, {useEffect, useState} from 'react';
import {View, ImageBackground, SafeAreaView} from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import ChangePasswordInputBox from '../Components/ChangePasswordInputBox';
import Header from '../Components/Header';
import Svg, {Path} from 'react-native-svg';
import {Height, Width} from '../Constants/Constants';
import {ChangePasswordApiCall} from '../Apis/Repo';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';
import {isNullOrEmpty, stringsNotEqual} from '../Constants/TextUtils';
import RegisterInputBox from '../Components/RegisterInputBox';

const ChangePassowrdScreen = props => {
  let [userData, setUserData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const DATA = useSelector(state => state.UserData);
  console.log('dispatch DATA', DATA);
  const credential = useSelector(state => state.UserCredential);
  console.log('credential', credential);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
    });
  }, []);

  const navigation = props.navigation;
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [conPass, setConPass] = useState('');
  const [Error, setError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passErrorMsg, setPassErrorMsg] = useState(false);
  const [confirmpassError, setConfirmPassError] = useState(false);
  const [confirmpassErrorMsg, setConfirmPassErrorMsg] = useState(false);

  const oldPassCheck = value => {
    if (isNullOrEmpty(value)) {
      setError(true);
      setErrorMsg('Enter password');
    } else if (stringsNotEqual(credential, value)) {
      setError(true);
      setErrorMsg('Password !match');
    } else {
      setError(false);
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
    } else if (stringsNotEqual(newPass, value)) {
      setConfirmPassError(true);
      setConfirmPassErrorMsg('Password !match');
    } else {
      setConfirmPassError(false);
    }
  };

  const onChange = () => {
    if (isNullOrEmpty(oldPass)) {
      alert('enter old password');
    } else if (isNullOrEmpty(newPass)) {
      alert('enter new password');
    } else if (isNullOrEmpty(conPass)) {
      alert('enter confirm password');
    } else {
      let object = {
        Id: DATA.id,
        OldPassword: oldPass,
        NewPassword: newPass,
      };
      console.log('object', object);

      setIsLoading(true);
      ChangePasswordApiCall(object)
        .then(response => {
          //console.log("response", response)

          if (response.data.status == 200) {
            setIsLoading(false);
            alert('Password changed successfully');
            navigation.replace('Login');
          } else {
            setIsLoading(false);
            alert('wrong old password');
          }
        })
        .catch(err => {
          setIsLoading(false);
          console.log('err', err);
        });
    }
  };

  return (
    <SafeAreaView
      style={{
        height: Height,
        width: Width,
      }}>
      <ImageBackground
        source={require('../Assets/screenbg.png')}
        style={{
          flex: 1,
        }}>
        <Header
          navigation={navigation}
          variant="light2"
          headerName="Change Password"
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
          headerIcon={
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={13.505}
              height={18.197}
              viewBox="0 0 13.505 18.197">
              <Path
                data-name="Path 1404"
                d="M12.084 7V5.331a5.331 5.331 0 10-10.662 0V7A1.78 1.78 0 000 8.743v2.018a.355.355 0 10.711 0V8.743a1.067 1.067 0 011.066-1.066h9.951a1.067 1.067 0 011.066 1.066v7.677a1.068 1.068 0 01-.711 1.005v-2.143a.355.355 0 00-.711 0v2.2h-9.6A1.067 1.067 0 01.711 16.42v-2.808a.355.355 0 00-.711 0v2.808a1.779 1.779 0 001.777 1.78h9.951a1.779 1.779 0 001.777-1.777v-7.68A1.78 1.78 0 0012.084 7zm-8.032-.034V5.331a2.7 2.7 0 115.4 0v1.635zm6.113 0V5.331a3.412 3.412 0 10-6.824 0v1.635H2.132V5.331a4.62 4.62 0 119.241 0v1.635zm0 0"
                fill="#fff"
              />
            </Svg>
          }
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: 40,
          }}>
          <View
            style={{
              marginTop: 15,
            }}>
            <RegisterInputBox
              placeholder="Enter Previous Password"
              ERROR={Error}
              ERROR_MESSAGE={ErrorMsg}
              backgroundColor={'#EFEFEF'}
              onChange={value => {
                setOldPass(value);
                oldPassCheck(value);
              }}
            />
            <RegisterInputBox
              placeholder="Enter New Password"
              ERROR={passError}
              ERROR_MESSAGE={passErrorMsg}
              backgroundColor={'#EFEFEF'}
              onChange={value => {
                setNewPass(value);
                PasswordCheck(value);
              }}
            />
            <RegisterInputBox
              placeholder="Re-Enter New Password"
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
            placeholder="Chnage Password"
            onPress={() => {
              onChange();
            }}
          />
        </View>
      </ImageBackground>
      {isLoading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default ChangePassowrdScreen;
