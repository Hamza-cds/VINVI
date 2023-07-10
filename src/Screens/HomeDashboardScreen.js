import React, {useState, useEffect, useRef} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {GREY, PRIMARY, SECONDARY} from '../Constants/Colors';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
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
  searchBusinessApiCall,
  storyPostApiCall,
  DashboardStoriesApiCall,
} from '../Apis/Repo';
import {
  AlphabetList,
  DEFAULT_CHAR_INDEX,
} from 'react-native-section-alphabet-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/core';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import PagerView from 'react-native-pager-view';
// import {isNullOrEmptyArray} from '../Constants/TextUtils';
// import {Height, Width} from '../Constants/Constants';
import {hubConnectionBuilder} from '../Constants/signalR';
import {useSelector} from 'react-redux';
import {URL} from '../Constants/Constants';
import {isNullOrEmpty} from '../Constants/TextUtils';

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
  const [indicator, setIndicator] = useState(false);
  const pagerRef = useRef(null);
  const timeout = useRef(null);
  const [personalLimit, setPersonalLimit] = useState(10);
  const [businessLimit, setBusinessLimit] = useState(10);
  // let uploadType = 1;
  let page = 1;
  let limit = 10;
  // let value = null;

  const DATA = useSelector(state => state.UserData);

  const askPermission = async () => {
    if (Platform.OS == 'android') {
      const permissionAndroid = await PermissionsAndroid.check(
        'android.permission.CAMERA',
      );
      if (permissionAndroid != PermissionsAndroid.RESULTS.granted) {
        const reqPer = await PermissionsAndroid.request(
          'android.permission.CAMERA',
        );
        if (reqPer != 'granted') {
          return false;
        }
      }
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      hubConnectionBuilder(userData.id);
      askPermission();
      // console.log('userdata', userData);
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
    // console.log('mediaType', mediaType);
    var type = mediaType.split('/')[1];
    // console.log('type', type);
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

    // console.log('formdata', formdata);

    setIsLoading(true);
    storyPostApiCall(formdata)
      .then(res => res.json())
      .then(data => {
        // console.log('stories post response', data);
        if (data.status == 200 && data.success == true) {
          getDashboardStories();
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
    // debugger;
    setIsLoading(true);
    DashboardStoriesApiCall(page, limit)
      .then(async res => {
        console.log('stories res', res);
        if (res.data.success) {
          storiesMapData(res.data.result);
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

  const storiesMapData = list => {
    let newList = [...list];
    let finalList = [];

    for (let index = 0; index < newList.length; index++) {
      let element = newList[index];
      // console.log('element element', element);

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
      if (newList.length > 0) finalList.push(object);
      else finalList;
    }

    console.log('finalList', finalList);
    setUserStories([]);
    setUserStories((userStories = finalList));
    setIsLoading(false);
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
    getPersonalCardAllActiveApiCall(personalLimit, (page = 1), DATA.id)
      .then(({data}) => {
        console.log('personal res', data);
        if (data.success == true) {
          for (let index = 0; index < data.result.length; index++) {
            const element = data.result[index];
            element.value = element.name;
            element.key = JSON.stringify(element.id);
          }
          // console.log('Individual response', data.result);
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
    setIsLoading(true);
    getBusinessCardAllActiveApiCall(businessLimit, (page = 1))
      .then(({data}) => {
        console.log('business res', data);
        if (data.success == true) {
          for (let index = 0; index < data.result.length; index++) {
            const element = data.result[index];
            element.value = element.name;
            element.key = JSON.stringify(element.id);
          }
          // console.log('business response', data);
          setIsLoading(false);
          setBusinessData(data.result);
          setIndicator(false);
          // console.log('buisnessData', businessData);
        } else {
          setIsLoading(false);
          setBusinessData([]);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  // console.log('selected page', selectedPage);

  const onChangeHandler = value => {
    clearTimeout(timeout.current);
    setSearch((search = value));
    timeout.current = setTimeout(() => {
      onCheck();
    }, 1000);
  };

  const onCheck = () => {
    if (selectedPage == 0) {
      searchIndividualApiCall(limit, page, search)
        .then(async ({data}) => {
          // console.log('search response', data);
          if (data.success == true) {
            for (let index = 0; index < data.result.length; index++) {
              const element = data.result[index];
              element.value = element.name;
              element.key = JSON.stringify(element.id);
            }
            setIndividualData(data.result);
            setIndicator(false);
            // setIsLoading(false);
            // if (selectedPage == 0) {
            //   setIndividualData(data.result);
            //   setIndicator(false);
            // } else if (selectedPage == 1) {
            //   setBusinessData(data.result);
            // }
          } else {
            setIndicator(false);
            alert(data.message);
          }
        })
        .catch(err => {
          setIndicator(false);
          console.log('err', err);
        });
    } else if (selectedPage == 1) {
      searchBusinessApiCall(limit, page, search)
        .then(({data}) => {
          // console.log('search response', data);
          if (data.success == true) {
            for (let index = 0; index < data.result.length; index++) {
              const element = data.result[index];
              element.value = element.name;
              element.key = JSON.stringify(element.id);
            }
            setBusinessData(data.result);
            setIndicator(false);
            // setIsLoading(false);
            // if (selectedPage == 0) {
            //   setIndividualData(data.result);
            //   setIndicator(false);
            // } else if (selectedPage == 1) {
            //   setBusinessData(data.result);
            // }
          } else {
            setIndicator(false);
            // alert(data.message);
          }
        })
        .catch(err => {
          setIndicator(false);
          console.log('err', err);
        });
    }
    // // setIsLoading(true);
    // searchIndividualApiCall(limit, page, search)
    //   .then(({data}) => {
    //     console.log('search response', data);
    //     if (data.success == true) {
    //       for (let index = 0; index < data.result.length; index++) {
    //         const element = data.result[index];
    //         element.value = element.name;
    //         element.key = JSON.stringify(element.id);
    //       }
    //       // setIsLoading(false);
    //       if (selectedPage == 0) {
    //         setIndividualData(data.result);
    //         setIndicator(false);
    //       } else if (selectedPage == 1) {
    //         setBusinessData(data.result);
    //       }
    //     } else {
    //       // setIsLoading(false);
    //       if (selectedPage == 0) {
    //         setIndividualData([]);
    //       } else if (selectedPage == 1) {
    //         setBusinessData([]);
    //       }
    //     }
    //   })
    //   .catch(err => {
    //     // setIsLoading(false);
    //     console.log('err', err);
    //   });
  };

  // const renderIndividualFooter = () => {
  //   return (
  //     //Footer View with Load More button
  //     <View
  //       style={{
  //         padding: 10,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         flexDirection: 'row',
  //       }}>
  //       <TouchableOpacity
  //         activeOpacity={0.9}
  //         onPress={() => {
  //           setPersonalLimit(personalLimit + 5);
  //           getAllIndividual();
  //         }}
  //         //On Click of button load more data
  //         style={{
  //           height: 35,
  //           width: 80,
  //           alignItems: 'center',
  //           backgroundColor: PRIMARY,
  //           borderRadius: 10,
  //         }}>
  //         <Text style={{color: 'white', marginVertical: 6}}>Load More</Text>
  //         {/* {loading ? (
  //           <ActivityIndicator color="white" style={{marginLeft: 8}} />
  //         ) : null} */}
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  // ************************************************
  const renderIndividualFooter = () => {
    return (
      //Footer View with Load More button
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setPersonalLimit(personalLimit + 5);
            getAllIndividual();
          }}
          //On Click of button load more data
          style={{
            height: 35,
            width: 80,
            alignItems: 'center',
            backgroundColor: PRIMARY,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', marginVertical: 6}}>Load More</Text>
          {/* {loading ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null} */}
        </TouchableOpacity>
      </View>
    );
  };

  const renderBusinessFooter = () => {
    return (
      //Footer View with Load More button
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setBusinessLimit(businessLimit + 5);
            getBusinessList();
          }}
          //On Click of button load more data
          style={{
            height: 35,
            width: 80,
            alignItems: 'center',
            backgroundColor: PRIMARY,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', marginVertical: 6}}>Load More</Text>
          {/* {loading ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null} */}
        </TouchableOpacity>
      </View>
    );
  };

  // ***************************************************************

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
          // justifyContent: 'center',
          // alignItems: 'center',
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
            marginVertical: 20,
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
        {userStories.length > 0 ? (
          <View style={{width: '81%'}}>
            <DashboardStories
              userStories={userStories}
              setUserStories={setUserStories}
            />
          </View>
        ) : null}
      </View>

      <View style={{paddingHorizontal: 30, flexDirection: 'row'}}>
        <TextInput
          style={{
            height: 40,
            flex: 1,
            marginTop: -10,
            marginBottom: -5,
            backgroundColor: '#F0F0F0',
            borderRadius: 10,
            padding: 10,
          }}
          // onChangeText={value => {
          //   setSearch((search = value));
          //   onCheck();
          // }}
          onChangeText={value => {
            setIndicator(true);
            onChangeHandler(value);
          }}
          placeholder="Search"
          value={search}
        />
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
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
          onPress={() => {
            handlePageChange(0);
            setSearch('');
          }}>
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
          onPress={() => {
            handlePageChange(1);
            setSearch('');
          }}>
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
          {individualData.length > 0 ? (
            <AlphabetList
              data={individualData}
              index={DEFAULT_CHAR_INDEX}
              indexLetterStyle={{
                color: 'black',
                fontSize: 12,
              }}
              ListFooterComponent={renderIndividualFooter}
              indexContainerStyle={{marginHorizontal: 6, marginVertical: 3}}
              indexLetterContainerStyle={{height: 14, width: 10}}
              contentContainerStyle={{paddingBottom: 70}}
              renderCustomItem={(item, index) => (
                <IndividualCard
                  cta={true}
                  variant="closed"
                  navigation={navigation}
                  navigationPath="IndividualScreen"
                  item={item}
                  connectID={item}
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
          <View
            style={{
              position: 'absolute',
              top: 150,
              left: 0,
              right: 0,
            }}>
            <ActivityIndicator
              animating={indicator}
              size="large"
              color={'white'}
            />
          </View>
          {isLoading ? <Loader /> : null}
        </View>

        {/* ********** */}
        {/* Business Page */}
        {/* ********** */}
        <View key="2">
          {businessData.length > 0 ? (
            <AlphabetList
              data={businessData}
              index={DEFAULT_CHAR_INDEX}
              indexLetterStyle={{
                color: 'black',
                fontSize: 12,
              }}
              ListFooterComponent={renderBusinessFooter}
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
          <View
            style={{
              position: 'absolute',
              top: 150,
              left: 0,
              right: 0,
            }}>
            <ActivityIndicator
              animating={indicator}
              size="large"
              color={'white'}
            />
          </View>
        </View>
      </PagerView>

      {/* pager view screens end here */}

      {/* ++++++++Here pager view code end +++++++++++ */}

      {isLoading ? <Loader /> : null}
    </SafeAreaView>
  );
}
