import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import OutlinedInputBox from '../Components/OutlinedInputBox';
import NewCardStepPanel from '../Components/NewCardStepPanel';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Height, Width} from '../Constants/Constants';
import {isNullOrEmpty, isNullOrEmptyArray} from '../Constants/TextUtils';
import {personalCardApiCall, GetAllLookupDetailApiCall} from '../Apis/Repo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CREDIANTIAL_ERROR,
  EMPTY_ACHIVEMENT,
  EMPTY_EDUCATION,
  EMPTY_HOBBIES,
  EMPTY_INTERESTS,
  EMPTY_JOBHISTORY,
  EMPTY_MESSAGE,
  EMPTY_PERSONALINFO,
  EMPTY_PORTFOLIO,
  EMPTY_QRCODE,
  EMPTY_SKILLS,
} from '../Constants/Strings';
import {JobHistoryCard} from './JobHistoryCard';
import {EducationCard} from './EducationCard.1';
import {SkillCard} from './SkillCard';
import {EducationModal} from './EducationModal';
import {SkillModal} from './SkillModal';
import {JobHistoryModal} from './JobHistoryModal';
import {FlatList} from 'react-native-gesture-handler';
import {PRIMARY, TEXT_COLOR, WHITE} from '../Constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {PCDComplete} from '../../Store/Action';
import {PCScreen2Data} from '../../Store/Action';
import Loader from '../Components/Loader';

