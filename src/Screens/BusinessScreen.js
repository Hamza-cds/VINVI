import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Linking,
  BackHandler,
} from 'react-native';
import {SECONDARY, WHITE, PRIMARY, FIFTH} from '../Constants/Colors';
import BtnComponent from '../Components/BtnComponent';
import ProductCard from '../Components/ProductCard';
import Header from '../Components/Header';
import Svg, {Path} from 'react-native-svg';
import {Height, QRCODE_URL, URL, Width} from '../Constants/Constants';
import QRCode from 'react-native-qrcode-svg';
import {
  getBusinessCardByIdApiCall,
  GetAllLookupDetailApiCall,
  BusinessDeleteProductApiCall,
  saveCardAPiCall,
  deleteSavedCardApiCall,
} from '../Apis/Repo';
import _ from 'lodash';
import Feather from 'react-native-vector-icons/Feather';
import EditBusinessCardModal from './EditBusinessCardModal';
import BusinessEditCategoryModal from './BusinessEditCategoryModal';
import Loader from '../Components/Loader';
import AddorEditProductModal from './AddorEditProductModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditBusinessAddCategoryModal from './EditBusinessAddCategoryModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {isNullOrEmptyArray} from '../Constants/TextUtils';

const BusinessScreen = props => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryID, setSelectedCategoryID] = useState('');
  const [categoryWiseData, setCategoryWiseData] = useState('');
  const navigation = props.navigation;
  let [businessData, setBusinessData] = useState([]);
  const [ID, setID] = useState(props.route.params.id);
  const [isBusinessCardModalVisible, setIsBusinessCardModalVisible] =
    useState(false);
  const isEdit = props.route.params.edit;
  let [industryType, setIndustryType] = useState([]);
  let [lookupData, setLookupData] = useState([]);
  const [isEditDelCategoryModalVisible, setIsEditDelCategoryModalVisible] =
    useState(false);
  const [isAddCategoryModelVisible, setisAddCategoryModelVisible] =
    useState(false);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  let [editCategory, setEditCategory] = useState([]);
  const [editProduct, setEditProduct] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [CategoryObject, setCategoryObject] = useState('');
  const [businessCardId, setBusinessCardId] = useState('');
  const [edit, setEdit] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [favorit, setFavorit] = useState(false);
  let [userData, setUserData] = useState(null);
  const [isSaved, setIsSaved] = useState('');
  let [businessIndustry, setBusinessIndustry] = useState();
  let [categoryLength, setCategoryLength] = useState([]);
  let [websiteID, setWebsiteID] = useState(0);
  let [websiteValue, setWebSiteValue] = useState('');
  let [instaID, setInstaID] = useState(0);
  let [instaValue, setInstaValue] = useState('');
  let [facebookID, setFacebookID] = useState(0);
  let [facebookValue, setFacebookValue] = useState('');
  let [twitterID, setTwitterID] = useState(0);
  let [twitterValue, setTwitterValue] = useState('');
  let [youtubeID, setYoutubeID] = useState(0);
  let [youtubeValue, setYoutubeValue] = useState('');

  useEffect(() => {
    setEditProduct('');
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
      getAllLookupdetail();
    });
  }, []);

  const DATA = useSelector(state => state.UserData);

  console.log('lookupData', lookupData);

  useEffect(() => {
    getBusinessData();
    // if (lookupData.length <= 0) {
    //   getAllLookupdetail();
    // }

    setRefresh(false);
    if (isSaved == 1) {
      setFavorit(true);
    } else if (isSaved == 0) {
      setFavorit(false);
    }
  }, [isSaved, refresh]);

  const getAllLookupdetail = () => {
    // setIsLoading(true);
    GetAllLookupDetailApiCall()
      .then(res => {
        setLookupData((lookupData = res.data.result));
        // console.log('lookupData', lookupData);
        // setIsLoading(false);

        for (let index = 0; index < lookupData.length; index++) {
          const element = lookupData[index];
          if (element.lookupId == 9) {
            let arrayIndustryType = industryType;
            arrayIndustryType.push(element);
            setIndustryType((industryType = arrayIndustryType));
          }
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const getBusinessData = () => {
    setIsLoading(true);
    getBusinessCardByIdApiCall(ID, DATA.id)
      .then(async res => {
        console.log('RESPONSE', res.data.result);
        if (res.data.success) {
          setIsLoading(false);
          setBusinessIndustry(
            (businessIndustry = res.data.result.industryTypeLookupDetail),
          );
          setBusinessData((businessData = res.data.result));
          setSelectedCategory(businessData.businessCategory[0].name);
          setSelectedCategoryID(businessData.businessCategory[0].id);
          setCategoryObject(businessData.businessCategory[0].id);
          setBusinessCardId(businessData.businessCategory[0].businessCardIdFk);
          if (businessData.businessCategory.length >= 0) {
            setCategoryLength((categoryLength = businessData.businessCategory));
          } else {
            setCategoryLength([]);
          }
          setCategoryWiseData(
            businessData.businessCategory[0].businessCategoryProduct,
          );
          setIsSaved(res.data.result.isSaved);
        } else {
          setIsLoading(false);
          alert('No record found.');
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  const onCardSave = () => {
    let obj = {
      Id: 0,
      UserId: userData.id,
      CardType: true,
      BusinessCardId: businessData.id,
    };

    setIsLoading(true);
    saveCardAPiCall(obj)
      // .then(res => res.json())
      .then(data => {
        console.log('response', data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  const onCardUnSave = () => {
    let obj = {
      Id: 0,
      UserId: userData.id,
      CardType: 1,
      CardId: businessData.id,
    };

    setIsLoading(true);
    deleteSavedCardApiCall(obj)
      // .then(res => res.json())
      .then(data => {
        console.log('response', data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  // let arrayBusinessType;
  // arrayBusinessType = _.find(businessData.businessCardMeta, {
  //   businessKey: 'Type of Business',
  // });
  // if (arrayBusinessType) {
  //   arrayBusinessType = arrayBusinessType.businessValue;
  // } else {
  //   arrayBusinessType = 'No Product Image';
  // }

  console.log('websiteValue', websiteValue);

  useEffect(() => {
    let arrayWebsiteLinkValue;
    let arrayWebsiteLinkID;
    arrayWebsiteLinkValue = _.find(businessData.businessCardMeta, {
      businessKey: 'website link',
    });
    if (arrayWebsiteLinkValue) {
      debugger;
      arrayWebsiteLinkID = arrayWebsiteLinkValue.id;
      arrayWebsiteLinkValue = arrayWebsiteLinkValue.businessValue;
      setWebSiteValue((websiteValue = arrayWebsiteLinkValue));
      setWebsiteID((websiteID = arrayWebsiteLinkID));
    } else {
      arrayWebsiteLinkValue = 'Website';
    }

    let arrayFacebookLinkValue;
    let arrayFacebookLinkID;
    arrayFacebookLinkValue = _.find(businessData.businessCardMeta, {
      businessKey: 'facebook link',
    });
    if (arrayFacebookLinkValue) {
      arrayFacebookLinkID = arrayFacebookLinkValue.id;
      arrayFacebookLinkValue = arrayFacebookLinkValue.businessValue;
      setFacebookValue((facebookValue = arrayFacebookLinkValue));
      setFacebookID((facebookID = arrayFacebookLinkID));
    } else {
      arrayFacebookLinkValue = 'facebook';
    }

    let arrayTwitterLinkValue;
    let arrayTwitterLinkID;
    arrayTwitterLinkValue = _.find(businessData.businessCardMeta, {
      businessKey: 'twitter link',
    });
    if (arrayTwitterLinkValue) {
      arrayTwitterLinkID = arrayTwitterLinkValue.id;
      arrayTwitterLinkValue = arrayTwitterLinkValue.businessValue;
      setTwitterValue((twitterValue = arrayTwitterLinkValue));
      setTwitterID((twitterID = arrayTwitterLinkID));
    } else {
      arrayTwitterLinkValue = 'twitter';
    }

    let arrayInstaLinkValue;
    let arrayInstaLinkID;
    arrayInstaLinkValue = _.find(businessData.businessCardMeta, {
      businessKey: 'instagram link',
    });
    if (arrayInstaLinkValue) {
      arrayInstaLinkID = arrayInstaLinkValue.id;
      arrayInstaLinkValue = arrayInstaLinkValue.businessValue;
      setInstaValue((instaValue = arrayInstaLinkValue));
      setInstaID((instaID = arrayInstaLinkID));
    } else {
      arrayInstaLinkValue = 'instagram';
    }

    let arrayYoutubeLinkValue;
    let arrayYoutubeLinkID;
    arrayYoutubeLinkValue = _.find(businessData.businessCardMeta, {
      businessKey: 'youtube link',
    });
    if (arrayYoutubeLinkValue) {
      arrayYoutubeLinkID = arrayYoutubeLinkValue.id;
      arrayYoutubeLinkValue = arrayYoutubeLinkValue.businessValue;
      setYoutubeValue((youtubeValue = arrayYoutubeLinkValue));
      setYoutubeID((youtubeID = arrayYoutubeLinkID));
    } else {
      arrayYoutubeLinkValue = 'youtube';
    }
  }, [businessData]);

  // console.log('lookupData', lookupData);

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        height: Height,
        width: Width,
      }}>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <ImageBackground
          // source={require('../Assets/buisnessbanner.png')}
          source={
            businessData.cover
              ? {uri: URL.concat(businessData.cover)}
              : require('../Assets/buisnessbanner.png')
          }
          style={{
            width: '100%',
            height: 400,
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(17,48,102,.5)',
            }}>
            <Header
              navigation={navigation}
              variant="user"
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
            <View
              style={{
                width: '100%',
                flex: 1,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  padding: 10,
                  borderRadius: 100,
                }}>
                <Image
                  source={{uri: URL.concat(businessData.logo)}}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text
                style={{
                  color: WHITE,
                  fontSize: 20,
                  marginVertical: 20,
                }}>
                {businessData.name}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#ffffff',
                    padding: 10,
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={10.248}
                    height={18.401}
                    viewBox="0 0 8.248 15.401">
                    <Path
                      data-name="Icon awesome-facebook-f"
                      d="M7.708 8.663l.428-2.787H5.462V4.067a1.394 1.394 0 011.571-1.506h1.216V.188A14.826 14.826 0 006.091 0a3.4 3.4 0 00-3.642 3.751v2.125H0v2.787h2.449V15.4h3.013V8.663z"
                      fill="#066aff"
                    />
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#ffffff',
                    padding: 10,
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18.12}
                    height={14.936}
                    viewBox="0 0 18.12 14.936">
                    <Path
                      data-name="Icon awesome-twitter"
                      d="M16.257 3.719c.012.163.012.327.012.49A10.578 10.578 0 015.7 14.936 10.383 10.383 0 010 13.244a7.571 7.571 0 00.9.047 7.368 7.368 0 004.61-1.61 3.728 3.728 0 01-3.472-2.614 4.616 4.616 0 00.7.058 3.873 3.873 0 00.977-.128 3.756 3.756 0 01-2.978-3.7v-.046a3.7 3.7 0 001.679.478A3.812 3.812 0 011.266.688a10.506 10.506 0 007.656 3.944 4.316 4.316 0 01-.092-.863A3.74 3.74 0 0112.544 0a3.68 3.68 0 012.713 1.19 7.246 7.246 0 002.357-.91 3.749 3.749 0 01-1.633 2.077 7.359 7.359 0 002.139-.583 8.049 8.049 0 01-1.863 1.945z"
                      fill="#09f"
                    />
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#ffffff',
                    padding: 10,
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16.627}
                    height={16.624}
                    viewBox="0 0 16.627 16.624">
                    <Path
                      data-name="Icon awesome-instagram"
                      d="M8.315 4.049a4.262 4.262 0 104.262 4.262 4.255 4.255 0 00-4.262-4.262zm0 7.033a2.771 2.771 0 112.771-2.771 2.776 2.776 0 01-2.771 2.772zm5.431-7.207a.994.994 0 11-.994-.994.992.992 0 01.994.994zm2.823 1.009a4.92 4.92 0 00-1.343-3.483A4.952 4.952 0 0011.743.062c-1.372-.078-5.486-.078-6.859 0a4.945 4.945 0 00-3.479 1.335A4.936 4.936 0 00.058 4.88c-.078 1.372-.078 5.486 0 6.859a4.92 4.92 0 001.347 3.483 4.958 4.958 0 003.479 1.34c1.372.078 5.486.078 6.859 0a4.92 4.92 0 003.483-1.343 4.952 4.952 0 001.343-3.483c.078-1.372.078-5.483 0-6.855zm-1.773 8.328a2.805 2.805 0 01-1.58 1.58c-1.094.434-3.691.334-4.9.334s-3.81.1-4.9-.334a2.805 2.805 0 01-1.58-1.58c-.431-1.095-.331-3.691-.331-4.9s-.1-3.81.334-4.9a2.805 2.805 0 011.58-1.58c1.086-.435 3.686-.335 4.896-.335s3.81-.1 4.9.334a2.805 2.805 0 011.58 1.58c.434 1.094.334 3.691.334 4.9s.101 3.81-.333 4.901z"
                      fill="#f90"
                    />
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#ffffff',
                    padding: 10,
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17.353}
                    height={12.201}
                    viewBox="0 0 17.353 12.201">
                    <Path
                      data-name="Icon awesome-youtube"
                      d="M16.99 1.909A2.18 2.18 0 0015.456.365 51.528 51.528 0 008.676 0a51.528 51.528 0 00-6.78.365A2.18 2.18 0 00.363 1.909 22.874 22.874 0 000 6.109a22.874 22.874 0 00.363 4.2 2.148 2.148 0 001.534 1.519 51.528 51.528 0 006.78.365 51.528 51.528 0 006.78-.365 2.148 2.148 0 001.534-1.519 22.874 22.874 0 00.363-4.2 22.874 22.874 0 00-.363-4.2zM6.902 8.693v-5.16l4.535 2.58-4.535 2.58z"
                      fill="red"
                    />
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#ffffff',
                    padding: 10,
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16.255}
                    height={15.282}
                    viewBox="0 0 16.255 15.282">
                    <Path
                      data-name="Icon awesome-snapchat-ghost"
                      d="M16.218 11.98c-.165.386-.865.67-2.139.867a5.954 5.954 0 00-.207.761.368.368 0 01-.385.282h-.009c-.3 0-.61-.137-1.233-.137a2.513 2.513 0 00-1.786.654 3.576 3.576 0 01-2.35.87 3.646 3.646 0 01-2.314-.87 2.51 2.51 0 00-1.785-.655 11.991 11.991 0 00-1.233.15.377.377 0 01-.394-.287 5.881 5.881 0 00-.207-.766c-.657-.1-2.137-.36-2.175-1.021a.337.337 0 01.282-.351 4.779 4.779 0 003.245-2.729l.008-.016a.722.722 0 00.078-.6c-.16-.378-.853-.513-1.145-.628-.753-.3-.858-.639-.813-.873A.817.817 0 012.7 6.144a1.817 1.817 0 00.748.2.648.648 0 00.316-.069 9.479 9.479 0 01.181-3.682A4.325 4.325 0 017.963.003h.321a4.3 4.3 0 014.023 2.589 9.475 9.475 0 01.181 3.683.622.622 0 00.273.068 1.9 1.9 0 00.7-.2.859.859 0 01.65 0 .659.659 0 01.495.567c.006.309-.271.577-.822.794a3.214 3.214 0 01-.236.08c-.311.1-.781.248-.908.548a.721.721 0 00.078.6l.008.016a4.778 4.778 0 003.246 2.728.346.346 0 01.246.504z"
                      fill="#ffd300"
                    />
                  </Svg>
                </TouchableOpacity>
              </View>

              {isEdit == true ? (
                <TouchableOpacity
                  onPress={() => {
                    setIsBusinessCardModalVisible(true);
                  }}
                  style={{
                    height: 30,
                    width: 50,
                    alignSelf: 'flex-end',
                    borderRadius: 5,
                    marginRight: -5,
                    marginTop: 10,
                  }}>
                  <Feather name="edit" size={30} color={WHITE} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 50,
            paddingTop: 10,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            marginTop: -50,
          }}>
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 30,
            }}>
            <BtnComponent
              placeholder="Announcment"
              onPress={() => {}}
              width={true}
              widthValue="40%"
            /> */}
          <View
            style={{
              alignSelf: 'flex-end',
              marginVertical: 10,
              marginRight: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                // setFavorit(true);
                if (favorit == true) {
                  setFavorit(false);
                  onCardUnSave();
                } else {
                  setFavorit(true);
                  onCardSave();
                }
              }}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={22.295}
                height={19.508}
                viewBox="0 0 22.295 19.508">
                <Path
                  data-name="Icon awesome-heart"
                  d="M20.131 1.334a5.955 5.955 0 00-8.13.592l-.858.884-.858-.884a5.954 5.954 0 00-8.125-.592 6.253 6.253 0 00-.431 9.053l8.426 8.7a1.365 1.365 0 001.973 0l8.426-8.7a6.249 6.249 0 00-.427-9.053z"
                  fill={favorit == true ? 'red' : '#CACFD2'}
                />
              </Svg>
            </TouchableOpacity>
            {/* </View> */}
          </View>
          <View style={{width: '100%', flexWrap: 'wrap', flexDirection: 'row'}}>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
                paddingRight: 20,
              }}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={33.077}
                height={33.076}
                style={{marginRight: 10}}
                viewBox="0 0 33.077 33.076">
                <Path
                  data-name="Icon awesome-globe-africa"
                  d="M16.539.563A16.538 16.538 0 1033.077 17.1 16.538 16.538 0 0016.539.563zm10.67 14.371v.466a1.033 1.033 0 01-.572.924l-1.026.513a1.033 1.033 0 01-1.036-.065l-1.214-.81a1.035 1.035 0 00-.9-.121l-.177.059a1.033 1.033 0 00-.533 1.554l.883 1.324a1.033 1.033 0 00.86.46h.548a1.034 1.034 0 011.034 1.034v.756a1.035 1.035 0 01-.207.62l-1.25 1.666a1.038 1.038 0 00-.189.429l-.287 1.522a1.036 1.036 0 01-.317.571 10.644 10.644 0 00-1.667 1.945l-.869 1.3a1.851 1.851 0 01-3.2-.2 5.262 5.262 0 01-.556-2.353v-1.992a1.034 1.034 0 00-1.029-1.036h-1.726a3.643 3.643 0 01-3.643-3.643v-.938a3.644 3.644 0 011.457-2.914l1.839-1.38a3.645 3.645 0 012.186-.729h.059a3.636 3.636 0 011.629.385l.982.491a1.033 1.033 0 00.789.056l3.155-1.052a1.033 1.033 0 00-.327-2.014h-.673a1.033 1.033 0 01-.731-.3l-.46-.462a1.033 1.033 0 00-.731-.3H13.3a1.034 1.034 0 01-1.034-1.034v-.295a1.034 1.034 0 01.783-1l.964-.241a1.035 1.035 0 00.61-.429l.539-.808a1.033 1.033 0 01.86-.46h1.618A1.034 1.034 0 0018.673 5.4V3.95a13.356 13.356 0 0110.8 9.95h-1.23a1.034 1.034 0 00-1.034 1.033z"
                  transform="translate(0 -.563)"
                  fill="#151269"
                />
              </Svg>
              <View>
                <Text style={{color: PRIMARY, fontSize: 11}}>
                  Company Website
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    color: PRIMARY,
                    fontSize: 13,
                    fontWeight: 'bold',
                    maxWidth: 110,
                  }}>
                  {websiteValue ? websiteValue : 'Website'}
                  {/* {businessData.website != 'null'
                    ? businessData.website
                    : 'website'} */}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={36.753}
                height={33.076}
                style={{marginRight: 10}}
                viewBox="0 0 36.753 33.076">
                <Path
                  data-name="Icon material-business-center"
                  d="M17.7 28.389v-1.838H4.856L4.838 33.9a3.663 3.663 0 003.675 3.675H34.24a3.663 3.663 0 003.675-3.675v-7.35H25.052v1.838zM36.077 11.85h-7.369V8.175L25.033 4.5h-7.35l-3.676 3.675v3.675H6.675A3.686 3.686 0 003 15.525v5.513a3.663 3.663 0 003.675 3.675H17.7v-3.675h7.351v3.675h11.026a3.686 3.686 0 003.675-3.675v-5.513a3.686 3.686 0 00-3.675-3.675zm-11.026 0H17.7V8.175h7.351z"
                  transform="translate(-3 -4.5)"
                  fill="#151269"
                />
              </Svg>
              <View>
                <Text style={{color: PRIMARY, fontSize: 11}}>
                  Business Industry
                </Text>
                <Text
                  style={{color: PRIMARY, fontSize: 13, fontWeight: 'bold'}}>
                  {/* {businessIndustry ? businessIndustry : 'Not Specified'} */}
                  {businessIndustry
                    ? businessIndustry.name
                      ? businessIndustry.name
                      : 'Not specified'
                    : 'Not specified'}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
                paddingRight: 20,
              }}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={32.812}
                height={32.811}
                style={{marginRight: 10}}
                viewBox="0 0 32.812 32.811">
                <Path
                  data-name="Icon ionic-ios-call"
                  d="M30.973 25.143a25.963 25.963 0 00-5.424-3.629c-1.625-.781-2.221-.764-3.372.064-.958.692-1.577 1.336-2.68 1.094s-3.275-1.883-5.383-3.983-3.75-4.281-3.983-5.383.41-1.722 1.094-2.68c.829-1.151.853-1.746.064-3.372a25.45 25.45 0 00-3.624-5.418C6.479.653 6.213.91 5.565 1.143a11.951 11.951 0 00-1.927 1.023 5.8 5.8 0 00-2.309 2.438c-.459.99-.99 2.833 1.714 7.645a42.656 42.656 0 007.5 10h0l.008.008.008.008h0a42.823 42.823 0 0010 7.5c4.812 2.7 6.655 2.173 7.645 1.714a5.7 5.7 0 002.438-2.309 11.951 11.951 0 001.023-1.922c.234-.652.5-.917-.692-2.105z"
                  fill="#151269"
                  stroke="#151269"
                  strokeWidth={2}
                />
              </Svg>
              <View>
                <Text style={{color: PRIMARY, fontSize: 11}}>Contact</Text>
                <Text
                  style={{color: PRIMARY, fontSize: 13, fontWeight: 'bold'}}>
                  {businessData.phoneNo}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={31.474}
                height={31.474}
                style={{marginRight: 10}}
                viewBox="0 0 31.474 31.474">
                <Path
                  data-name="Icon awesome-location-arrow"
                  d="M27.326.216L1.767 12.013a2.98 2.98 0 001.18 5.7H13.76v10.815a2.98 2.98 0 005.7 1.18l11.8-25.559A3.067 3.067 0 0027.326.216z"
                  fill="#151269"
                />
              </Svg>
              <View>
                <Text style={{color: PRIMARY, fontSize: 11}}>
                  Company Address
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    color: PRIMARY,
                    fontSize: 13,
                    fontWeight: 'bold',
                    maxWidth: 130,
                  }}>
                  {businessData.address}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: PRIMARY,
                  fontSize: 22,
                  fontWeight: 'bold',
                }}>
                Category
              </Text>
              {isEdit ? (
                <TouchableOpacity
                  onPress={() => {
                    setisAddCategoryModelVisible(true);
                  }}>
                  <Ionicons
                    name="add-circle-sharp"
                    size={26}
                    color={PRIMARY}
                    style={{marginTop: 3, marginLeft: 10}}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            {!isNullOrEmptyArray(categoryLength) && isEdit == true ? (
              // <View style={{flexDirection: 'row'}}>

              <TouchableOpacity
                onPress={() => {
                  setIsEditDelCategoryModalVisible(true);
                }}
                style={{
                  height: 30,
                  width: 50,
                  alignSelf: 'flex-end',
                  borderRadius: 5,
                  marginRight: -5,
                  marginTop: 5,
                }}>
                <Feather name="edit" size={22} color={SECONDARY} />
              </TouchableOpacity>
            ) : // </View>
            null}

            {isEditDelCategoryModalVisible ? (
              <BusinessEditCategoryModal
                setModalVisible={setIsEditDelCategoryModalVisible}
                modalVisible={isEditDelCategoryModalVisible}
                businessData={businessData}
                isEdit={isEdit}
                setEditCategory={setEditCategory}
                editCategory={editCategory}
                selectedCategory={selectedCategory}
                categoryId={CategoryObject}
                BusinessCardId={businessCardId}
                setRefresh={setRefresh}
              />
            ) : null}

            {isAddCategoryModelVisible ? (
              <EditBusinessAddCategoryModal
                setModalVisible={setisAddCategoryModelVisible}
                modalVisible={isAddCategoryModelVisible}
                BusinessCardId={ID}
                setRefresh={setRefresh}
                // businessData={businessData}
                // isEdit={isEdit}
                // setEditCategory={setEditCategory}
                // editCategory={editCategory}
              />
            ) : null}

            {isProductModalVisible ? (
              <AddorEditProductModal
                selectedCategory={selectedCategory}
                selectedCategoryID={selectedCategoryID}
                visibleModal={isProductModalVisible}
                setModalVisible={setIsProductModalVisible}
                editProduct={editProduct}
                editCategory={editCategory}
                category={businessData.businessCategory}
                userData={businessData}
                isEdit={edit}
                setIsEdit={setEdit}
                setRefresh={setRefresh}
              />
            ) : null}
          </View>

          <FlatList
            style={{marginBottom: 40, marginTop: 20}}
            data={businessData.businessCategory}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <CategoryFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setSelectedCategoryID={setSelectedCategoryID}
                setCategoryWiseData={setCategoryWiseData}
                item={item}
                setCategoryId={setCategoryObject}
                setBusinessCardIdFk={setBusinessCardId}
              />
            )}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: PRIMARY,
                  fontSize: 22,
                  fontWeight: 'bold',
                }}>
                Product
              </Text>
              {isEdit ? (
                <TouchableOpacity
                  onPress={() => {
                    setIsProductModalVisible(true);
                    setEditProduct('');
                    setEdit(false);
                  }}>
                  <Ionicons
                    name="add-circle-sharp"
                    size={26}
                    color={PRIMARY}
                    style={{marginTop: 3, marginLeft: 10}}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            {/* {categoryWiseData.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  setEdit(false);
                  setIsProductModalVisible(true);
                }}
                style={{
                  height: 30,
                  width: 50,
                  alignSelf: 'flex-end',
                  borderRadius: 5,
                  marginRight: -5,
                  marginTop: 5,
                }}>
                <Feather name="edit" size={22} color={SECONDARY} />
              </TouchableOpacity>
            ) : null} */}
          </View>

          <FlatList
            // data={item.businessCategoryProduct}
            data={categoryWiseData}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              // console.log('categoryWiseData', item)
              <ProductCard
                item={item}
                index={index}
                selectedCategory={selectedCategory}
                // selectedCategoryID={selectedCategoryID}
                isEdit={isEdit}
                setIsProductModalVisible={setIsProductModalVisible}
                setEditProduct={setEditProduct}
                setEdit={setEdit}
                setRefresh={setRefresh}
                onPress={() => {
                  setEdit(true);
                  setEditProduct(item);
                  setIsProductModalVisible(true);
                }}
              />
            )}
          />

          <View
            style={{
              width: '100%',
              marginVertical: 50,
              alignItems: 'center',
            }}>
            {/* <QRCode
              value={QRCODE_URL}
              logoSize={50}
              logoBackgroundColor="transparent"
              color={SECONDARY}
            /> */}
          </View>
          <BtnComponent placeholder="Block" onPress={() => {}} />
        </View>
        <EditBusinessCardModal
          modalVisible={isBusinessCardModalVisible}
          setModalVisible={setIsBusinessCardModalVisible}
          isEdit={isEdit}
          bCardData={businessData}
          industryType={industryType}
          props={props}
          setRefresh={setRefresh}
          websiteID={websiteID}
          twitterID={twitterID}
          instaID={instaID}
          youtubeID={youtubeID}
          facebookID={facebookID}
        />
      </ScrollView>
      {isLoading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default BusinessScreen;

function CategoryFilter({
  selectedCategory,
  item,
  setSelectedCategory,
  setCategoryWiseData,
  setCategoryId,
  setBusinessCardIdFk,
  setSelectedCategoryID,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        setCategoryWiseData(item.businessCategoryProduct);
        setBusinessCardIdFk(item.businessCardIdFk);
        setCategoryId(item.id);
        setSelectedCategory(item.name);
        setSelectedCategoryID(item.id);
      }}
      style={{
        backgroundColor: selectedCategory === item.name ? PRIMARY : FIFTH,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 10,
        marginRight: 10,
      }}>
      <Text
        style={{
          color: selectedCategory === item.name ? '#ffffff' : PRIMARY,
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}
