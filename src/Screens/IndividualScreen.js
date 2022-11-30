import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {SECONDARY, FORTH, WHITE, PRIMARY, GREY} from '../Constants/Colors';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import Svg, {Path} from 'react-native-svg';
import {Height, QRCODE_URL, URL, Width} from '../Constants/Constants';
import _ from 'lodash';
import QRCode from 'react-native-qrcode-svg';
import {
  getPersonalCardByIdApiCall,
  getPersonalCardByUserIdApiCall,
  personalCardApiCall,
  GetAllLookupDetailApiCall,
  saveCardAPiCall,
  deleteSavedCardApiCall,
  connectionRequestApiCall,
} from '../Apis/Repo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ContactDetails} from './ContactDetails';
import {Education} from './Education';
import {JobHistory} from './JobHistory';
import {PersonalDetails} from './PersonalDetails';
import {Skills} from './Skills';
import {EducationModal} from './EducationModal';
import {JobHistoryModal} from './JobHistoryModal';
import {SkillModal} from './SkillModal';
import {ContactModal} from './ContactModal';
import {PersonalModal} from './PersonalModal';
import {JobHistoryEditModalAdd} from './JobHistoryEditModalAdd';
import {EducationEditModalAdd} from './EducationEditModalAdd';
import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../Components/Loader';
import CryptoJS from 'react-native-crypto-js';
import {isNullOrEmpty, isNullOrEmptyArray} from '../Constants/TextUtils';
import {useSelector} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';

