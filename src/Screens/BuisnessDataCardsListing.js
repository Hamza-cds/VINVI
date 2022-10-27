import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import BuisnessCard from '../Components/BuisnessCard';
import {View, Text} from 'react-native';
import {getBusinessCardAllActiveApiCall} from '../Apis/Repo';
import {useFocusEffect} from '@react-navigation/core';

export function BuisnessDataCardsListing({navigation}) {
  const [businessData, setBusinessData] = useState([]);
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getBusinessList();
    }, [navigation]),
  );

  // useEffect(() => {

  // }, []);

  const getBusinessList = () => {
    getBusinessCardAllActiveApiCall()
      .then(res => {
        console.log('business response', res);
        setBusinessData(res.data.result);
        console.log('buisnessData', businessData);
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  return (
    <>
      {businessData != null ? (
        <FlatList
          data={businessData}
          horizontal={false}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 70}}
          renderItem={({item, index}) => (
            <BuisnessCard
              cta={true}
              variant="closed"
              navigation={navigation}
              navigationPath="BuisnessScreen"
              item={item}
              key={index}
            />
          )}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 300,
          }}>
          <Text style={{color: '#242424'}}>No Cards</Text>
        </View>
      )}
    </>
  );
}
