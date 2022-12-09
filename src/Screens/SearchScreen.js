import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import Header from '../Components/Header';
// import TopTabsNavigator from '../Navigation/TopTabsNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import QRCode from 'react-native-qrcode-svg';
import {Height, Width} from '../Constants/Constants';
import PagerView from 'react-native-pager-view';
import {GREY, SECONDARY, WHITE} from '../Constants/Colors';
import {useSelector} from 'react-redux';
import CryptoJS from 'react-native-crypto-js';
import {URL} from '../Constants/Constants';
import {isNullOrEmpty} from '../Constants/TextUtils';
import {Camera, CameraScreen} from 'react-native-camera-kit';
import {useFocusEffect} from '@react-navigation/core';

export default function SearchScreen({navigation, route}) {
  const [selectedPage, setSelectedPage] = useState(0);
  const pagerRef = useRef(null);
  const handlePageChange = pageNumber => {
    // setSelectedPage(pageNumber);
    pagerRef.current.setPage(pageNumber);
    setSelectedPage(pageNumber);
  };
  const onPageScroolEvent = event => {
    setSelectedPage(event.nativeEvent.position);
  };

  // my qr code requirements start

  var date = new Date();

  const DATA = useSelector(state => state.UserData);
  // console.log('Header dispatch DATA', DATA);
  let ciphertext = CryptoJS.AES.encrypt(
    date.getTime() +
      '_' +
      JSON.stringify(DATA.id) +
      '_' +
      date.getTime() +
      '|' +
      'qr',
    'secret key 123',
  ).toString();

  // my qr code requirements end

  // scan screen requirements start

  let [testData, setTestData] = useState('');
  // scan screen requirements end

  return (
    <SafeAreaView style={{height: Height, width: Width}}>
      <Header
        navigation={navigation}
        variant="dark"
        // headerIcon={
        //   <Svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     width={20.936}
        //     height={20.828}
        //     viewBox="0 0 24.936 25.828">
        //     <Path
        //       d="M24.557 23.525l-6.147-6.393a10.424 10.424 0 10-7.982 3.724 10.316 10.316 0 005.974-1.887l6.194 6.442a1.36 1.36 0 101.96-1.886zM10.428 2.72a7.708 7.708 0 11-7.712 7.708 7.716 7.716 0 017.712-7.708z"
        //       fill="black"
        //     />
        //   </Svg>
        // }
        headerName="Vinvi QR code"
        onPress={() => {
          navigation.navigate('Dashboard');
        }}
      />
      {/* <TopTabsNavigator variant="search" /> */}

      {/* ++++++++Here pager view code start +++++++++++ */}

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: 20,
          marginBottom: 10,
          borderRadius: 10,
          height: 45,
          backgroundColor: WHITE,
          paddingHorizontal: 5,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handlePageChange(0);
          }}>
          <Text
            style={{
              fontSize: 13,
              color: selectedPage == 0 ? 'white' : SECONDARY,
              backgroundColor: selectedPage == 0 ? SECONDARY : null,
              height: 35,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 5,
              marginVertical: 6,
            }}>
            My Code
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handlePageChange(1);
          }}>
          <Text
            style={{
              fontSize: 13,
              color: selectedPage == 1 ? 'white' : SECONDARY,
              backgroundColor: selectedPage == 1 ? SECONDARY : null,
              height: 35,
              borderRadius: 10,
              paddingHorizontal: 38,
              paddingVertical: 5,
              marginVertical: 6,
            }}>
            Scan
          </Text>
        </TouchableOpacity>
      </View>

      {/* pager view screens start here */}

      <PagerView
        style={{height: '70%'}}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={event => {
          onPageScroolEvent(event);
        }}>
        <View key="1">
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              // height: '100%',
            }}>
            <View
              style={{
                height: 300,
                width: 300,
                marginTop: 50,
                backgroundColor: 'white',
                alignSelf: 'center',
                borderRadius: 10,
              }}>
              <Image
                source={
                  !isNullOrEmpty(DATA)
                    ? !isNullOrEmpty(DATA.profileImage)
                      ? {uri: URL.concat(DATA.profileImage)}
                      : require('../Assets/profilePic.png')
                    : require('../Assets/profilePic.png')
                }
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  position: 'absolute',
                  top: -33,
                  alignSelf: 'center',
                }}
              />
              <Text style={{alignSelf: 'center', marginTop: 50}}>
                {DATA.firstName}
              </Text>
              {/* <Text style={{alignSelf: 'center', marginTop: 5}}>User position</Text> */}

              <View style={{alignItems: 'center', marginTop: 30}}>
                <QRCode size={150} value={ciphertext} />
              </View>
            </View>
          </View>
        </View>
        <View key="2">
          <View>
            <CameraScreen
              style={{
                width: '100%',
                height: '100%',
              }}
              scanBarcode={true}
              ratioOverlay={['16:9', '1:1', '3:4']}
              onReadCode={event => {
                // console.log('event', event);
                setTestData((testData = event.nativeEvent.codeStringValue));
                setTestData('');
                navigation.navigate('IndividualScreen', {
                  param: testData,
                });
              }}
              showFrame={false} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
              laserColor="green" // (default red) optional, color of laser in scanner frame
              frameColor="white" // (default white) optional, color of border of scanner frame
            />
          </View>
        </View>
      </PagerView>
    </SafeAreaView>
  );
}