export default function IndividualScreen(props) {
  // console.log('***************************************', props);
  const [isEducationModalVisible, setIsEducationModalVisible] = useState(false);
  const [isJobHistoryModalVisible, setIsJobHistoryModalVisible] =
    useState(false);
  const [isSkillModalVisible, setIsSkillModalVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [isPersonalModalVisible, setIsPersonalModalVisible] = useState(false);
  const [isJobHistoryEditModalAdd, setIsJobHistoryEditModalAdd] =
    useState(false);
  const [isEducationEditModalAdd, setIsEducationEditModalAdd] = useState(false);
  let [userData, setUserData] = useState(null);
  let [data, setdata] = useState('');
  const [favorit, setFavorit] = useState(false);
  const [ID, setID] = useState(
    props.route.params.id ? props.route.params.id : '',
  );
  const [scanById, setCardByUserId] = useState(
    props.route.params.param ? props.route.params.param : '',
  );
  const [Edit, setEdit] = useState(
    props.route.params.edit ? props.route.params.edit : '',
  );
  const [add, setAdd] = useState(false);
  let [editSkillsArray, setEditSkillsArray] = useState([]);
  let [jobIndex, setJobIndex] = useState('');
  let [eduIndex, setEduIndex] = useState('');
  let [proImage, setProImage] = useState('');
  let [bgImage, setBgImage] = useState('');
  let [imageName, setImageName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let [industryType, setIndustryType] = useState([]);
  let [employeeType, setEmployeeType] = useState([]);
  let [degreeList, setDegreList] = useState([]);
  let [lookupData, setLookupData] = useState([]);
  const [isSaved, setIsSaved] = useState('');
  const [connect, setConnect] = useState(false);
  let connectionID = props.route.params.connect;
  let [individualSkillArray, setIndividualSkillArray] = useState(arrayskills);
  const [stop, setStop] = useState(false);
  console.log('degreeList', degreeList);
  var date = new Date();

  let DATA = useSelector(state => state.UserData);
  // console.log('Header dispatch DATA', DATA);
  let ciphertext = CryptoJS.AES.encrypt(
    date.getTime() +
      '_' +
      JSON.stringify(ID) +
      '_' +
      date.getTime() +
      '|' +
      'crd',
    'secret key 123',
  ).toString();

  // console.log('favorit', favorit);

  let arrayOccupation;
  arrayOccupation = _.find(data.personalCardMeta, {personalKey: 'occupation'});
  if (arrayOccupation) {
    arrayOccupation = arrayOccupation.personalValue;
  } else {
    arrayOccupation = 'Dummy occupation';
  }

  let arraycity;
  arraycity = _.find(data.personalCardMeta, {personalKey: 'city'});
  if (arraycity) {
    arraycity = arraycity.personalValue;
  } else {
    arraycity = 'Dummy city';
  }

  let arraycountry;
  arraycountry = _.find(data.personalCardMeta, {personalKey: 'country'});
  if (arraycountry) {
    arraycountry = arraycountry.personalValue;
  } else {
    arraycountry = 'Dummy country';
  }

  let arrayskills = [];
  arrayskills = _.find(data.personalCardMeta, {personalKey: 'Skills'});
  if (arrayskills) {
    arrayskills = arrayskills.personalValue;
  } else {
    arrayskills = [];
  }

  {
    if (stop == false) {
      if (!isNullOrEmpty(arrayskills)) {
        setIndividualSkillArray(arrayskills);
        setStop(true);
      }
    }
  }

  let arrayeducation = [];
  arrayeducation = _.find(data.personalCardMeta, {personalKey: 'Education'});
  if (arrayeducation) {
    arrayeducation = arrayeducation.personalValue;
  } else {
    arrayeducation = [];
  }

  let arrayjobhistory = [];
  arrayjobhistory = _.find(data.personalCardMeta, {personalKey: 'JobHistory'});
  if (arrayjobhistory) {
    arrayjobhistory = arrayjobhistory.personalValue;
  } else {
    arrayjobhistory = [];
  }

  let arrayhobbies = [];
  arrayhobbies = _.find(data.personalCardMeta, {personalKey: 'Hobbies'});
  if (arrayhobbies) {
    arrayhobbies = arrayhobbies.personalValue;
  } else {
    arrayhobbies = 'Dummy hobbies';
  }

  let arrayinterest = [];
  arrayinterest = _.find(data.personalCardMeta, {personalKey: 'Interests'});
  if (arrayinterest) {
    arrayinterest = arrayinterest.personalValue;
  } else {
    arrayinterest = 'Dummy Interests';
  }

  let arrayachievment = [];
  arrayachievment = _.find(data.personalCardMeta, {
    personalKey: 'Achievements',
  });
  if (arrayachievment) {
    arrayachievment = arrayachievment.personalValue;
  } else {
    arrayachievment = 'Dummy Achievements';
  }

  let arrayIntro = [];
  arrayIntro = _.find(data.personalCardMeta, {
    personalKey: 'Introductory Message',
  });
  if (arrayIntro) {
    arrayIntro = arrayIntro.personalValue;
  } else {
    arrayIntro = 'Dummy Introduction';
  }

  let arraybirthday = [];
  arraybirthday = _.find(data.personalCardMeta, {personalKey: 'birthday'});
  if (arraybirthday) {
    arraybirthday = arraybirthday.personalValue;
  } else {
    arraybirthday = 'Dummy Birthday';
  }

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
      if (isNullOrEmptyArray(lookupData)) {
        getAllLookupdetail();
      }
    });
  }, []);

  useEffect(() => {
    getData();
    setStop(false);
    if (isSaved == 1) {
      setFavorit(true);
    } else if (isSaved == 0) {
      setFavorit(false);
    }
  }, [
    isSkillModalVisible,
    isEducationEditModalAdd,
    isJobHistoryEditModalAdd,
    isContactModalVisible,
    isPersonalModalVisible,
    isSaved,
    connect,
  ]);

  const getData = () => {
    let check = CryptoJS.AES.decrypt(scanById, 'secret key 123');
    let decryptedData = check.toString(CryptoJS.enc.Utf8);
    var scName = decryptedData.split('|')[1];
    console.log('sapna sapna sapna', scName);

    if (!isNullOrEmpty(ID)) {
      setIsLoading(true);
      // console.log('ID', ID);
      // console.log('DATA.id', DATA.id);
      getPersonalCardByIdApiCall(ID, DATA.id)
        .then(async res => {
          if (res.data.success) {
            setdata((data = res.data.result));
            setIsSaved(data.isSaved);
            console.log('pasha bhai *********', data);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            alert('No record found.');
          }
        })
        .catch(err => {
          setIsLoading(false);
          console.log('err', err);
        });
    } else if (scName == 'crd') {
      // debugger;
      let bytes = CryptoJS.AES.decrypt(scanById, 'secret key 123');
      let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      var id = decryptedData.split('_')[1];
      console.log('here is id ', id);

      setIsLoading(true);
      getPersonalCardByIdApiCall(id, 0)
        .then(res => {
          // console.log('res', res);
          if (res.data.success) {
            setdata((data = res.data.result));
            setIsLoading(false);
            console.log('card data', data);
          } else {
            setIsLoading(false);
            alert('No record found.');
          }
        })
        .catch(err => {
          setIsLoading(false);
          console.log('err', err);
        });
    } else if (scName == 'qr') {
      // debugger;
      let bytes = CryptoJS.AES.decrypt(scanById, 'secret key 123');
      let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      var id = decryptedData.split('_')[1];
      console.log('here is id ', id);

      setIsLoading(true);
      getPersonalCardByUserIdApiCall(id)
        .then(res => {
          // console.log('res', res.data.result);
          if (res.data.success) {
            setdata((data = res.data.result));
            setIsLoading(false);
            console.log('card data', data);
          } else {
            setIsLoading(false);
            alert('No record found.');
          }
        })
        .catch(err => {
          setIsLoading(false);
          console.log('err', err);
        });
    }
  };

  const getAllLookupdetail = () => {
    setIsLoading(true);
    GetAllLookupDetailApiCall()
      .then(res => {
        setLookupData((lookupData = res.data.result));
        // console.log('lookupData', lookupData);
        setIsLoading(false);

        for (let index = 0; index < lookupData.length; index++) {
          const element = lookupData[index];
          if (element.lookupId == 3) {
            let arraydegree = degreeList;
            arraydegree.push(element);
            if (isNullOrEmptyArray(degreeList)) {
              setDegreList((degreeList = arraydegree));
            }
          } else if (element.lookupId == 8) {
            let arrayEmpType = employeeType;
            arrayEmpType.push(element);
            if (isNullOrEmptyArray(employeeType)) {
              setEmployeeType((employeeType = arrayEmpType));
            }
          } else if (element.lookupId == 9) {
            let arrayIndustryType = industryType;
            arrayIndustryType.push(element);
            if (isNullOrEmptyArray(industryType)) {
              setIndustryType((industryType = arrayIndustryType));
            }
          }
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const onSelectImage = () => {
    var formdata = new FormData();
    formdata.append('Name', data.name);
    formdata.append('Email', data.email);
    formdata.append('UserId', JSON.stringify(data.userId));
    formdata.append('id', JSON.stringify(data.id));
    formdata.append('PhoneNo', data.phoneNo);
    formdata.append('Address', data.address);

    {
      proImage
        ? formdata.append('profile_image_file', {
            uri: proImage.path,
            name: imageName,
            type: proImage.mime,
          })
        : formdata.append('profile_image_file', data.profilePicture);
    }

    formdata.append('PersonalCardMeta', '[]');

    // console.log('formdata', formdata);

    {
      bgImage
        ? formdata.append('cover_image_image', {
            uri: bgImage.path,
            name: imageName,
            type: bgImage.mime,
          })
        : formdata.append('cover_image_image', data.coverPicture);
    }

    setIsLoading(true);
    personalCardApiCall(formdata)
      .then(res => res.JSON())
      .then(data => {
        console.log('response', data);
        if (data.status === 200 && data.success === true) {
          getPersonalCardByIdApiCall();
          setIsLoading(false);
          alert('picture updated successfully');
        } else {
          setIsLoading(false);
          alert('alert');
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
      CardType: false,
      PersonalCardId: data.id,
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
      CardType: 0,
      CardId: data.id,
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

  const onConnect = () => {
    let obj = {
      Id: 0,
      User1Id: DATA.id,
      User2Id: data.userId,
      Status: 1,
    };

    setIsLoading(true);
    connectionRequestApiCall(obj)
      .then(res => {
        console.log('res', res);
        setConnect(true);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  return (
    <SafeAreaView style={{height: Height, width: Width}}>
      <ScrollView style={{flex: 1, backgroundColor: WHITE}}>
        <ImageBackground
          source={
            !isNullOrEmpty(data.coverPicture)
              ? {uri: URL.concat(data.coverPicture)}
              : require('../Assets/registerbg.png')
          }
          style={{
            width: '100%',
            height: 300,
            // backgroundColor: '#F0F0F0',
          }}>
          <Header
            navigation={props.navigation}
            variant="user"
            onPress={() => {
              props.navigation.navigate('Dashboard');
            }}
          />

          {Edit == true ? (
            <TouchableOpacity
              style={{
                padding: 3,
                borderRadius: 5,
                marginTop: 190,
                marginRight: 15,
                backgroundColor: PRIMARY,
                alignSelf: 'flex-end',
              }}
              onPress={() => {
                ImagePicker.openPicker({
                  width: 300,
                  height: 400,
                  cropping: true,
                }).then(image => {
                  console.log('image', image);
                  var imageMime = image.mime;
                  var name = imageMime.split('/')[1];
                  setImageName((imageName = 'Vinvi.' + name));
                  setBgImage((bgImage = image));
                  onSelectImage();
                });
              }}>
              <Feather name="edit" color={'white'} size={22} />
              {/* <Image
                source={require('../Assets/editProf.png')}
                style={{height: 22, width: 22}}
              /> */}
            </TouchableOpacity>
          ) : null}
        </ImageBackground>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            // alignItems: 'flex-end',
            // justifyContent: 'center',
            width: '100%',
            position: 'absolute',
            top: 250,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                marginLeft: 10,
                // backgroundColor: '#E0E0E0',
                width: 80,
                height: 80,
                borderRadius: 80,
                marginTop: 20,
              }}>
              <Image
                source={
                  data
                    ? !isNullOrEmpty(data.profilePicture)
                      ? {uri: URL.concat(data.profilePicture)}
                      : require('../Assets/profilePic.png')
                    : require('../Assets/profilePic.png')
                }
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                  logoBackgroundColor: GREY,
                }}
              />
            </View>
            {Edit == true ? (
              <TouchableOpacity
                style={{
                  padding: 3,
                  marginTop: 75,
                  marginLeft: -28,
                  height: 25,
                  width: 22,
                  borderRadius: 4,
                  backgroundColor: PRIMARY,
                }}
                onPress={() => {
                  ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                  }).then(image => {
                    console.log('image', image);
                    var imageMime = image.mime;
                    var name = imageMime.split('/')[1];
                    setImageName((imageName = 'Vinvi.' + name));
                    setProImage((proImage = image));
                    onSelectImage();
                  });
                }}>
                <Feather
                  name="edit"
                  color={'white'}
                  size={15}
                  style={{alignSelf: 'center'}}
                />
                {/* <Image
                  source={require('../Assets/editProf.png')}
                  style={{height: 22, width: 22}}
                /> */}
              </TouchableOpacity>
            ) : null}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 50,
              width: '70%',
            }}>
            <View
              style={{
                paddingHorizontal: 10,
                // marginBottom: 20,
              }}>
              <Text
                numberOfLines={2}
                style={{
                  color: SECONDARY,
                  fontSize: 18,
                  width: 200,
                }}>
                {data.name}
              </Text>

              <Text style={{fontSize: 14, color: FORTH}}>
                {arrayOccupation}
              </Text>
            </View>
            <View style={{marginTop: 5}}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  // setFavorit(true);
                  if (favorit == true) {
                    setFavorit(false);
                    onCardUnSave();
                  } else {
                    setFavorit(true);
                    console.log('what 1');
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
            </View>
          </View>
        </View>
        <View style={{marginTop: 70, paddingHorizontal: 20, paddingBottom: 50}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 50,
                marginRight: 10,
                maxWidth: '45%',
              }}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={8.248}
                height={15.401}
                viewBox="0 0 8.248 15.401">
                <Path
                  data-name="Icon awesome-facebook-f"
                  d="M7.708 8.663l.428-2.787H5.462V4.067a1.394 1.394 0 011.571-1.506h1.216V.188A14.826 14.826 0 006.091 0a3.4 3.4 0 00-3.642 3.751v2.125H0v2.787h2.449V15.4h3.013V8.663z"
                  fill="#066aff"
                />
              </Svg>
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
            </View>
            {data.userId == DATA.id ? null : data.isConnected == 3 ? (
              <BtnComponent
                placeholder="Connect"
                onPress={() => {
                  onConnect();
                  // props.navigation.navigate('Messages');
                }}
                width={true}
                widthValue="40%"
              />
            ) : data.isConnected == 1 ? (
              <View
                style={{
                  height: 50,
                  width: '40%',
                  backgroundColor: SECONDARY,
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{color: WHITE, fontSize: 14}}>Requested</Text>
              </View>
            ) : data.isConnected == 0 ? (
              <BtnComponent
                placeholder="Message"
                onPress={() => {
                  props.navigation.navigate('Messages', {
                    data: data,
                    connect: connectionID,
                  });
                }}
                width={true}
                widthValue="40%"
              />
            ) : data.isConnected == 0 ? (
              <View
                style={{
                  height: 50,
                  width: '40%',
                  backgroundColor: SECONDARY,
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{color: WHITE, fontSize: 14}}>Rejected</Text>
              </View>
            ) : (
              <BtnComponent
                placeholder="Connect"
                onPress={() => {
                  onConnect();
                  // props.navigation.navigate('Messages');
                }}
                width={true}
                widthValue="40%"
              />
            )}
          </View>
          <Text
            style={{
              color: SECONDARY,
              fontSize: 14,
              textAlign: 'center',
              marginBottom: 20,
            }}>
            {arrayIntro}
          </Text>

          {/* Screen View Handling from these components start */}

          <PersonalDetails
            setIsEdit={setIsPersonalModalVisible}
            arrayhobbies={arrayhobbies}
            arrayinterest={arrayinterest}
            arrayachievment={arrayachievment}
            arraybirthday={arraybirthday}
            edit={Edit ? Edit : false}
          />

          <ContactDetails
            data={data}
            arraycountry={arraycountry}
            arraycity={arraycity}
            setEdit={setIsContactModalVisible}
            edit={Edit ? Edit : false}
          />
          <Education
            setEdit={setIsEducationModalVisible}
            setEduIndex={setEduIndex}
            arrayeducation={arrayeducation}
            edit={Edit ? Edit : false}
            setAdd={setIsEducationEditModalAdd}
            UserData={data}
          />
          <JobHistory
            setEdit={setIsJobHistoryModalVisible}
            setJobIndex={setJobIndex}
            arrayjobhistory={arrayjobhistory}
            edit={Edit ? Edit : false}
            setAdd={setIsJobHistoryEditModalAdd}
            UserData={data}
          />
          <Skills
            arrskills={arrayskills}
            editSkillsArray={editSkillsArray}
            setEdit={setIsSkillModalVisible}
            edit={Edit ? Edit : false}
          />

          {/* Screen View Handling from these components end */}

          <View
            style={{width: '100%', marginVertical: 70, alignItems: 'center'}}>
            <QRCode
              value={ciphertext}
              logoSize={30}
              logoBackgroundColor="transparent"
              color={SECONDARY}
            />
          </View>
          <BtnComponent placeholder="Block" onPress={() => {}} />
        </View>
        {isLoading ? <Loader /> : null}
      </ScrollView>

      {/* Edit Profile Handling componants start */}

      <EducationModal
        isEdit
        modalVisible={isEducationModalVisible}
        setModalVisible={setIsEducationModalVisible}
        educationarray={arrayeducation}
        degreeData={degreeList}
        index={eduIndex}
        CardData={data}
      />
      <JobHistoryModal
        isEdit
        modalVisible={isJobHistoryModalVisible}
        setModalVisible={setIsJobHistoryModalVisible}
        jobhistoryarray={arrayjobhistory}
        industryType={industryType}
        employeeType={employeeType}
        index={jobIndex}
        CardData={data}
      />
      <SkillModal
        isEdit
        modalVisible={isSkillModalVisible}
        setModalVisible={setIsSkillModalVisible}
        skillarr={individualSkillArray}
        setSkillArr={setIndividualSkillArray}
        CardData={data}
        setEditModalSkill={setEditSkillsArray}
      />
      <ContactModal
        isEdit
        modalVisible={isContactModalVisible}
        setModalVisible={setIsContactModalVisible}
        CardData={data}
        countryarray={arraycountry}
        cityarray={arraycity}
      />
      <PersonalModal
        isEdit
        modalVisible={isPersonalModalVisible}
        setModalVisible={setIsPersonalModalVisible}
        hobbiesarray={arrayhobbies}
        interestarray={arrayinterest}
        achievmentarray={arrayachievment}
        birthdayarray={arraybirthday}
        CardData={data}
      />
      <JobHistoryEditModalAdd
        modalVisible={isJobHistoryEditModalAdd}
        setModalVisible={setIsJobHistoryEditModalAdd}
        jobhistoryarray={arrayjobhistory}
        industryType={industryType}
        employeeType={employeeType}
        CardData={data}
      />

      <EducationEditModalAdd
        modalVisible={isEducationEditModalAdd}
        setModalVisible={setIsEducationEditModalAdd}
        educationarray={arrayeducation}
        degreeData={degreeList}
        CardData={data}
      />

      {/* Edit Profile Handling componants end */}
    </SafeAreaView>
  );
}
