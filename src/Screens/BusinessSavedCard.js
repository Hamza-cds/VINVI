import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetSavedCardByIdApiCall} from '../Apis/Repo';
import {useSelector} from 'react-redux';
import Loader from '../Components/Loader';
import BuisnessCard from '../Components/BuisnessCard';
import {useFocusEffect} from '@react-navigation/core';
import IndividualCard from '../Components/IndividualCard';
import {isNullOrEmpty, isNullOrEmptyArray} from '../Constants/TextUtils';

export default function BusinessSavedCard(props) {
  let [userData, setUserData] = useState(null);
  let [data, setdata] = useState([]);
  const type = 2;
  console.log('saved data', data);

  const [isLoading, setIsLoading] = useState(false);

  const DATA = useSelector(state => state.UserData);
  console.log('DATA', DATA);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
    });
  }, []);
  let hamza = [];

  useFocusEffect(
    React.useCallback(() => {
      getSavedCard();
    }, [props.navigation]),
  );

  // useEffect(() => {
  //   getSavedCard();
  // }, []);

  const getSavedCard = () => {
    setIsLoading(true);
    GetSavedCardByIdApiCall(DATA.id, type)
      .then(res => {
        console.log('saved response', res);
        if (!isNullOrEmpty(res.data.result)) {
          setdata((data = res.data.result));
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setdata([]);
          // alert(res.data.message);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  return (
    <View style={{flex: 1, height: '100%', width: '100%'}}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          horizontal={false}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 70}}
          renderItem={({item, index}) =>
            item.cardType == true ? (
              <BuisnessCard
                cta={true}
                variant="closed"
                navigation={props.navigation}
                navigationPath="BusinessScreen"
                type={'B'}
                item={item.businessCard}
                key={index}
              />
            ) : (
              <IndividualCard
                cta={true}
                variant="closed"
                navigation={props.navigation}
                navigationPath="IndividualScreen"
                type={'P'}
                item={item.personalCard}
                connectID={item.personalCard}
                key={index}
              />
            )
          }
        />
      ) : (
        <Text style={{alignSelf: 'center', marginTop: 250}}>
          No saved cards
        </Text>
      )}

      {isLoading ? <Loader /> : null}
    </View>
  );
}
