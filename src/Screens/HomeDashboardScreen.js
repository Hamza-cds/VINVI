import React, {useState, useEffect, useRef} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {GREY, PRIMARY, SECONDARY} from '../Constants/Colors';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import IndividualCard from '../Components/IndividualCard';
import BuisnessCard from '../Components/BuisnessCard';
import Loader from '../Components/Loader';
import Header from '../Components/Header';
import DashboardStories from '../Components/DashboardStories';
import {
  getPersonalCardAllActiveApiCall,
  getBusinessCardAllActiveApiCall,
  searchIndividualApiCall,
  storyPostApiCall,
  DashboardStoriesApiCall,
} from '../Apis/Repo';
import {
  AlphabetList,
  DEFAULT_CHAR_INDEX,
} from 'react-native-section-alphabet-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PagerView from 'react-native-pager-view';
import {isNullOrEmptyArray} from '../Constants/TextUtils';
import {Height, Width} from '../Constants/Constants';

export default function HomeDashboardScreen({navigation, route}) {
  let [storyMedia, setStoryMedia] = useState('');
  let [userData, setUserData] = useState('');
  let [imageType, setImageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let [userStories, setUserStories] = useState([]);
  let [search, setSearch] = useState('');
  const [selectedPage, setSelectedPage] = useState(0);
  const [individualData, setIndividualData] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const pagerRef = useRef(null);
  let uploadType = 1;
  let page = 1;
  let limit = 10;
  let value = null;
  // console.log('search', search);
  // console.log('userStories', userStories);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      getDashboardStories();
      console.log('userdata', userData);
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getDashboardStories();
      getAllIndividual();
      getBusinessList();
    }, [selectedPage]),
  );

  const onSelecet = image => {
    for (let index = 0; index < image.assets.length; index++) {
      const element = image.assets[index];
      setStoryMedia((storyMedia = element));
    }

    var mediaType = storyMedia.type;
    console.log('mediaType', mediaType);
    var type = mediaType.split('/')[1];
    console.log('type', type);
    setImageType((imageType = type));

    var formdata = new FormData();
    formdata.append('Id', '0');
    formdata.append('UploadType', 1);
    formdata.append('Title', 'this is title');
    formdata.append('Description', 'this is description');
    formdata.append('UserId', JSON.stringify(userData.id));
    formdata.append('media_file', {
      uri: storyMedia.uri,
      name: storyMedia.fileName + '.' + imageType,
      type: storyMedia.type,
    });

    console.log('formdata', formdata);

    setIsLoading(true);
    storyPostApiCall(formdata)
      .then(res => res.json())
      .then(data => {
        console.log('response', data);
        if (data.status === 200 && data.success === true) {
          setIsLoading(false);
          getDashboardStories();
          // navigation.replace('MyCardsDashboardScreen');
          alert('successfully posted');
        } else {
          setIsLoading(false);
          alert('invalid request');
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  const getDashboardStories = () => {
    setIsLoading(true);
    DashboardStoriesApiCall(page, limit)
      .then(res => {
        console.log('stories res', res);
        if (res.data.success) {
          setUserStories((userStories = res.data.result));
          setIsLoading(false);
        } else {
          setIsLoading(false);
          // alert('No stories found.');
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  const handlePageChange = pageNumber => {
    // setSelectedPage(pageNumber);
    pagerRef.current.setPage(pageNumber);
    setSelectedPage(pageNumber);
  };
  const onPageScroolEvent = event => {
    setSelectedPage(event.nativeEvent.position);
  };

  const getAllIndividual = () => {
    setIsLoading(true);
    getPersonalCardAllActiveApiCall()
      .then(({data}) => {
        console.log('data', data);
        if (data.success == true) {
          for (let index = 0; index < data.result.length; index++) {
            const element = data.result[index];
            element.value = element.name;
            element.key = JSON.stringify(element.id);
          }
          console.log('hamza..................................', data.result);
          setIsLoading(false);
          setIndividualData(data.result);
        } else {
          setIsLoading(false);
          setIndividualData([]);
        }
      })

      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  const getBusinessList = () => {
    getBusinessCardAllActiveApiCall()
      .then(({data}) => {
        if (data.success == true) {
          for (let index = 0; index < data.result.length; index++) {
            const element = data.result[index];
            element.value = element.name;
            element.key = JSON.stringify(element.id);
          }
          console.log('business response', data);
          setBusinessData(data.result);
          console.log('buisnessData', businessData);
        } else {
          setIsLoading(false);
          setBusinessData([]);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  console.log('selected page', selectedPage);

  const onCheck = () => {
    setIsLoading(true);
    searchIndividualApiCall(limit, page, search)
      .then(({data}) => {
        console.log('search response', data);
        if (data.success == true) {
          for (let index = 0; index < data.result.length; index++) {
            const element = data.result[index];
            element.value = element.name;
            element.key = JSON.stringify(element.id);
          }
          setIsLoading(false);
          if (selectedPage == 0) {
            setIndividualData(data.result);
          } else if (selectedPage == 1) {
            setBusinessData(data.result);
          }
        } else {
          setIsLoading(false);
          if (selectedPage == 0) {
            setIndividualData([]);
          } else if (selectedPage == 1) {
            setBusinessData([]);
          }
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        navigation={navigation}
        variant="drawer"
        onPress={() => {
          navigation.toggleDrawer();
        }}
      />
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: -10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          // zIndex: 5,
        }}>
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            backgroundColor: PRIMARY,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            marginTop: 10,
          }}
          onPress={() => {
            launchImageLibrary({mediaType: 'photo'}, image => {
              if (image.didCancel) {
                console.log('User cancelled image picker');
              } else {
                onSelecet(image);
              }
            });
          }}>
          <Text style={{color: 'white', fontSize: 25}}>+</Text>
        </TouchableOpacity>
        <View style={{width: '81%'}}>
          <DashboardStories userStories={userStories} />
        </View>
      </View>

      <View style={{paddingHorizontal: 30, flexDirection: 'row'}}>
        <TextInput
          style={{
            height: 40,
            flex: 1,
            marginTop: -10,
            marginBottom: -5,
            backgroundColor: '#F0F0F0',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            padding: 10,
          }}
          onChangeText={value => {
            setSearch((search = value));
          }}
          placeholder="Search"
          value={value}
        />
        <TouchableOpacity
          onPress={onCheck}
          style={{
            backgroundColor: '#F0F0F0',
            height: 40,
            width: 30,
            borderTopRightRadius: 10,
            marginTop: -10,
            borderBottomRightRadius: 10,
          }}>
          <AntDesign name="search1" size={23} style={{marginTop: 8}} />
        </TouchableOpacity>
      </View>

      {/* ++++++++Here pager view code start +++++++++++ */}

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: 20,
          marginBottom: 10,
          borderRadius: 10,
          height: 40,
          backgroundColor: GREY,
          paddingHorizontal: 5,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePageChange(0)}>
          <Text
            style={{
              fontSize: 13,
              color: selectedPage == 0 ? 'white' : SECONDARY,
              backgroundColor: selectedPage == 0 ? SECONDARY : null,
              height: 30,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 5,
              marginVertical: 5,
            }}>
            Individual Cards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePageChange(1)}>
          <Text
            style={{
              fontSize: 13,
              color: selectedPage == 1 ? 'white' : SECONDARY,
              backgroundColor: selectedPage == 1 ? SECONDARY : null,
              height: 30,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 5,
              marginVertical: 5,
            }}>
            Business Cards
          </Text>
        </TouchableOpacity>
      </View>

      {/* pager view screens start here */}

      <PagerView
        style={{flex: 1}}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={event => {
          onPageScroolEvent(event);
        }}>
        {/* ********** */}
        {/* Individual Page */}
        {/* ********** */}
        <View key="1">
          {!isNullOrEmptyArray(individualData) ? (
            <AlphabetList
              data={individualData}
              index={DEFAULT_CHAR_INDEX}
              indexLetterStyle={{
                color: 'black',
                fontSize: 12,
              }}
              indexContainerStyle={{marginHorizontal: 6, marginVertical: 3}}
              indexLetterContainerStyle={{height: 15, width: 10}}
              contentContainerStyle={{paddingBottom: 70}}
              renderCustomItem={(item, index) => (
                <IndividualCard
                  cta={true}
                  variant="closed"
                  navigation={navigation}
                  navigationPath="IndividualScreen"
                  item={item}
                  key={index}
                />
              )}
              renderCustomSectionHeader={section => (
                <View style={{backgroundColor: '#F5F5F5'}}>
                  <Text style={{color: 'black', marginLeft: 10}}>
                    {section.title}
                  </Text>
                </View>
              )}
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: 300,
              }}>
              <Text style={{color: '#242424'}}>No record found</Text>
            </View>
          )}

          {isLoading ? <Loader /> : null}
        </View>

        {/* ********** */}
        {/* Business Page */}
        {/* ********** */}
        <View key="2">
          {!isNullOrEmptyArray(businessData) ? (
            <AlphabetList
              data={businessData}
              index={DEFAULT_CHAR_INDEX}
              indexLetterStyle={{
                color: 'black',
                fontSize: 12,
              }}
              indexContainerStyle={{marginHorizontal: 6, marginVertical: 3}}
              indexLetterContainerStyle={{height: 15, width: 10}}
              contentContainerStyle={{paddingBottom: 70}}
              renderCustomItem={(item, index) => (
                <BuisnessCard
                  cta={true}
                  variant="closed"
                  navigation={navigation}
                  navigationPath="BusinessScreen"
                  item={item}
                  key={index}
                />
                // <View style={{backgroundColor: 'red'}}>
                //   <Text style={{color: 'white'}}>{item.value}</Text>
                // </View>
              )}
              renderCustomSectionHeader={section => (
                <View style={{backgroundColor: '#F5F5F5'}}>
                  <Text style={{color: 'black', marginLeft: 10}}>
                    {section.title}
                  </Text>
                </View>
              )}
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: 300,
              }}>
              <Text style={{color: '#242424'}}>No record found</Text>
            </View>
          )}
        </View>
      </PagerView>

      {/* pager view screens end here */}

      {/* ++++++++Here pager view code end +++++++++++ */}

      {isLoading ? <Loader /> : null}
    </SafeAreaView>
  );
}

{
  /* <Tab.Navigator
        initialRouteName="Individual"
        tabBarOptions={{
          indicatorStyle: {backgroundColor: PRIMARY},
          labelStyle: {
            fontSize: 12,
            color: PRIMARY,
            fontWeight: 'bold',
          },
          style: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            elevation: 0,
            marginHorizontal: 20,
            // marginTop: 10,
            marginBottom: 10,
            color: useIsFocused ? PRIMARY : null,
          },
          bounces: true,
        }}
        sceneContainerStyle={{backgroundColor: 'transprent'}}>
        <Tab.Screen
          name="Individual"
          component={IndividualDataCardsListing}
          // initialParams={{search: search}}
        />
        <Tab.Screen
          name="Business"
          component={BusinessDataCardsListing}
          initialParams={{search: search}}
        />
      </Tab.Navigator> */
}
