import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity, Text, View, FlatList, Alert} from 'react-native';
import {
  getPersonalCardAllActiveApiCall,
  getMyPersonalCardByUserIdApiCall,
  setOneActiveCard,
  OpenandCloseCardApiCall,
} from '../Apis/Repo';
import MyCardIndividual from '../Components/MyCardIndividual';
import {PRIMARY, SECONDARY, WHITE} from '../Constants/Colors';
import Loader from '../Components/Loader';
import {useSelector} from 'react-redux';
import {Switch} from 'react-native-paper';

export function Individual({navigation}) {
  const [isSwitchOn, setIsSwitchOn] = useState(
    resStatus == 0 ? setIsSwitchOn(false) : true,
  );

  const [selected, setSelected] = useState(0);
  let [userData, setUserData] = useState(null);
  let [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardID, setCardID] = useState('');
  const [userID, setUserID] = useState('');
  const [call, setCall] = useState(false);
  let [cardStatus, setCardStatus] = useState('');
  let [resStatus, setResStatus] = useState(cardStatus);
  // console.log('data yaha ha *********', data);

  const DATA = useSelector(state => state.UserData);
  // console.log('dispatch DATA', DATA);

  console.log('isSwitchOn', isSwitchOn);
  // console.log('cardID', cardID);
  // console.log('userID', userID);
  // console.log('call', call);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      // getData();
      console.log('userdata', userData);
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  // setIsLoading(true);
  // getPersonalCardByUserIdApiCall(DATA.id)
  //   .then(res => {
  //     console.log('personal res', res);
  //     setdata((data = res.data.result));
  //     console.log('personal data', data);
  //     setIsLoading(false);
  //   })
  //   .catch(err => {
  //     setIsLoading(false);
  //     console.log('err', err);
  //   });

  const getData = () => {
    setIsLoading(true);
    getMyPersonalCardByUserIdApiCall(DATA.id)
      .then(res => {
        console.log('res ++++++++++++', res);
        if (res.data.success == true) {
          // debugger;
          const element = res.data.result[0];
          console.log('element', element);
          setResStatus((resStatus = element.status));
          console.log('resStatus', resStatus);

          setdata((data = res.data.result));
          setIsLoading(false);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  // open close card setup start

  const inActiveAlert = () => {
    Alert.alert('CLOSE', 'No one can view your card until they search you.', [
      {
        text: 'ok',
        onPress: () => {
          setCardStatus((cardStatus = 1));
          showAndHideCard();
        },
      },
    ]);
  };

  const activeAlert = () => {
    Alert.alert('OPEN', 'Your card is visible to all users.', [
      {
        text: 'ok',
        onPress: () => {
          setCardStatus((cardStatus = 0));
          showAndHideCard();
        },
      },
    ]);
  };

  const showAndHideCard = () => {
    // debugger;
    let obj = {
      UserId: userID,
      PersonalCardId: cardID,
      IsClosed: cardStatus,
    };
    console.log('obj', obj);
    setIsLoading(true);
    OpenandCloseCardApiCall(obj)
      .then(res => {
        console.log('open close card response __________________', res);
        if (res.data.status == 200 && res.data.success == true) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
          alert(res.data.message);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  const onToggleSwitch = () => {
    if (isSwitchOn == true) {
      setIsSwitchOn(false);
      inActiveAlert();
      // alert('CLOSE\n\nNo one can view your card until they search you.');
    } else if (isSwitchOn == false) {
      setIsSwitchOn(true);
      activeAlert();
      // alert('OPEN\n\nYour card is visible to all users.');
    }
  };

  // open close card setup end

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
        </>
      )}

      {isLoading ? <Loader /> : null}
    </>
  );
}
