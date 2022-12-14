import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getBusinessCardByUserIDApiCall} from '../Apis/Repo';
import MyCardBuisness from '../Components/MyCardBuisness';
import {SECONDARY, WHITE} from '../Constants/Colors';
import {useSelector} from 'react-redux';

export function Buisness({navigation}) {
  const [selected, setSelected] = useState(null);
  let [userData, setUserData] = useState(null);
  let [businessData, setBusinessData] = useState([]);

  const DATA = useSelector(state => state.UserData);
  console.log('dispatch DATA', DATA);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [navigation]);

  const getData = () => {
    getBusinessCardByUserIDApiCall(DATA.id)
      .then(res => {
        console.log('business response', res);
        setBusinessData((businessData = res.data.result));
        console.log('buisnessData ----', businessData);
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
          renderItem={({item, index}) => (
            <MyCardBuisness
              cta={true}
              variant="closed"
              navigation={navigation}
              navigationPath="Individual"
              item={item}
              key={index}
              index={index}
              selected={selected}
              setSelected={setSelected}
            />
          )}
          style={{flex: 1}}
          ListFooterComponent={
            <View
              style={{
                width: '100%',
                paddingHorizontal: 20,
                marginVertical: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('NewBuisnessCard1');
                }}
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: SECONDARY,
                  marginVertical: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{color: WHITE, fontSize: 14}}>Add new Card</Text>
              </TouchableOpacity>
            </View>
          }
        />
      ) : (
        <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 300,
            }}>
            <Text style={{color: '#242424'}}>No Cards</Text>
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              marginVertical: 20,
              position: 'absolute',
              bottom: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NewBuisnessCard1');
              }}
              style={{
                height: 50,
                width: '100%',
                backgroundColor: SECONDARY,
                marginVertical: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text style={{color: WHITE, fontSize: 14}}>Add new Card</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}
