import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {PRIMARY, SECONDARY, WHITE} from '../Constants/Colors';
import Svg, {Path} from 'react-native-svg';
import {URL} from '../Constants/Constants';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function BuisnessCard({
  item,
  selected,
  index,
  setSelected,
  navigation,
  navigationPath,
  cta,
}) {
  console.log('item', item);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        navigation.navigate(navigationPath, {id: item.id});
      }}
      style={{
        // backgroundColor: selected === index ? PRIMARY : WHITE,
        backgroundColor: WHITE,
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
        borderRadius: 15,
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#111158', '#1c4fa6']}
        style={{
          width: '100%',
          borderRadius: 15,
          justifyContent: 'center',
          padding: 20,
          backgroundColor: 'rgba(64,77,136,.8)',
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

        <TouchableOpacity
          onPress={() => {
            // setSelected(index);
            navigation.navigate(navigationPath, {id: item.id});
          }}
          activeOpacity={0.9}
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'transparent',
            // position: 'absolute',
            top: 1,
            width: '100%',
          }}>
          <View>
            <Image
              source={
                item.logo
                  ? {uri: URL.concat(item.logo)}
                  : require('../Assets/profilePic.png')
              }
              style={{
                width: 60,
                height: 60,
                borderRadius: 150 / 2,
              }}
            />
          </View>

          <View style={{marginLeft: 20}}>
            <Text
              style={{
                fontSize: 14,
                // color: selected === index ? WHITE : SECONDARY,
                color: WHITE,
              }}>
              {item.name}
            </Text>
            <Text
              numberOfLines={5}
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                // color: selected === index ? WHITE : SECONDARY,
                color: WHITE,
                maxWidth: 165,
              }}>
              {item.phoneNo}
            </Text>
            <Text
              style={{
                fontSize: 13,
                // color: selected === index ? WHITE : SECONDARY,
                color: WHITE,
              }}>
              {item.industryTypeLookupDetail
                ? item.industryTypeLookupDetail.name
                  ? item.industryTypeLookupDetail.name
                  : 'dummy industry'
                : 'dummy industry'}
            </Text>
          </View>
        </TouchableOpacity>
        {cta ? (
          <View
            style={{
              backgroundColor: WHITE,
              width: 30,
              height: 30,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 5,
              right: 5,
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
              width={13.855}
              height={13.855}
              viewBox="0 0 13.855 13.855">
              <Path
                data-name="Icon material-arrow_back"
                d="M0 7.793h10.538l-4.841 4.841 1.23 1.221 6.928-6.928L6.927-.001 5.706 1.22l4.832 4.842H0z"
                fill="#151269"
              />
            </Svg>
          </View>
        ) : null}

        <View
          style={{
            width: '100%',
            borderColor: WHITE,
            borderWidth: 0.5,
            marginVertical: 10,
          }}
        />
        <Text style={{color: WHITE, fontSize: 12, fontFamily: 'serif'}}>
          {item.tagline ? item.tagline : 'dummy tagline'}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Entypo
            name="location-pin"
            size={15}
            color={WHITE}
            style={{marginLeft: -3, marginTop: 3}}
          />
          <Text style={{color: WHITE, fontSize: 12, marginTop: 2}}>
            {item.address}
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 10, marginBottom: -10}}>
          <AntDesign
            name="heart"
            size={12}
            color={'#B1D4E0'}
            style={{marginTop: 3}}
          />
          <Text style={{color: WHITE, marginLeft: 7}}>0</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

{
  /* <View style={{position: 'absolute', bottom: 0}}>
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
      </View> */
}
