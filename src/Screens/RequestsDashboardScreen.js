import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  BackHandler,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Header from '../Components/Header';
import Svg, {G, Circle, Path} from 'react-native-svg';
import {Height, Width} from '../Constants/Constants';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllConnectionRequest} from '../Apis/Repo';
import RequestsCard from '../Components/RequestsCard';
import {useSelector} from 'react-redux';
import Loader from '../Components/Loader';
import {PRIMARY} from '../Constants/Colors';

export default function RequestsDashboardScreen({navigation}) {
  // let [userData, setUserData] = useState(null);
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const status = 1;
  const [refresh, setRefresh] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const DATA = useSelector(state => state.UserData);
  console.log('dispatch DATA', DATA);

  // useEffect(() => {
  //   AsyncStorage.getItem('user_data').then(response => {
  //     setUserData((userData = JSON.parse(response)));
  //     console.log('userdata', userData);
  //   });
  // }, []);

  function handleBackButtonClick() {
    navigation.reset({
      index: 0,
      routes: [{name: 'Dashboard'}],
    });
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useEffect(() => {
    getData();
  }, [navigation, refresh]);

  const getData = () => {
    setIsLoading(true);
    getAllConnectionRequest(DATA.id, status)
      .then(res => {
        setRefresh(0);
        console.log('res', res);
        setdata(res.data.result);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  const onRefresh = () => {
    //Clear old data of the list
    // setDataSource([]);
    //Call the Service to get the latest data
    getData();
  };

  return (
    <SafeAreaView style={{height: Height, width: Width}}>
      <ImageBackground
        source={require('../Assets/screenbg.png')}
        style={{flex: 1}}>
        <Header
          navigation={navigation}
          variant="dark2"
          headerName="Requests"
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Dashboard'}],
            });
          }}
          headerIcon={
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={17}
              height={17}
              viewBox="0 0 17 17">
              <G
                transform="translate(-1.905 -1.931)"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}>
                <Circle
                  data-name="Ellipse 313"
                  cx={2.5}
                  cy={2.5}
                  r={2.5}
                  transform="translate(12.905 12.931)"
                />
                <Circle
                  data-name="Ellipse 314"
                  cx={2.5}
                  cy={2.5}
                  r={2.5}
                  transform="translate(2.905 2.931)"
                />
                <Path
                  data-name="Path 2291"
                  d="M11.418 5.523h2.527a1.684 1.684 0 011.684 1.684v5.9"
                />
                <Path
                  data-name="Line 19"
                  transform="translate(5.905 7.931)"
                  d="M0 0L0 10"
                />
              </G>
            </Svg>
          }
        />
        {refreshing ? <ActivityIndicator /> : null}
        {data != null ? (
          <FlatList
            data={data}
            horizontal={false}
            style={{felx: 1, marginTop: 20}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={PRIMARY}
              />
            }
            enableEmptySections={true}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <RequestsCard
                cta={true}
                variant="closed"
                navigation={navigation}
                navigationPath="Individual"
                item={item}
                key={index}
                setRefresh={setRefresh}
              />
            )}
          />
        ) : (
          <Text style={{alignSelf: 'center', marginTop: 250}}>
            No requests recieved yet
          </Text>
        )}
        {isLoading ? <Loader /> : null}
      </ImageBackground>
    </SafeAreaView>
  );
}
