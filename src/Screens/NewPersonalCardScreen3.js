import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import NewCardStepPanel from '../Components/NewCardStepPanel';
import UploadBtn from '../Components/UploadBtn';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {G, Path} from 'react-native-svg';
import {Height, Width} from '../Constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {PCData, PCDComplete} from '../../Store/Action';

export default function NewCardScreen(props) {
  const [profileImage, setProfileImage] = useState('');
  const [profileImageName, setProfileImageName] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverImageName, setCoverImageName] = useState('');
  const dispatch = useDispatch();
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log('PersonalcardScreen1Array', props);
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
    });
  }, []);

  const profileImageFun = image => {
    console.log('image base 64', image);
    var imageMime = image.mime;
    var name = imageMime.split('/')[1];
    setProfileImageName('Vinvi.' + name);
    setProfileImage(image);
  };

  const coverImageFun = image => {
    console.log('image base 64', image);
    var imageMime = image.mime;
    var name = imageMime.split('/')[1];
    setCoverImageName('Vinvi.' + name);
    setCoverImage(image);
  };

  let object = {
    ProfilePicture: profileImage,
    profileName: profileImageName,
    CoverPicture: coverImage,
    coverName: coverImageName,
  };

  // const onNext = () => {
  //   props.navigation.push('NewPersonalCard4', {
  //     paramKey: props.route.params.paramKey,
  //     name: props.route.params.name,
  //     email: props.route.params.email,
  //     address: props.route.params.address,
  //     image: image,
  //   });
  //   console.log('props of page 3', props.route.params);
  //   let object = {
  //     PhoneNo: userData.phoneno,
  //     UserId: userData.id,
  //     ProfilePicture: image,
  //   };
  //   console.log('object', object);
  // };

  return (
    <SafeAreaView style={{height: Height, width: Width}}>
      <Header
        navigation={props.navigation}
        variant="dark"
        headerName="Add Card"
        onPress={() => {
          props.navigation.push('NewPersonalCard2');
        }}
      />
      <NewCardStepPanel step1={true} step2={true} step3={true} step4={false} />
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            padding: 20,
          }}>
          <UploadBtn
            svg={profileImage}
            placeholder="Profile Photo"
            label={'Upload Profile Picture'}
            onCallBack={profileImageFun}
          />
          <UploadBtn
            svg={coverImage}
            placeholder="Cover Photo"
            label={'Upload Cover Picture'}
            onCallBack={coverImageFun}
          />
          <BtnComponent
            placeholder="Next"
            onPress={() => {
              dispatch(PCData(object));
              // dispatch(PCDComplete(''));

              props.navigation.navigate('NewPersonalCard4');
              // onNext();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
