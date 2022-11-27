import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
} from 'react-native';
import {PRIMARY, SECONDARY, WHITE} from '../Constants/Colors';
import Svg, {Path} from 'react-native-svg';
import {URL} from '../Constants/Constants';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {Height, Width} from '../Constants/Constants';
import RegisterInputBox from './RegisterInputBox';
import UploadBtn from './UploadBtn';

export default function MyCardBuisness({
  item,
  selected,
  index,
  setSelected,
  navigation,
}) {
  console.log('B item', item);
  const EDIT = true;
  const [isModalVisible, setisModalVisible] = useState(false);

  return (
    <View
      style={{
        backgroundColor: selected === index ? PRIMARY : WHITE,
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
        padding: 20,
      }}>
      <View style={{position: 'absolute', bottom: 0, right: 3}}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={76.449}
          height={66}
          viewBox="0 0 76.449 66">
          <Path
            data-name="Icon awesome-building"
            d="M41.058 45.2h-1.883V2.26A2.26 2.26 0 0036.915 0H5.274a2.26 2.26 0 00-2.26 2.26V45.2H1.13A1.13 1.13 0 000 46.332v1.883h42.188v-1.883a1.13 1.13 0 00-1.13-1.132zm-29-38.045a1.13 1.13 0 011.13-1.13h3.767a1.13 1.13 0 011.13 1.13v3.767a1.13 1.13 0 01-1.13 1.13h-3.771a1.13 1.13 0 01-1.13-1.13zm0 9.04a1.13 1.13 0 011.13-1.13h3.767a1.13 1.13 0 011.13 1.13v3.767a1.13 1.13 0 01-1.13 1.13h-3.771a1.13 1.13 0 01-1.13-1.13zm4.9 13.937h-3.774A1.13 1.13 0 0112.054 29v-3.762a1.13 1.13 0 011.13-1.13h3.767a1.13 1.13 0 011.13 1.13V29a1.13 1.13 0 01-1.13 1.134zM24.107 45.2h-6.026v-7.91a1.13 1.13 0 011.13-1.13h3.767a1.13 1.13 0 011.13 1.13zM30.134 29A1.13 1.13 0 0129 30.134h-3.762A1.13 1.13 0 0124.107 29v-3.762a1.13 1.13 0 011.13-1.13H29a1.13 1.13 0 011.13 1.13zm0-9.04A1.13 1.13 0 0129 21.094h-3.762a1.13 1.13 0 01-1.13-1.13V16.2a1.13 1.13 0 011.13-1.13H29a1.13 1.13 0 011.13 1.13zm0-9.04A1.13 1.13 0 0129 12.054h-3.762a1.13 1.13 0 01-1.13-1.13V7.157a1.13 1.13 0 011.13-1.13H29a1.13 1.13 0 011.13 1.13z"
            transform="translate(0 17.785)"
            // fill={selected === index ? '#4D5A9F' : '#efefef'}
            fill={'#efefef'}
          />
          <Path
            data-name="Icon awesome-building"
            d="M56.2 61.875h-2.575V3.094A3.094 3.094 0 0050.531 0H7.219a3.094 3.094 0 00-3.094 3.094v58.781H1.547A1.547 1.547 0 000 63.422V66h57.75v-2.578a1.547 1.547 0 00-1.55-1.547zM16.5 9.8a1.547 1.547 0 011.547-1.55H23.2a1.547 1.547 0 011.55 1.55v5.156A1.547 1.547 0 0123.2 16.5h-5.153a1.547 1.547 0 01-1.547-1.547zm0 12.375a1.547 1.547 0 011.547-1.547H23.2a1.547 1.547 0 011.547 1.547v5.156a1.547 1.547 0 01-1.547 1.544h-5.153a1.547 1.547 0 01-1.547-1.547zm6.7 19.075h-5.153A1.547 1.547 0 0116.5 39.7v-5.153A1.547 1.547 0 0118.047 33H23.2a1.547 1.547 0 011.547 1.547V39.7a1.547 1.547 0 01-1.547 1.55zM33 61.875h-8.25V51.047A1.547 1.547 0 0126.3 49.5h5.156A1.547 1.547 0 0133 51.047zM41.25 39.7a1.547 1.547 0 01-1.55 1.55h-5.153A1.547 1.547 0 0133 39.7v-5.153A1.547 1.547 0 0134.547 33H39.7a1.547 1.547 0 011.547 1.547zm0-12.375a1.547 1.547 0 01-1.55 1.55h-5.153A1.547 1.547 0 0133 27.328v-5.156a1.547 1.547 0 011.547-1.547H39.7a1.547 1.547 0 011.547 1.547zm0-12.375a1.547 1.547 0 01-1.55 1.55h-5.153A1.547 1.547 0 0133 14.953V9.8a1.547 1.547 0 011.547-1.55H39.7a1.547 1.547 0 011.55 1.55z"
            transform="translate(18.699)"
            // fill={selected === index ? '#4D5A9F' : '#dcdee8'}
            fill={'#dcdee8'}
          />
        </Svg>
      </View>

      <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            setisModalVisible(true);
          }}
          style={{
            marginTop: -12,
            marginRight: 5,
            width: 30,
            padding: 3,
          }}>
          <Entypo
            name="megaphone"
            size={21}
            color={selected === index ? WHITE : '#3F4D87'}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BusinessScreen', {
              id: item.id,
              edit: EDIT,
            });
          }}
          style={{
            width: 30,
            height: 25,
            // alignSelf: 'flex-end',
            marginTop: -13,
            marginRight: -15,
            borderRadius: 4,
            padding: 3,
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
      </View>

      <TouchableOpacity
        onPress={() => {
          setSelected(index);
        }}
        activeOpacity={0.9}
        style={{
          // display: 'flex',
          flexDirection: 'row',
          // padding: 20,
          // backgroundColor: 'transparent',
          // backgroundColor: 'red',
          // top: 1,
          marginTop: -15,
          // width: '100%',
        }}>
        <Image
          source={
            item.logo
              ? {uri: URL.concat(item.logo)}
              : require('../Assets/profilePic.png')
          }
          style={{width: 80, height: 80, borderRadius: 40}}
        />
        <View style={{marginLeft: 10}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: selected === index ? WHITE : SECONDARY,
              // backgroundColor: 'red',
              width: 140,
            }}>
            {item.name}
          </Text>
          {/* <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: selected === index ? WHITE : SECONDARY,
              marginBottom: 10,
            }}>
            {item.occupation}
            designation
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: selected === index ? WHITE : SECONDARY,
            }}>
            {item.email}
          </Text> */}
          <Text
            numberOfLines={3}
            style={{
              fontSize: 16,
              // fontWeight: 'bold',
              color: selected === index ? WHITE : SECONDARY,
              // color: SECONDARY,
              // backgroundColor: 'red',
              // width: 165,
              maxWidth: 165,
              // marginBottom: 30,
            }}>
            {item.tagline}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 14,
              color: selected === index ? WHITE : SECONDARY,
              maxWidth: 180,
              // backgroundColor: 'red',
              // width: 180,
            }}>
            {item.address}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        style={{alignItems: 'center'}}
        onRequestClose={() => {
          setisModalVisible(!isModalVisible);
        }}>
        <View
          style={{
            backgroundColor: '#F0F0F0',
            width: Width - 20,
            // height: '90%',
            alignSelf: 'center',
            marginTop: 50,
            borderRadius: 30,
            paddingHorizontal: 20,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{color: 'black', fontSize: 20, marginVertical: 20}}>
              Announcment
            </Text>
            <RegisterInputBox
              placeholder="Title"
              // inputType="password"
              keyboardType={'default'}
              onChange={value => {
                console.log('Title', value);
              }}
            />
            <RegisterInputBox
              placeholder="Description"
              // inputType="password"
              keyboardType={'default'}
              onChange={value => {
                console.log('Description', value);
              }}
            />
            <RegisterInputBox
              placeholder="City/Area"
              // inputType="password"
              keyboardType={'default'}
              onChange={value => {
                console.log('city', value);
              }}
            />
            <UploadBtn
              placeholder="Select Image"
              label={'Upload announcment post/banner'}
            />

            <TouchableOpacity
              onPress={() => {
                setisModalVisible(!isModalVisible);
              }}
              style={{
                backgroundColor: SECONDARY,
                height: 50,
                width: '100%',
                borderRadius: 10,
                marginVertical: 30,
                // alignSelf: 'flex-start',
                // marginTop:
                // position: 'absolute',
                // bottom: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  marginVertical: 14,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
