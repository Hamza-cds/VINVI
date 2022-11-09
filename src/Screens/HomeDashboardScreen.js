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
  TextInput,
} from 'react-native';
import {IndividualDataCardsListing} from './IndividualDataCardsListing';
import {BusinessDataCardsListing} from './BusinessDataCardsListing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import {
  storyPostApiCall,
  DashboardStoriesApiCall,
  GetDataVideoWallApi,
} from '../Apis/Repo';
import Loader from '../Components/Loader';
import {useFocusEffect} from '@react-navigation/core';
// import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {value} from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';

const Tab = createMaterialTopTabNavigator();

export default function HomeDashboardScreen(props) {
  // const credential = useSelector(state => state.UserCredential);
  // console.log('credential', credential);

  let [storyMedia, setStoryMedia] = useState('');
  let [userData, setUserData] = useState('');
  let [imageType, setImageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let [userStories, setUserStories] = useState([]);
  let [search, setSearch] = useState('');
  let uploadType = 1;
  let page = 1;
  let limit = 10;
  console.log('search', search);
  // console.log('userStories', userStories);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      getDashboardStories();
      console.log('userdata', userData);
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getDashboardStories();
    }, [props.navigation]),
  );

  const onSelecet = image => {
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
    formdata.append('UploadType', 1);
    formdata.append('Title', 'this is title');
    formdata.append('Description', 'this is description');
    formdata.append('UserId', JSON.stringify(userData.id));
    formdata.append('media_file', {
      uri: storyMedia.uri,
      name: storyMedia.fileName + '.' + imageType,
      type: storyMedia.type,
    });

    console.log('formdata', formdata);

    setIsLoading(true);
    storyPostApiCall(formdata)
      .then(res => res.json())
      .then(data => {
        console.log('response', data);
        if (data.status === 200 && data.success === true) {
          setIsLoading(false);
          getDashboardStories();
          // props.navigation.replace('MyCardsDashboardScreen');
          alert('successfully posted');
        } else {
          setIsLoading(false);
          alert('invalid request');
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  const getDashboardStories = () => {
    // let obj = {
    //   userId: 0,
    //   pageNumber: 1,
    //   limit: 10,
    // };
    setIsLoading(true);
    DashboardStoriesApiCall(page, limit)
      .then(res => {
        console.log('stories res', res);
        if (res.data.success) {
          setUserStories((userStories = res.data.result));
          setIsLoading(false);
        } else {
          setIsLoading(false);
          // alert('No stories found.');
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  return (
    <SafeAreaView
      style={{width: Width, height: Height, flex: 1, backgroundColor: 'white'}}>
      {/* <View> */}
      {/* <ImageBackground
        source={require('../Assets/dashboardbg.png')}
        style={{flex: 1, paddingBottom: 80}}> */}
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
          marginTop: -10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          // zIndex: 5,
        }}>
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            backgroundColor: PRIMARY,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            // marginTop: 10,
          }}
          onPress={() => {
            launchImageLibrary({mediaType: 'photo'}, image => {
              if (image.didCancel) {
                console.log('User cancelled image picker');
              } else {
                onSelecet(image);
              }
            });
          }}>
          <Text style={{color: 'white', fontSize: 25}}>+</Text>
        </TouchableOpacity>
        <View style={{width: '81%'}}>
          <DashboardStories userStories={userStories} />
        </View>
      </View>

      <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
        <TextInput
          style={{
            height: 40,
            flex: 1,
            marginTop: -10,
            marginBottom: -5,
            backgroundColor: '#F0F0F0',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            padding: 10,
          }}
          onChangeText={value => {
            setSearch((search = value));
          }}
          placeholder="Search"
        />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Individual', {
              search: search,
            });
          }}
          style={{
            backgroundColor: '#F0F0F0',
            height: 40,
            width: 30,
            borderTopRightRadius: 10,
            marginTop: -10,
            borderBottomRightRadius: 10,
          }}>
          <AntDesign name="search1" size={23} style={{marginTop: 8}} />
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        initialRouteName="Individual"
        tabBarOptions={{
          indicatorStyle: {backgroundColor: PRIMARY},
          labelStyle: {
            fontSize: 12,
            color: PRIMARY,
            fontWeight: 'bold',
          },
          style: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            elevation: 0,
            marginHorizontal: 20,
            // marginTop: 10,
            marginBottom: 10,
            color: useIsFocused ? PRIMARY : null,
          },
          bounces: true,
        }}
        sceneContainerStyle={{backgroundColor: 'transprent'}}>
        <Tab.Screen
          name="Individual"
          component={IndividualDataCardsListing}
          // initialParams={{search: search}}
        />
        <Tab.Screen
          name="Business"
          component={BusinessDataCardsListing}
          initialParams={{search: search}}
        />
      </Tab.Navigator>
      {isLoading ? <Loader /> : null}
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
}
