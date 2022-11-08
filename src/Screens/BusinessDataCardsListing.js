import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import BuisnessCard from '../Components/BuisnessCard';
import {View, Text} from 'react-native';
import {getBusinessCardAllActiveApiCall} from '../Apis/Repo';
import {useFocusEffect} from '@react-navigation/core';
import {
  AlphabetList,
  DEFAULT_CHAR_INDEX,
} from 'react-native-section-alphabet-list';

export function BusinessDataCardsListing({navigation}) {
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
      .then(({data}) => {
        for (let index = 0; index < data.result.length; index++) {
          const element = data.result[index];
          element.value = element.name;
          element.key = JSON.stringify(element.id);
        }
        console.log('business response', data);
        setBusinessData(data.result);
        console.log('buisnessData', businessData);
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  return (
    <>
      <AlphabetList
        data={businessData}
        index={DEFAULT_CHAR_INDEX}
        indexLetterStyle={{
          color: 'black',
          fontSize: 12,
        }}
        indexContainerStyle={{marginHorizontal: 6, marginVertical: 3}}
        indexLetterContainerStyle={{height: 15, width: 10}}
        contentContainerStyle={{paddingBottom: 70}}
        renderCustomItem={(item, index) => (
          <BuisnessCard
            cta={true}
            variant="closed"
            navigation={navigation}
            navigationPath="BusinessScreen"
            item={item}
            key={index}
          />
          // <View style={{backgroundColor: 'red'}}>
          //   <Text style={{color: 'white'}}>{item.value}</Text>
          // </View>
        )}
        renderCustomSectionHeader={section => (
          <View style={{backgroundColor: '#F5F5F5'}}>
            <Text style={{color: 'black', marginLeft: 10}}>
              {section.title}
            </Text>
          </View>
        )}
      />
      {/* {businessData != null ? (
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
              navigationPath="BusinessScreen"
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
      )} */}
    </>
  );
}
