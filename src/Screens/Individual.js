import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity, Text, View, FlatList} from 'react-native';
import {
  getPersonalCardAllActiveApiCall,
  getPersonalCardByUserIdApiCall,
  setOneActiveCard,
} from '../Apis/Repo';
import MyCardIndividual from '../Components/MyCardIndividual';
import {PRIMARY, SECONDARY, WHITE} from '../Constants/Colors';
import Loader from '../Components/Loader';
import {useSelector} from 'react-redux';
import {Switch} from 'react-native-paper';

export function Individual({navigation}) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const [selected, setSelected] = useState(0);
  let [userData, setUserData] = useState(null);
  let [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardID, setCardID] = useState('');
  const [userID, setUserID] = useState('');
  const [call, setCall] = useState(false);
  // console.log('data yaha ha *********', data);

  const DATA = useSelector(state => state.UserData);
  // console.log('dispatch DATA', DATA);

  console.log('selected', selected);
  console.log('cardID', cardID);
  console.log('userID', userID);
  console.log('call', call);

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

  const onToggleSwitch = () => {
    if (isSwitchOn == true) {
      setIsSwitchOn(false);
      alert('CLOSE\n\nNo one can view your card until they search you.');
    } else if (isSwitchOn == false) {
      setIsSwitchOn(true);
      alert('OPEN\n\nYour card is visible to all users.');
    }
  };

  {
    call == true
      ? setOneActiveCard(cardID, userID)
          .then(res => {
            console.log('selected card response', res);
            if (res.data.success) {
              alert('card is selected successfully');
              setCall(false);
            } else {
              alert(res.data.message);
            }
          })
          .catch(err => {
            console.log('err', err);
          })
      : null;
  }

  return (
    <>
      <Switch
        value={isSwitchOn}
        onValueChange={onToggleSwitch}
        color={PRIMARY}
        style={{marginHorizontal: 10, marginBottom: 5}}
      />
      {data != null ? (
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
              setCardID={setCardID}
              setUserID={setUserID}
              setCall={setCall}
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
                onPress={() => {
                  navigation.navigate('NewPersonalCard1');
                }}
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
      ) : null}

      {isLoading ? <Loader /> : null}
    </>
  );
}
