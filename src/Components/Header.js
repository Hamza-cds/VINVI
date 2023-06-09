import React, {useState} from 'react';
import {TouchableOpacity, View, Text, Image, Modal} from 'react-native';
import Svg, {Path, G, Rect} from 'react-native-svg';
import {
  GREY,
  LIGHT_TEXT_COLOR,
  PRIMARY,
  SECONDARY,
  WHITE,
} from '../Constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Header({
  navigation,
  variant,
  headerName,
  headerIcon,
  onPress,
  userProfilePicture,
  userName,
  userStatus,
  back,
}) {
  let isheaderName;
  if (headerName) {
    isheaderName = true;
  } else {
    isheaderName = false;
  }
  const [favorit, setFavorit] = useState(false);
  const [modal, setModal] = useState(false);

  if (variant === 'light') {
    return (
      <View
        style={{
          display: 'flex',
          // flexDirection: 'row',
          // justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingHorizontal: 20,
          paddingVertical: 12,
          zIndex: 999,
          backgroundColor: PRIMARY,
        }}>
        {back == true ? (
          <TouchableOpacity onPress={onPress}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={20.957}
              height={20.957}
              viewBox="0 0 17.957 17.957">
              <Path
                data-name="Icon material-arrow_back"
                d="M17.957 7.856H4.3l6.274-6.274L8.979 0 0 8.979l8.979 8.979 1.582-1.582L4.3 10.1h13.657z"
                fill={WHITE}
              />
            </Svg>
          </TouchableOpacity>
        ) : null}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {headerIcon}
          {isheaderName ? (
            <Text style={{marginLeft: 10, fontSize: 20, color: WHITE}}>
              {headerName}
            </Text>
          ) : null}
        </View>
      </View>
    );
  } else if (variant === 'hamza') {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingHorizontal: 20,
          paddingVertical: 12,
          zIndex: 999,
          backgroundColor: PRIMARY,
        }}>
        {back == true ? (
          <TouchableOpacity onPress={onPress}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={20.957}
              height={20.957}
              viewBox="0 0 17.957 17.957">
              <Path
                data-name="Icon material-arrow_back"
                d="M17.957 7.856H4.3l6.274-6.274L8.979 0 0 8.979l8.979 8.979 1.582-1.582L4.3 10.1h13.657z"
                fill={WHITE}
              />
            </Svg>
          </TouchableOpacity>
        ) : null}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {headerIcon}
          {isheaderName ? (
            <Text style={{marginLeft: 10, fontSize: 20, color: WHITE}}>
              {headerName}
            </Text>
          ) : null}
        </View>
      </View>
    );
  } else if (variant === 'dark') {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 25,
          zIndex: 999,
        }}>
        <TouchableOpacity onPress={onPress}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20.957}
            height={20.957}
            viewBox="0 0 17.957 17.957">
            <Path
              data-name="Icon material-arrow_back"
              d="M17.957 7.856H4.3l6.274-6.274L8.979 0 0 8.979l8.979 8.979 1.582-1.582L4.3 10.1h13.657z"
              fill={'black'}
            />
          </Svg>
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {headerIcon}
          {isheaderName ? (
            <Text style={{marginLeft: 10, fontSize: 20, color: 'black'}}>
              {headerName}
            </Text>
          ) : null}
        </View>
      </View>
    );
  } else if (variant === 'drawer') {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 15,
          zIndex: 999,
          backgroundColor: PRIMARY,
        }}>
        <TouchableOpacity onPress={onPress}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20">
            <G
              data-name="Group 588"
              transform="translate(-37 -37)"
              fill={'white'}>
              <Rect
                data-name="Rectangle 1461"
                width={13}
                height={4}
                rx={2}
                transform="translate(37 45)"
              />
              <Rect
                data-name="Rectangle 1507"
                width={20}
                height={3}
                rx={1.5}
                transform="translate(37 37)"
              />
              <Rect
                data-name="Rectangle 1462"
                width={20}
                height={3}
                rx={1.5}
                transform="translate(37 54)"
              />
            </G>
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search');
            // setModal(true);
          }}>
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={20}
            color={'white'}
          />
        </TouchableOpacity>
        {/* <Modal
          visible={modal}
          transparent={true}
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <View
            style={{
              height: '50%',
              width: '80%',
              borderRadius: 10,
              backgroundColor: 'red',
              alignSelf: 'center',
              marginVertical: 150,
            }}></View>
        </Modal> */}
      </View>
    );
    //   <TouchableOpacity
    //   onPress={() => {
    //     navigation.navigate('Search');
    //   }}>
    //   <Svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width={24.936}
    //     height={25.828}
    //     viewBox="0 0 24.936 25.828">
    //     <Path
    //       d="M24.557 23.525l-6.147-6.393a10.424 10.424 0 10-7.982 3.724 10.316 10.316 0 005.974-1.887l6.194 6.442a1.36 1.36 0 101.96-1.886zM10.428 2.72a7.708 7.708 0 11-7.712 7.708 7.716 7.716 0 017.712-7.708z"
    //       fill={'white'}
    //     />
    //   </Svg>
    // </TouchableOpacity>
  } else if (variant === 'account') {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 5,
          backgroundColor: '#F8F8F8',
          zIndex: 999,
        }}>
        <TouchableOpacity onPress={onPress}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20.957}
            height={20.957}
            viewBox="0 0 17.957 17.957">
            <Path
              data-name="Icon material-arrow_back"
              d="M17.957 7.856H4.3l6.274-6.274L8.979 0 0 8.979l8.979 8.979 1.582-1.582L4.3 10.1h13.657z"
              fill={SECONDARY}
            />
          </Svg>
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            source={userProfilePicture}
            style={{
              width: 50,
              height: 50,
              backgroundColor: GREY,
              borderRadius: 50,
            }}
          />
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 18, color: SECONDARY, marginBottom: 3}}>
              {userName}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  backgroundColor: '#02C255',
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  marginTop: 5,
                }}
              />
              <Text
                style={{marginLeft: 5, fontSize: 14, color: LIGHT_TEXT_COLOR}}>
                {userStatus}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else if (variant === 'user') {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 25,
          zIndex: 999,
        }}>
        <TouchableOpacity onPress={onPress}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20.957}
            height={20.957}
            viewBox="0 0 17.957 17.957">
            <Path
              data-name="Icon material-arrow_back"
              d="M17.957 7.856H4.3l6.274-6.274L8.979 0 0 8.979l8.979 8.979 1.582-1.582L4.3 10.1h13.657z"
              fill={WHITE}
            />
          </Svg>
        </TouchableOpacity>
        {/* <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setFavorit(true);
          }}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={22.295}
            height={19.508}
            viewBox="0 0 22.295 19.508">
            <Path
              data-name="Icon awesome-heart"
              d="M20.131 1.334a5.955 5.955 0 00-8.13.592l-.858.884-.858-.884a5.954 5.954 0 00-8.125-.592 6.253 6.253 0 00-.431 9.053l8.426 8.7a1.365 1.365 0 001.973 0l8.426-8.7a6.249 6.249 0 00-.427-9.053z"
              fill={favorit ? "red" : '#fff'}
            />
          </Svg>
        </TouchableOpacity> */}
      </View>
    );
  } else if (variant == 'dark2') {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 25,
          zIndex: 999,
        }}>
        <TouchableOpacity onPress={onPress}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20.957}
            height={20.957}
            viewBox="0 0 17.957 17.957">
            <Path
              data-name="Icon material-arrow_back"
              d="M17.957 7.856H4.3l6.274-6.274L8.979 0 0 8.979l8.979 8.979 1.582-1.582L4.3 10.1h13.657z"
              fill={WHITE}
            />
          </Svg>
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {headerIcon}
          {isheaderName ? (
            <Text style={{marginLeft: 10, fontSize: 20, color: WHITE}}>
              {headerName}
            </Text>
          ) : null}
        </View>
      </View>
    );
  } else if (variant == 'white') {
    return (
      <View
        style={{
          backgroundColor: WHITE,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 20,
          zIndex: 999,
        }}>
        <TouchableOpacity onPress={onPress}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20.957}
            height={20.957}
            viewBox="0 0 17.957 17.957">
            <Path
              data-name="Icon material-arrow_back"
              d="M17.957 7.856H4.3l6.274-6.274L8.979 0 0 8.979l8.979 8.979 1.582-1.582L4.3 10.1h13.657z"
              fill={SECONDARY}
            />
          </Svg>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: WHITE,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {headerIcon}
          {isheaderName ? (
            <Text style={{marginLeft: 10, fontSize: 20, color: SECONDARY}}>
              {headerName}
            </Text>
          ) : null}
        </View>
      </View>
    );
  } else if (variant === 'light2') {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 25,
          zIndex: 999,
        }}>
        <TouchableOpacity onPress={onPress}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20.957}
            height={20.957}
            viewBox="0 0 17.957 17.957">
            <Path
              data-name="Icon material-arrow_back"
              d="M17.957 7.856H4.3l6.274-6.274L8.979 0 0 8.979l8.979 8.979 1.582-1.582L4.3 10.1h13.657z"
              fill={'white'}
            />
          </Svg>
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {headerIcon}
          {isheaderName ? (
            <Text style={{marginLeft: 10, fontSize: 20, color: 'white'}}>
              {headerName}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }
}
