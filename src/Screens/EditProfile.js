import React, {useState, useEffect} from 'react';
import {View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import Header from '../Components/Header';
import ChangePasswordInputBox from '../Components/ChangePasswordInputBox';
import Svg, {Path} from 'react-native-svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Height, URL, Width} from '../Constants/Constants';
import BtnComponent from '../Components/BtnComponent';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import {isNullOrEmpty} from '../Constants/TextUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signUpApiCall} from '../Apis/Repo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useDispatch} from 'react-redux';
import {UserData} from '../../Store/Action';
import Loader from '../Components/Loader';

export default function NewCardScreen({navigation, route}) {
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  let [imageName, setImageName] = useState('');
  const [image, setImage] = useState('');
  let [userData, setUserData] = useState('');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  console.log('image', image);
  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
      // setImage({path: URL.concat(userData.profileImage)});
    });
  }, []);

  useEffect(() => {
    if (!isNullOrEmpty(userData)) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
    }
  }, []);
  const onSave = () => {
    let object = {
      Id: userData.id,
      Phoneno: userData.phoneno,
      FirstName: firstName ? firstName : userData.firstName,
      // LastName: lastName ? lastName : userData.lastName,
      Email: email ? email : userData.email,
    };
    console.log('object', object);
    let updateinfo = new FormData();
    updateinfo.append('Model', JSON.stringify(object));
    {
      !isNullOrEmpty(image)
        ? updateinfo.append('image_file', {
            uri: image.path,
            name: imageName,
            type: image.mime,
          })
        : updateinfo.append('image_file', userData.profileImage);
    }

    setIsLoading(true);
    signUpApiCall(updateinfo)
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        // AsyncStorage.setItem('user_data', JSON.stringify(data.result));
        // dispatch(UserData(data.result));
        if (data.status == 200 && data.success == true) {
          setIsLoading(false);
          AsyncStorage.setItem('user_data', JSON.stringify(data.result));
          dispatch(UserData(data.result));
          navigation.goBack();
          alert('successfully updated');
        } else {
          setIsLoading(false);
          alert(data.message);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  return (
    <SafeAreaView style={{height: Height, width: Width}}>
      <ImageBackground
        source={require('../Assets/screenbg.png')}
        style={{flex: 1}}>
        <Header
          navigation={navigation}
          variant="light2"
          headerName="Edit Profile"
          onPress={() => {
            navigation.goBack();
          }}
          headerIcon={
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={17.994}
              height={21.31}
              viewBox="0 0 17.994 21.31">
              <Path
                data-name="Icon zocial-guest"
                d="M-.003 16.385a6.042 6.042 0 01.284-1.516 9.021 9.021 0 012.048-3.742 8.9 8.9 0 013.492-2.438 4.664 4.664 0 01-1.867-3.812 4.612 4.612 0 011.48-3.457 5.062 5.062 0 017.032 0 4.612 4.612 0 011.48 3.457 4.685 4.685 0 01-1.823 3.788 9.269 9.269 0 014.19 3.006 7.331 7.331 0 011.684 4.689q0 2.179-1.728 2.511a2.71 2.71 0 01-.308.616 1.478 1.478 0 01-.556.675 3.515 3.515 0 01-1.148.485c-.49.126-.88.221-1.172.283s-.738.135-1.339.214-.908.118-.923.118a1.01 1.01 0 00-.166.023 1.07 1.07 0 01-.164.025H7.647a15.379 15.379 0 01-3.05-.391q-1.847-.39-2.107-1.054a2.437 2.437 0 01-.593-.994 1.984 1.984 0 01-.994-.5q-.906-.353-.906-1.986z"
                fill="#fff"
              />
            </Svg>
          }
        />
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Image
            source={
              image
                ? {uri: image.path}
                : userData.profileImage != null
                ? {uri: URL.concat(userData.profileImage)}
                : require('../Assets/profilePic.png')
            }
            style={{height: 120, width: 120, borderRadius: 60}}
          />
          <TouchableOpacity
            style={{marginTop: 80, marginLeft: -30}}
            onPress={() => {
              ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                console.log('image', image);
                var imageMime = image.mime;
                var name = imageMime.split('/')[1];
                setImageName('Vinvi.' + name);
                setImage(image);
              });
            }}>
            <Image
              source={require('../Assets/editProf.png')}
              // style={{marginTop: 80, marginLeft: -30}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            marginTop: 50,
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: 75,
          }}>
          <View>
            <ChangePasswordInputBox
              placeholder="First Name"
              text={
                userData
                  ? userData.firstName
                    ? userData.firstName
                    : null
                  : null
              }
              onChange={value => {
                setFirstName(value);
              }}
              icon={
                <Image
                  source={require('../Assets/id-card.png')}
                  style={{height: 30, width: 30, marginLeft: -5}}
                />
              }
            />
            <ChangePasswordInputBox
              placeholder="Last Name"
              text={
                userData ? (userData.lastName ? userData.lastName : null) : null
              }
              onChange={value => {
                setLastName(value);
              }}
              icon={
                <Image
                  source={require('../Assets/id-card.png')}
                  style={{height: 30, width: 30, marginLeft: -5}}
                />
              }
            />
            <ChangePasswordInputBox
              placeholder="Email"
              text={userData ? (userData.email ? userData.email : null) : null}
              onChange={value => {
                setEmail(value);
              }}
              icon={<Fontisto name="email" size={20} />}
            />
          </View>
          <BtnComponent
            placeholder="Save"
            onPress={() => {
              onSave();
            }}
          />
        </View>

        {isLoading ? <Loader /> : null}
      </ImageBackground>
    </SafeAreaView>
  );
}