export default function NewCardScreen(props) {
  const dispatch = useDispatch();
  const PCScreen1 = useSelector(state => state.PCData);
  const PCScreen2 = useSelector(state => state.PCScreen2Data);
  // console.log('PERSONAL_CARD_3_DATA_TEST', PCScreen1);
  // console.log('PERSONAL_CARD_2_DATA_TEST', PCScreen2);

  const [isEducationModalVisible, setIsEducationModalVisible] = useState(false);
  const [isJobHistoryModalVisible, setIsJobHistoryModalVisible] =
    useState(false);
  const [isSkillModalVisible, setIsSkillModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [qrCode, setQRcode] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [interests, setInterests] = useState('');
  const [achivements, setAchivements] = useState('');
  let [skillsArray, setSkillsArray] = useState([]);
  let [modalSkill, setModalSkill] = useState([]);
  const [profilePic, setProfilePic] = useState(PCScreen1.ProfilePicture);
  const [profilePicName, setProfilePicName] = useState(PCScreen1.profileName);
  const [coverPic, setCoverPic] = useState(PCScreen1.CoverPicture);
  const [coverName, setCoverName] = useState(PCScreen1.coverName);
  let [educationArray, setEducationArray] = useState([]);
  let [educationObject, setEducationObject] = useState('');
  const [jobHistoryArray, setJobHistoryArray] = useState([]);
  let [jobHistoryObject, setJobHistoryObject] = useState('');
  let [userData, setUserData] = useState(null);
  const newArray1 = PCScreen1.PersonalcardScreen1Array;
  const personalScreen2Array = PCScreen2.PersonalcardScreen2Array;
  let [industryType, setIndustryType] = useState([]);
  let [employeeType, setEmployeeType] = useState([]);
  let [degreeList, setDegreList] = useState([]);
  let [lookupData, setLookupData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const PersonalcardScreen4Array = [
    {
      key: 'Introductory Message',
      value: message.trim(),
    },
    // {
    //   key: 'QR Code',
    //   value: qrCode.trim(),
    // },
    {
      key: 'Hobbies',
      value: hobbies.trim(),
    },
    {
      key: 'Education',
      value: JSON.stringify(educationArray),
    },
    {
      key: 'Interests',
      value: interests.trim(),
    },
    {
      key: 'Achievements',
      value: achivements.trim(),
    },
    {
      key: 'Skills',
      value: JSON.stringify(skillsArray),
    },
    {
      key: 'JobHistory',
      value: JSON.stringify(jobHistoryArray),
    },
  ];
  // console.log('educationObject', educationObject);

  const FunSkillsArray = () => {
    setSkillsArray((skillsArray = modalSkill));
  };

  const FunEducationArray = () => {
    let newEducationArray = educationArray;
    newEducationArray.push(educationObject);
    setEducationArray([]);
    setEducationArray((educationArray = newEducationArray));
    console.log('educationArray', educationArray);
  };

  const FunDelEducation = indx => {
    // debugger;
    console.log('FunDelEducation Index', indx);
    let afterDelete = educationArray.filter((Sitem, index) => index != indx);
    setEducationArray((educationArray = afterDelete));
  };

  const FunDelJobHistory = indx => {
    setJobHistoryArray(jobHistoryArray.filter((x, index) => index !== indx));
  };

  const FunJobHistoryArray = () => {
    let newJobHistoryArray = jobHistoryArray;
    newJobHistoryArray.push(jobHistoryObject);
    setJobHistoryArray([]);
    setJobHistoryArray(newJobHistoryArray);
  };

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
      // getAllLookupdetail();
    });
  }, []);

  useEffect(() => {
    if (isNullOrEmptyArray(lookupData)) {
      getAllLookupdetail();
    }
  }, []);

  const getAllLookupdetail = () => {
    setIsLoading(true);
    GetAllLookupDetailApiCall()
      .then(res => {
        setLookupData((lookupData = res.data.result));
        console.log('lookupData', lookupData);
        setIsLoading(false);

        for (let index = 0; index < lookupData.length; index++) {
          const element = lookupData[index];
          if (element.lookupId == 3) {
            let arraydegree = degreeList;
            arraydegree.push(element);
            setDegreList((degreeList = arraydegree));
          } else if (element.lookupId == 8) {
            let arrayEmpType = employeeType;
            arrayEmpType.push(element);
            setEmployeeType((employeeType = arrayEmpType));
          } else if (element.lookupId == 9) {
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

  const onFinish = () => {
    if (isNullOrEmpty(message)) {
      alert("Introduction can't be empty");
    }
    //  else if (isNullOrEmpty(qrCode)) {
    //   alert(EMPTY_QRCODE);
    // }
    else if (isNullOrEmpty(hobbies)) {
      alert(EMPTY_HOBBIES);
    } else if (isNullOrEmpty(educationArray)) {
      alert(EMPTY_EDUCATION);
    } else if (isNullOrEmpty(interests)) {
      alert(EMPTY_INTERESTS);
    } else if (isNullOrEmpty(achivements)) {
      alert(EMPTY_ACHIVEMENT);
    }
    // else if (isNullOrEmpty(personalinfo)) {
    //   alert(EMPTY_PERSONALINFO);
    // }
    else if (isNullOrEmpty(skillsArray)) {
      alert(EMPTY_SKILLS);
    }
    // else if (isNullOrEmpty(portfolio)) {
    //   alert(EMPTY_PORTFOLIO);
    // }
    else if (isNullOrEmpty(jobHistoryArray)) {
      alert(EMPTY_JOBHISTORY);
    } else {
      let PersonalCardMeta = [];
      for (let index = 0; index < newArray1.length; index++) {
        const element = newArray1[index];
        let newObject = {
          PersonalKey: element.PersonalKey,
          PersonalValue: element.PersonalValue.trim(),
          Ishidden: true,
        };
        PersonalCardMeta.push(newObject);
      }

      for (let index = 0; index < personalScreen2Array.length; index++) {
        const element = personalScreen2Array[index];
        let newObject1 = {
          PersonalKey: element.PersonalKey,
          PersonalValue: element.PersonalValue.trim(),
          Ishidden: true,
        };
        PersonalCardMeta.push(newObject1);
      }

      for (let index = 0; index < PersonalcardScreen4Array.length; index++) {
        const element1 = PersonalcardScreen4Array[index];
        let newObject2 = {
          PersonalKey: element1.key,
          PersonalValue: element1.value.trim(),
          Ishidden: true,
        };
        PersonalCardMeta.push(newObject2);
      }

      var formdata = new FormData();
      formdata.append('Name', PCScreen1.Name);
      formdata.append('Email', PCScreen1.Email);
      formdata.append('UserId', JSON.stringify(userData.id));
      formdata.append('PhoneNo', PCScreen1.PhoneNo);
      formdata.append('Address', PCScreen1.Address);
      for (let index = 0; index < PersonalCardMeta.length; index++) {
        const element = PersonalCardMeta[index];
        formdata.append(
          `PersonalCardMeta[${index}][PersonalKey]`,
          element.PersonalKey,
        );
        formdata.append(
          `PersonalCardMeta[${index}][PersonalValue]`,
          element.PersonalValue,
        );
        formdata.append(
          `PersonalCardMeta[${index}][Ishidden]`,
          element.Ishidden,
        );
      }

      {
        profilePic
          ? formdata.append('profile_image_file', {
              uri: profilePic.path,
              name: profilePicName,
              type: profilePic.mime,
            })
          : formdata.append('profile_image_file', null);
      }

      {
        coverPic
          ? formdata.append('cover_image_image', {
              uri: coverPic.path,
              name: coverName,
              type: coverPic.mime,
            })
          : formdata.append('cover_image_image', null);
      }

      console.log('formdata', formdata);

      setIsLoading(true);
      personalCardApiCall(formdata)
        .then(res => res.json())
        .then(data => {
          console.log('response', data);
          if (data.status === 200 && data.success === true) {
            setIsLoading(false);
            dispatch(PCDComplete(''));
            props.navigation.navigate('MyCardsDashboardScreen');
            // props.navigation.reset({
            //   index: 0,
            //   routes: [{name: 'MyCardsDashboardScreen'}],
            // });
          } else {
            setIsLoading(false);
            alert(data.message);
          }
        })
        .catch(err => {
          setIsLoading(false);
          console.log('err', err);
        });
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        navigation={props.navigation}
        variant="dark"
        headerName="Add Card"
        onPress={() => {
          props.navigation.navigate('NewPersonalCard3');
        }}
      />
      <NewCardStepPanel step1={true} step2={true} step3={true} step4={true} />
      <ScrollView style={{flex: 1, padding: 20, marginBottom: 20}}>
        <OutlinedInputBox
          placeholder="Introduction"
          inputType="text"
          // label={'Intoduction'}
          maxLength={100}
          onChange={value => {
            setMessage(value);
          }}
        />
        {/* <OutlinedInputBox
          placeholder="Enter code"
          inputType="text"
          maxLength={5}
          // label={'QR Code'}
          onChange={value => {
            setQRcode(value);
          }}
        /> */}
        <OutlinedInputBox
          placeholder="Enter hobbies"
          inputType="text"
          maxLength={100}
          // label={'Hobbies'}
          onChange={value => {
            setHobbies(value);
          }}
        />
        <OutlinedInputBox
          placeholder="Enter interests"
          inputType="text"
          maxLength={100}
          // label={'Interests'}
          onChange={value => {
            setInterests(value);
          }}
        />
        <OutlinedInputBox
          placeholder="Enter achievements"
          inputType="text"
          maxLength={100}
          // label={'Achievements'}
          onChange={value => {
            setAchivements(value);
          }}
        />
        {/* <View style={{flexDirection: 'column', marginBottom: 20}}> */}
        <View
          style={{
            backgroundColor: '#F0F0F0',
            marginBottom: 20,
            padding: 15,
            borderRadius: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{color: '#242424', fontSize: 16, fontWeight: '700'}}>
              Skills
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: PRIMARY,
              }}
              onPress={() => {
                setIsSkillModalVisible(true);
              }}>
              <Text style={{color: WHITE}}>
                <Text style={{color: WHITE}}>+</Text>Add
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            // data={modalSkill}
            data={skillsArray}
            renderItem={({item, index}) => <SkillCard Skillname={item} />}
          />
        </View>
        <View
          style={{
            backgroundColor: '#F0F0F0',
            marginBottom: 20,
            padding: 15,
            borderRadius: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{color: '#242424', fontSize: 16, fontWeight: '700'}}>
              Education
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: PRIMARY,
              }}
              onPress={() => {
                setIsEducationModalVisible(true);
              }}>
              <Text style={{color: WHITE}}>
                <Text style={{color: WHITE}}>+</Text>Add
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={educationArray}
            style={{alignSelf: 'center'}}
            renderItem={({item, index}) => (
              <EducationCard
                item={item}
                onPress={() => {
                  FunDelEducation(index);
                }}
              />
            )}
          />
        </View>
        <View
          style={{
            backgroundColor: '#F0F0F0',
            marginBottom: 20,
            padding: 15,
            borderRadius: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{color: '#242424', fontSize: 16, fontWeight: '700'}}>
              Job History
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: PRIMARY,
              }}
              onPress={() => {
                setIsJobHistoryModalVisible(true);
              }}>
              <Text style={{color: WHITE}}>
                <Text style={{color: WHITE}}>+</Text>Add
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={true}
            style={{alignSelf: 'center'}}
            showsHorizontalScrollIndicator={false}
            data={jobHistoryArray}
            renderItem={({item, index}) => (
              <JobHistoryCard
                item={item}
                onPress={() => {
                  FunDelJobHistory(index);
                }}
              />
            )}
          />
        </View>
        <View style={{marginVertical: 20}}>
          <BtnComponent
            placeholder="Finish"
            onPress={() => {
              onFinish();
            }}
          />
        </View>

        {isLoading ? <Loader /> : null}
      </ScrollView>
      <EducationModal
        modalVisible={isEducationModalVisible}
        setModalVisible={setIsEducationModalVisible}
        degreeData={degreeList}
        onPress={data => {
          setEducationObject((educationObject = data));
          FunEducationArray();
          setIsEducationModalVisible(false);
        }}
      />
      <JobHistoryModal
        modalVisible={isJobHistoryModalVisible}
        setModalVisible={setIsJobHistoryModalVisible}
        industryType={industryType}
        employeeType={employeeType}
        onPress={data => {
          setJobHistoryObject((jobHistoryObject = data));
          FunJobHistoryArray();
          setIsJobHistoryModalVisible(false);
        }}
      />
      <SkillModal
        setModalSkill={setModalSkill}
        modalSkill={modalSkill}
        modalVisible={isSkillModalVisible}
        setModalVisible={setIsSkillModalVisible}
        onPress={() => {
          FunSkillsArray();
          setIsSkillModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

// const profileFilterFun = () => {
//   var imageMime = profilePic.mime;
//   var name = imageMime.split('/')[1];
//   setProfilePicName('Vinvi.' + name);
//   // setImage(image);
// };
