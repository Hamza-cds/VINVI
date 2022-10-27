import React, {useState, useEffect} from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import Header from '../Components/Header';
import IndividualCard from '../Components/IndividualCard';
import Svg, {Path} from 'react-native-svg';
import {Height, Width} from '../Constants/Constants';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetSavedCardByIdApiCall} from '../Apis/Repo';
import {PRIMARY, WHITE} from '../Constants/Colors';
import {useSelector} from 'react-redux';
import Loader from '../Components/Loader';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';
import IndividualSavedCard from './IndividualSavedCard';
import BusinessSavedCard from './BusinessSavedCard';

const Tab = createMaterialTopTabNavigator();

export default function SavedDashboardScreen(props, navigation) {
  let [userData, setUserData] = useState(null);
  const [data, setdata] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const DATA = useSelector(state => state.UserData);
  console.log('DATA', DATA);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
    });
  }, []);

  // useEffect(() => {
  //   getSavedCard();
  // }, [DATA.id]);

  // const getSavedCard = () => {
  //   setIsLoading(true);
  //   GetSavedCardByIdApiCall(DATA.id)
  //     .then(res => {
  //       console.log('saved res', res);
  //       setdata(res.data.result);
  //       setIsLoading(false);
  //     })
  //     .catch(err => {
  //       setIsLoading(false);
  //       console.log('err', err);
  //     });
  // };

  return (
    <SafeAreaView
      style={{height: Height, width: Width, flex: 1, backgroundColor: WHITE}}>
      {/* <ImageBackground
        source={require('../Assets/screenbg.png')}
        style={{flex: 1, paddingBottom: 100}}> */}
      <Header
        navigation={navigation}
        variant="light"
        headerName="Saved"
        onPress={() => {
          props.navigation.navigate('Home');
        }}
        headerIcon={
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={22.295}
            height={19.508}
            viewBox="0 0 22.295 19.508">
            <Path
              data-name="Icon awesome-heart"
              d="M20.131 1.334a5.955 5.955 0 00-8.13.592l-.858.884-.858-.884a5.954 5.954 0 00-8.125-.592 6.253 6.253 0 00-.431 9.053l8.426 8.7a1.365 1.365 0 001.973 0l8.426-8.7a6.249 6.249 0 00-.427-9.053z"
              fill={WHITE}
            />
          </Svg>
        }
      />

      <Tab.Navigator
        initialRouteName="Individual"
        tabBarOptions={{
          indicatorStyle: {backgroundColor: 'black'},
          labelStyle: {
            fontSize: 12,
            color: WHITE,
            fontWeight: 'bold',
          },
          style: {
            backgroundColor: PRIMARY,
            borderWidth: 0,
            elevation: 0,
            // marginHorizontal: 20,
            // marginTop: 10,
            // marginBottom: 10,
            color: useIsFocused ? WHITE : null,
          },
          bounces: true,
        }}
        sceneContainerStyle={{backgroundColor: WHITE}}>
        <Tab.Screen name="Individual" component={IndividualSavedCard} />
        <Tab.Screen name="Buisness" component={BusinessSavedCard} />
      </Tab.Navigator>

      {/* {data != null ? (
        <FlatList
          data={data}
          horizontal={false}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <IndividualCard
              cta={true}
              variant="closed"
              navigation={props.navigation}
              navigationPath="IndividualScreen"
              item={item}
              key={index}
            />
          )}
        />
      ) : null} */}
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
}
