import React, {useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import {PRIMARY, PRIMARY1, SECONDARY, WHITE} from '../Constants/Colors';
import Svg, {Path} from 'react-native-svg';
import _ from 'lodash';
import {URL} from '../Constants/Constants';
import Feather from 'react-native-vector-icons/Feather';

export default function MyCardIndividual({
  cta,
  item,
  index,
  selected,
  setSelected,
  navigation,
  setCardID,
  setUserID,
  setCall,
}) {
  useEffect(() => {
    setUserID(item.userId);
    setCardID(item.id);
  }, []);
  // console.log('item', item);
  const EDIT = true;

  let arrayOccupation;
  arrayOccupation = _.find(item.personalCardMeta, {personalKey: 'occupation'});
  if (arrayOccupation) {
    arrayOccupation = arrayOccupation.personalValue;
  } else {
    arrayOccupation = 'Dummy occupation';
  }

  return (
    <View
      style={{
        display: 'flex',
        padding: 20,
        backgroundColor: selected === index ? '#3F4D87' : WHITE,
        shadowColor: '#000',
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 8,
        position: 'relative',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('IndividualScreen', {
            id: item.id,
            edit: EDIT,
          });
        }}
        style={{
          // backgroundColor: selected === index ? WHITE : '#3F4D87',
          width: 30,
          height: 25,
          alignSelf: 'flex-end',
          borderRadius: 4,
          marginTop: -13,
          marginRight: -10,
          padding: 1,
        }}>
        <Feather
          name="edit"
          size={20}
          color={selected === index ? WHITE : '#3F4D87'}
          style={{alignSelf: 'center'}}
        />
        {/* <Text
          style={{
            alignSelf: 'center',
            marginVertical: 3,
            color: selected === index ? PRIMARY : WHITE,
          }}>
          Edit
        </Text> */}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelected(index);
          setUserID(item.userId);
          setCardID(item.id);
          setCall(true);
        }}
        activeOpacity={0.9}
        style={{flexDirection: 'row', marginTop: -15}}>
        <View
          // source={require('../Assets/profilePic.png')}
          style={{width: 80, height: 80, borderRadius: 40}}>
          <Image
            source={
              item.profilePicture
                ? {uri: URL.concat(item.profilePicture)}
                : require('../Assets/profilePic.png')
            }
            style={{width: 80, height: 80, borderRadius: 40}}
          />
        </View>
        <View style={{marginHorizontal: 10}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: selected === index ? WHITE : SECONDARY,
              // backgroundColor: 'red',
              width: 160,
            }}>
            {item.name ? item.name : 'dum'}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: selected === index ? WHITE : SECONDARY,
              marginBottom: 10,
              // backgroundColor: 'red',
              width: 160,
            }}>
            {/* {item.occupation} */}
            {arrayOccupation}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              color: selected === index ? WHITE : SECONDARY,
              width: 160,
            }}>
            {item.email ? item.email : 'email'}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              color: selected === index ? WHITE : SECONDARY,
              width: 160,
              // backgroundColor: 'red',
            }}>
            {item.address ? item.address : 'address'}
          </Text>
        </View>
        {selected === index ? (
          <View
            style={{
              backgroundColor: WHITE,
              width: 30,
              height: 30,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: '78%',
              right: -7,
              shadowColor: '#000',
              shadowOffset: {
                width: 5,
                height: 5,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={17.428}
              height={12.686}
              viewBox="0 0 17.428 12.686">
              <Path
                data-name="Icon feather-check"
                d="M15.307 2.121l-9.065 9.065-4.121-4.12"
                fill="none"
                stroke="#3f4d87"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
              />
            </Svg>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

// style={{
//   display: 'flex',
//   flexDirection: 'row',
//   padding: 20,
//   backgroundColor: selected === index ? '#3F4D87' : WHITE,
//   shadowColor: '#000',
//   shadowOffset: {
//     width: 5,
//     height: 5,
//   },
//   shadowOpacity: 0.1,
//   shadowRadius: 4,
//   elevation: 3,
//   marginHorizontal: 20,
//   marginVertical: 10,
//   borderRadius: 8,
//   position: 'relative',
// }}
