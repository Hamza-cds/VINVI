import React, {useState, useEffect} from 'react';
import IndividualCard from '../Components/IndividualCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {getPersonalCardAllActiveApiCall} from '../Apis/Repo';
import Loader from '../Components/Loader';
import {useFocusEffect} from '@react-navigation/core';
import {
  AlphabetList,
  DEFAULT_CHAR_INDEX,
} from 'react-native-section-alphabet-list';
import {isNullOrEmptyArray} from '../Constants/TextUtils';

export function IndividualDataCardsListing({navigation, route}) {
  console.log('route xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', route);
  const [individualData, setIndividualData] = useState([]);
  let [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
    });
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getAllIndividual();
    }, [navigation]),
  );

  const getAllIndividual = () => {
    setIsLoading(true);
    getPersonalCardAllActiveApiCall()
      .then(({data}) => {
        console.log('data', data);
        for (let index = 0; index < data.result.length; index++) {
          const element = data.result[index];
          element.value = element.name;
          element.key = JSON.stringify(element.id);
        }
        console.log('hamza..................................', data.result);
        setIsLoading(false);
        setIndividualData(data.result);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  return (
    <>
      {!isNullOrEmptyArray(individualData) ? (
        <AlphabetList
          data={individualData}
          index={DEFAULT_CHAR_INDEX}
          indexLetterStyle={{
            color: 'black',
            fontSize: 12,
          }}
          indexContainerStyle={{marginHorizontal: 6, marginVertical: 3}}
          indexLetterContainerStyle={{height: 15, width: 10}}
          contentContainerStyle={{paddingBottom: 70}}
          renderCustomItem={(item, index) => (
            <IndividualCard
              cta={true}
              variant="closed"
              navigation={navigation}
              navigationPath="IndividualScreen"
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

      {/* {individualData != null ? (
        <FlatList
          data={individualData}
          horizontal={false}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 70}}
          renderItem={({item, index}) => (
            <IndividualCard
              cta={true}
              variant="closed"
              navigation={navigation}
              navigationPath="IndividualScreen"
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

      {isLoading ? <Loader /> : null}
    </>
  );
}
