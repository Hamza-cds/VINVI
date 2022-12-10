import React, {useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import InstaStory from 'react-native-insta-story';
import {GREY, SECONDARY, WHITE} from '../Constants/Colors';
import {URL} from '../Constants/Constants';
import {isNullOrEmpty, isNullOrEmptyArray} from '../Constants/TextUtils';

export default function DashboardStories({userStories, setUserStories}) {
  let [data, setData] = useState([]);
  // console.log('stories ***************', userStories);

  // console.log('stories data ***************', data);

  // useEffect(() => {
  //   if (!isNullOrEmptyArray(userStories)) {
  //     setData([]);
  //     setData(userStories);
  //   }
  // }, [userStories]);

  console.log('DashboardStories userStories', userStories);

  return (
    <View style={{marginTop: 10, height: 80}}>
      {userStories.length > 0 ? (
        <InstaStory
          data={userStories}
          duration={10}
          unPressedBorderColor={SECONDARY}
          pressedBorderColor={GREY}
          onStart={item => console.log('item', item)}
          onClose={item => console.log('close: ', item)}
          customSwipeUpComponent={
            <View>
              <Text>Swipe</Text>
            </View>
          }
          avatarSize={50}
          // style={{marginTop: 15}}
        />
      ) : (
        <Text
          style={{
            color: SECONDARY,
            fontSize: 15,
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
      )}
    </View>
  );
}
