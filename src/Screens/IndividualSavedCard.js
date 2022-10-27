import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetSavedCardByIdApiCall} from '../Apis/Repo';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../Components/Loader';
import IndividualCard from '../Components/IndividualCard';
import {useFocusEffect} from '@react-navigation/core';
import {UserData} from '../../Store/Action';

export default function IndividualSavedCard(props) {
  const dispatch = useDispatch();
  let [userData, setUserData] = useState(null);
  let TYPE = 0;
  const [data, setdata] = useState([]);
  console.log('data', data);

  const [isLoading, setIsLoading] = useState(false);

  const DATA = useSelector(state => state.UserData);
  console.log('DATA', DATA);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getSavedCard();
    }, [props.navigation]),
  );

  // useEffect(() => {
  //   getSavedCard();
  // }, [DATA.id]);

  const getSavedCard = () => {
    setIsLoading(true);
    GetSavedCardByIdApiCall(DATA.id, TYPE)
      .then(res => {
        console.log('saved res', res);
        setdata(res.data.result);
        AsyncStorage.setItem('user_data', JSON.stringify(response.data.result));
        dispatch(UserData(response.data.result));
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  return (
    <View style={{flex: 1, height: '100%', width: '100%'}}>
      {data != null ? (
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
              item={item.personalCard}
              key={index}
            />
          )}
        />
      ) : (
        <Text style={{alignSelf: 'center', marginTop: 250}}>no saved card</Text>
      )}

      {isLoading ? <Loader /> : null}
    </View>
  );
}
