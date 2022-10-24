import React from 'react';
import Header from '../Components/Header';
import DashboardStories from '../Components/DashboardStories';
import {Height, Width} from '../Constants/Constants';
import {launchImageLibrary} from 'react-native-image-picker';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';
import {PRIMARY} from '../Constants/Colors';
import {
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {IndividualDataCardsListing} from './IndividualDataCardsListing';
import {BuisnessDataCardsListing} from './BuisnessDataCardsListing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import {storyPostApiCall} from '../Apis/Repo';

const Tab = createMaterialTopTabNavigator();

export default function HomeDashboardScreen(props) {
  let [storyMedia, setStoryMedia] = useState('');
  let [userData, setUserData] = useState('');
  let [imageType, setImageType] = useState('');
  console.log('storyMedia', storyMedia);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
    });
  }, []);

  const onSelecet = () => {
    for (let index = 0; index < image.assets.length; index++) {
      const element = image.assets[index];
      setStoryMedia((storyMedia = element));
    }

    var mediaType = storyMedia.type;
    console.log('mediaType', mediaType);
    var type = mediaType.split('/')[1];
    console.log('type', type);
    setImageType((imageType = type));

    var formdata = new FormData();
    formdata.append('Id', '0');
    formdata.append('Title', 'this is title');
    formdata.append('Description', 'this is description');
    formdata.append('UserId', JSON.stringify(userData.id));
    formdata.append('media_file', {
      uri: storyMedia.uri,
      name: storyMedia.fileName + '.' + imageType,
      type: storyMedia.type,
    });

    console.log('formdata', formdata);

    storyPostApiCall(formdata)
      .then(res => res.json())
      .then(data => {
        console.log('response', data);
        if (data.status === 200 && data.success === true) {
          // props.navigation.replace('MyCardsDashboardScreen');
          alert('successfully posted');
        } else {
          alert('invalid request');
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <SafeAreaView style={{height: Height, width: Width}}>
      <ImageBackground
        source={require('../Assets/dashboardbg.png')}
        style={{flex: 1, paddingBottom: 80}}>
        <Header
          navigation={props.navigation}
          variant="drawer"
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: -65,
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 5,
          }}>
          <TouchableOpacity
            style={{
              width: '17%',
              height: 55,
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              marginTop: 32,
              marginRight: 10,
            }}
            onPress={() => {
              launchImageLibrary({mediaType: 'mixed'}, image => {
                if (image.didCancel) {
                  console.log('User cancelled image picker');
                } else {
                  onSelecet(image);
                }
              });
            }}>
            <Text style={{color: '#242424', fontSize: 25}}>+</Text>
          </TouchableOpacity>
          <View style={{width: '81%'}}>
            <DashboardStories />
          </View>
        </View>
        <Tab.Navigator
          initialRouteName="Individual"
          tabBarOptions={{
            indicatorStyle: {backgroundColor: '#ffffff'},
            labelStyle: {
              fontSize: 12,
              color: 'white',
              fontWeight: 'bold',
            },
            style: {
              backgroundColor: 'transparent',
              borderWidth: 0,
              elevation: 0,
              marginHorizontal: 20,
              marginTop: 10,
              marginBottom: 20,
              color: useIsFocused ? PRIMARY : null,
            },
            bounces: true,
          }}
          sceneContainerStyle={{backgroundColor: 'transprent'}}>
          <Tab.Screen
            name="Individual"
            component={IndividualDataCardsListing}
          />
          <Tab.Screen name="Buisness" component={BuisnessDataCardsListing} />
        </Tab.Navigator>
      </ImageBackground>
    </SafeAreaView>
  );
}
