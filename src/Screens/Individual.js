import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity, Text, View, FlatList} from 'react-native';
import {
  getPersonalCardAllActiveApiCall,
  getPersonalCardByUserIdApiCall,
} from '../Apis/Repo';
import MyCardIndividual from '../Components/MyCardIndividual';
import {SECONDARY, WHITE} from '../Constants/Colors';
import Loader from '../Components/Loader';
import {useSelector} from 'react-redux';
import {AlphabetList} from 'react-native-section-alphabet-list';

export function Individual({navigation}) {
  const [selected, setSelected] = useState(null);
  let [userData, setUserData] = useState(null);
  let [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log('data yaha ha *********', data);

  const DATA = useSelector(state => state.UserData);
  console.log('dispatch DATA', DATA);

  console.log('my card list', data);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true);
    getPersonalCardByUserIdApiCall(DATA.id)
      .then(res => {
        console.log('res ++++++++++++', res);
        setdata((data = res.data.result));
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  return (
    <>
      <AlphabetList
        data={data}
        indexLetterStyle={{
          color: 'blue',
          fontSize: 15,
        }}
        renderCustomItem={item => (
          <View style={{flex: 1}}>
            <Text style={{}}>{item.value}</Text>
          </View>
        )}
      />
      {/* {data != null ? (
        <FlatList
          data={data}
          horizontal={false}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <MyCardIndividual
              cta={true}
              variant="closed"
              navigation={navigation}
              navigationPath="Individual"
              item={item}
              key={index}
              selected={selected}
              setSelected={setSelected}
              index={index}
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
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: SECONDARY,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{color: WHITE, fontSize: 14}}>Make New Card</Text>
              </TouchableOpacity>
            </View>
          }
        />
      ) : null} */}

      {isLoading ? <Loader /> : null}
    </>
  );
}
