import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {PRIMARY, SECONDARY, WHITE} from '../Constants/Colors';
import Svg, {Path} from 'react-native-svg';
import {URL} from '../Constants/Constants';
import _ from 'lodash';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import LinearGradient from 'react-native-linear-gradient';

export default function IndividualCard({
  cta,
  favoritBtn,
  navigation,
  navigationPath,
  item,
  type,
}) {
  console.log('IndividualCard item..................', item);
  let arrayOccupation;
  arrayOccupation = _.find(item.personalCardMeta, {personalKey: 'occupation'});
  if (arrayOccupation) {
    arrayOccupation = arrayOccupation.personalValue;
    // console.log('arrayOccupation', arrayOccupation);
  } else {
    arrayOccupation = 'Dummy occupation';
  }

  let arrayCity;
  arrayCity = _.find(item.personalCardMeta, {personalKey: 'city'});
  if (arrayCity) {
    arrayCity = arrayCity.personalValue;
    // console.log('arrayCity', arrayCity);
  } else {
    arrayCity = 'Dummy city';
  }

  let arrayEducation;
  let eductaion;
  arrayEducation = _.find(item.personalCardMeta, {personalKey: 'Education'});
  if (arrayEducation) {
    arrayEducation = JSON.parse(arrayEducation.personalValue);
    console.log('arrayEducation', arrayEducation);
    eductaion = arrayEducation[0];
  } else {
    arrayEducation = 'Dummy eductaion';
  }

  let arrayJobHistory;
  let experience;
  arrayJobHistory = _.find(item.personalCardMeta, {personalKey: 'Education'});
  if (arrayJobHistory) {
    arrayJobHistory = JSON.parse(arrayJobHistory.personalValue);
    let tempExperience = arrayJobHistory[0];
    console.log('tempExperience', tempExperience);
    experience = tempExperience.endDateYear - tempExperience.startDateYear;
    console.log('experience', experience);
  } else {
    arrayJobHistory = '0';
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(navigationPath, {id: item.id});
      }}
      activeOpacity={0.9}
      style={{
        display: 'flex',
        // flexDirection: 'row',
        // padding: 20,
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
        position: 'relative',
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: 'grey',
              borderRadius: 150 / 2,
            }}>
            <Image
              source={
                item.profilePicture
                  ? {uri: URL.concat(item.profilePicture)}
                  : require('../Assets/profilePic.png')
              }
              style={{
                width: 60,
                height: 60,
                borderRadius: 150 / 2,
              }}
            />
          </View>
          <View style={{flex: 1, marginLeft: 15}}>
            <Text
              numberOfLines={1}
              style={{fontSize: 14, color: WHITE, fontWeight: 'bold'}}>
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 13,
                color: WHITE,
                maxWidth: '100%',
              }}>
              {item.phoneNo}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Entypo
                name="location-pin"
                size={20}
                color={WHITE}
                style={{marginLeft: -5}}
              />
              <Text
                numberOfLines={1}
                style={{fontSize: 13, color: WHITE, maxWidth: '100%'}}>
                {arrayCity}
              </Text>
            </View>
            {/* <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: PRIMARY,
              // marginBottom: 5,
              width: 200,
            }}>
            {arrayOccupation}
          </Text> */}
            {/* <Text
            numberOfLines={1}
            style={{fontSize: 14, color: PRIMARY, maxWidth: 190}}>
            {item.email}
          </Text> */}
            {/* <Text
          numberOfLines={1}
          style={{fontSize: 14, color: PRIMARY, width: 200}}>
          {item.address}
        </Text> */}
          </View>
          {/* {cta ? (
          <View
            style={{
              backgroundColor: WHITE,
              width: 40,
              height: 40,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: '50%',
              right: -15,
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
        ) : null} */}
          {favoritBtn ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                top: 20,
                right: 20,
              }}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={15}
                height={13.125}
                viewBox="0 0 15 13.125">
                <Path
                  data-name="Icon awesome-heart"
                  d="M13.544.897a4.006 4.006 0 00-5.467.4l-.576.593-.577-.595a4.006 4.006 0 00-5.467-.4 4.207 4.207 0 00-.29 6.091l5.669 5.853a.918.918 0 001.327 0l5.668-5.851a4.2 4.2 0 00-.287-6.091z"
                  fill="#aed8ec"
                />
              </Svg>
              <Text>20</Text>
            </View>
          ) : null}
        </View>
        <View
          style={{
            width: '100%',
            borderWidth: 0.5,
            borderColor: WHITE,
            marginVertical: 10,
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              // marginLeft: 10,
              color: WHITE,
              // width: 250,
            }}>
            {arrayOccupation}
          </Text>
          <Text style={{marginHorizontal: 10, color: WHITE}}>|</Text>
          <Text style={{color: WHITE}}>{experience + 'yr(s) exp'}</Text>
        </View>
        <Text style={{color: WHITE, fontSize: 12}}>
          {eductaion ? (eductaion.degree ? eductaion.degree : null) : null}
        </Text>

        <View style={{flexDirection: 'row', marginBottom: -10}}>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <AntDesign
              name="heart"
              size={12}
              color={'#B1D4E0'}
              style={{marginTop: 3}}
            />
            <Text style={{color: WHITE, marginLeft: 7}}>0</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 20}}>
            <FontAwesome5
              name="medal"
              size={12}
              color={'#B1D4E0'}
              style={{marginTop: 3}}
            />
            <Text style={{color: WHITE, marginLeft: 7}}>0</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 20}}>
            <Foundation
              name="lightbulb"
              size={15}
              color={'#B1D4E0'}
              style={{marginTop: 3}}
            />
            <Text style={{color: WHITE, marginLeft: 7}}>0</Text>
          </View>
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
                top: -3,
                right: -5,
                shadowColor: '#000',
                shadowOffset: {
                  width: 5,
                  height: 5,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}>
              {type ? (
                <Text
                  style={{
                    color: SECONDARY,
                    fontFamily: 'sans-serif-light',
                    fontWeight: '700',
                  }}>
                  {type}
                </Text>
              ) : (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={13.855}
                  height={13.855}
                  viewBox="0 0 13.855 13.855">
                  <Path
                    data-name="Icon material-arrow_back"
                    d="M0 7.793h10.538l-4.841 4.841 1.23 1.221 6.928-6.928L6.927-.001 5.706 1.22l4.832 4.842H0z"
                    fill={PRIMARY}
                  />
                </Svg>
              )}
            </View>
          ) : null}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
