import React, {useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import InstaStory from 'react-native-insta-story';
import {SECONDARY, WHITE} from '../Constants/Colors';
import {URL} from '../Constants/Constants';
import {isNullOrEmpty} from '../Constants/TextUtils';

export default function DashboardStories({userStories}) {
  const [data, setData] = useState([]);
  console.log('stories ***************', userStories);

  useEffect(() => {
    mapData(userStories);
  }, [userStories]);

  const mapData = list => {
    console.log('list*************', list);
    let finalList = [];

    for (let index = 0; index < list.length; index++) {
      let element = list[index];
      console.log('element element', element);

      let storiesArray = [];
      for (let index = 0; index < element.stories.length; index++) {
        const item = element.stories[index];
        let storiesObject = {
          story_id: item.id,
          story_image: !isNullOrEmpty(item.media)
            ? URL.concat(item.media)
            : null,
          swipeText: item.title,
        };
        storiesArray.push(storiesObject);
      }

      let object = {
        user_id: element.userId,
        user_image: !isNullOrEmpty(element.profilePicture)
          ? URL.concat(element.profilePicture)
          : null,
        user_name: element.userName,
        stories: storiesArray,
      };
      finalList.push(object);
    }
    // debugger;
    setData(finalList);
  };

  return (
    <View style={{marginTop: 20, height: 80}}>
      {data.length > 0 ? (
        <InstaStory
          data={data}
          duration={10}
          unPressedBorderColor={SECONDARY}
          pressedBorderColor={WHITE}
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
