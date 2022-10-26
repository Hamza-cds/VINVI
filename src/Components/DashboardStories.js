import React, {useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import InstaStory from 'react-native-insta-story';
import {SECONDARY, WHITE} from '../Constants/Colors';
import {URL} from '../Constants/Constants';
import {isNullOrEmpty} from '../Constants/TextUtils';

export default function DashboardStories({userStories}) {
  let [data, setData] = useState([]);
  console.log('stories data here', userStories);

  useEffect(() => {
    mapData(userStories);
  }, []);

  const mapData = list => {
    let finalList = [];

    for (let index = 0; index < list.length; index++) {
      const element = list[index];

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
    debugger;

    setData(finalList);
    console.log('kalsudfhkasdzv   data', data);
  };

  const DATA = [
    {
      user_id: 1,
      user_image:
        'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
      user_name: 'Ahmet Çağlar Durmuş',
      stories: [
        {
          story_id: 2,
          story_image:
            'https://vinvi.dsmeglobal.com/BusinessProduct//c33ff48d-7a18-45fa-a94b-d5cc6ff0d1f1.mp4',
        },
      ],
    },
    {
      user_id: 2,
      user_image:
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      user_name: 'Test User',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://vinvi.dsmeglobal.com/BusinessProduct//c33ff48d-7a18-45fa-a94b-d5cc6ff0d1f1.mp4',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
      ],
    },
  ];

  return (
    <View>
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
          style={{marginTop: 15}}
        />
      ) : (
        <Text
          style={{
            color: SECONDARY,
            fontSize: 15,
            alignSelf: 'center',
            marginTop: 15,
          }}>
          Loading...
        </Text>
      )}
    </View>
  );
}
