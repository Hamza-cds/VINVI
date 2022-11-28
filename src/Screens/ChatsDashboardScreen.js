import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  ScrollView,
  SafeAreaView,
  FlatList,
  Text,
} from 'react-native';
import Header from '../Components/Header';
import ChatCard from '../Components/ChatCard';
import Svg, {Path} from 'react-native-svg';
import {Height, Width} from '../Constants/Constants';
import {getAllConnectionRequest} from '../Apis/Repo';
import {useSelector} from 'react-redux';
import {isNullOrEmptyArray} from '../Constants/TextUtils';

const ChatsDashboardScreen = props => {
  const navigation = props.navigation;
  // let DAT = [
  //   {
  //     id: 1,
  //   },
  //   {
  //     id: 1,
  //   },
  //   {
  //     id: 1,
  //   },
  //   {
  //     id: 1,
  //   },
  // ];
  const [data, setData] = useState('');
  let status = 0;

  const DATA = useSelector(state => state.UserData);

  useEffect(() => {
    getConnectedCard();
  }, [navigation]);

  console.log('data', data);

  const getConnectedCard = () => {
    // setIsLoading(true);
    getAllConnectionRequest(DATA.id, status)
      .then(res => {
        console.log('connected res', res);
        setData(res.data.result);
        // setIsLoading(false);
      })
      .catch(err => {
        // setIsLoading(false);
        console.log('err', err);
      });
  };

  return (
    <SafeAreaView
      style={{
        height: Height,
        width: Width,
      }}>
      <ImageBackground
        source={require('../Assets/screenbg.png')}
        style={{
          flex: 1,
          marginBottom: 50,
        }}>
        <Header
          navigation={navigation}
          variant="dark2"
          headerName="Chats"
          onPress={() => {
            navigation.navigate('Home');
          }}
          headerIcon={
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={21.223}
              height={21.223}
              viewBox="0 0 21.223 21.223">
              <Path
                data-name="Icon feather-message-square"
                d="M21.223 14.148a2.358 2.358 0 01-2.358 2.358H4.716L0 21.223V2.358A2.358 2.358 0 012.358 0h16.506a2.358 2.358 0 012.358 2.358z"
                fill="#fff"
              />
            </Svg>
          }
        />

        {!isNullOrEmptyArray(data) ? (
          <FlatList
            data={data}
            horizontal={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingBottom: 70}}
            renderItem={({item, index}) => (
              <ChatCard
                picture={require('../Assets/profilePic.png')}
                lastMessage="Hi, I am there"
                name="John Smith"
                timeStamp="16:43"
                badgeValue="3"
                navigation={navigation}
              />
            )}
          />
        ) : (
          <Text style={{alignSelf: 'center', marginTop: 250}}>
            No saved cards
          </Text>
        )}

        {/* <ScrollView
          style={{
            flex: 1,
          }}>
          <ChatCard
            picture={require('../Assets/profilePic.png')}
            lastMessage="Hi, I am there"
            name="John Smith"
            timeStamp="16:43"
            badgeValue="3"
            navigation={navigation}
          />
        </ScrollView> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChatsDashboardScreen;
