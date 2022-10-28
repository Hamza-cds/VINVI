import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import OutlinedInputBox from '../Components/OutlinedInputBox';
import NewCardStepPanel from '../Components/NewCardStepPanel';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Height, Width} from '../Constants/Constants';
import {isNullOrEmpty} from '../Constants/TextUtils';
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
import {useTheme} from 'react-native-paper';
import Loader from '../Components/Loader';

export default function NewCardScreen(props) {
  const dispatch = useDispatch();
  const DATA_TEST = useSelector(state => state.PCData);
  // console.log('PERSONAL_CARD_3_DATA_TEST', DATA_TEST);

  const [isEducationModalVisible, setIsEducationModalVisible] = useState(false);
  const [isJobHistoryModalVisible, setIsJobHistoryModalVisible] =
    useState(false);
  const [isSkillModalVisible, setIsSkillModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [qrCode, setQRcode] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [interests, setInterests] = useState('');
  const [achivements, setAchivements] = useState('');
  const [skillsArray, setSkillsArray] = useState([]);
  const [modalSkill, setModalSkill] = useState([]);
  const [profilePic, setProfilePic] = useState(DATA_TEST.ProfilePicture);
  const [profilePicName, setProfilePicName] = useState(DATA_TEST.profileName);
  const [coverPic, setCoverPic] = useState(DATA_TEST.CoverPicture);
  const [coverName, setCoverName] = useState(DATA_TEST.coverName);
  const [educationArray, setEducationArray] = useState([]);
  let [educationObject, setEducationObject] = useState('');
  const [jobHistoryArray, setJobHistoryArray] = useState([]);
  let [jobHistoryObject, setJobHistoryObject] = useState('');
  let [userData, setUserData] = useState(null);
  const newArray1 = DATA_TEST.PersonalcardScreen1Array;
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
    {
      key: 'QR Code',
      value: qrCode.trim(),
    },
    {
      key: 'Hobbies',
      value: hobbies.trim(),
    },
    {
      key: 'Education',
      value: JSON.stringify(educationArray),
      // value: educationArray,
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
    setSkillsArray(modalSkill);
  };

  const FunEducationArray = () => {
    let newEducationArray = educationArray;
    newEducationArray.push(educationObject);
    setEducationArray([]);
    setEducationArray(newEducationArray);
  };

  const FunDelEducation = item => {
    setEducationArray(educationArray.filter(Sitem => Sitem.id !== item.id));
  };

  const FunDelJobHistory = item => {
    setJobHistoryArray(jobHistoryArray.filter(Sitem => Sitem.id !== item.id));
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
    getAllLookupdetail();
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
      alert(EMPTY_MESSAGE);
    } else if (isNullOrEmpty(qrCode)) {
      alert(EMPTY_QRCODE);
    } else if (isNullOrEmpty(hobbies)) {
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

      for (let index = 0; index < PersonalcardScreen4Array.length; index++) {
        const element1 = PersonalcardScreen4Array[index];
        let newObject1 = {
          PersonalKey: element1.key,
          PersonalValue: element1.value.trim(),
          Ishidden: true,
        };
        PersonalCardMeta.push(newObject1);
      }

      var formdata = new FormData();
      formdata.append('Name', DATA_TEST.Name);
      formdata.append('Email', DATA_TEST.Email);
      formdata.append('UserId', JSON.stringify(userData.id));
      formdata.append('PhoneNo', DATA_TEST.PhoneNo);
      formdata.append('Address', DATA_TEST.Address);
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

      setIsLoading(true);
      personalCardApiCall(formdata)
        .then(res => res.json())
        .then(data => {
          console.log('response', data);
          if (data.status === 200 && data.success === true) {
            setIsLoading(false);
            dispatch(PCDComplete(''));
            props.navigation.reset({
              index: 0,
              routes: [{name: 'MyCardsDashboardScreen'}],
            });
          } else {
            setIsLoading(false);
            alert(CREDIANTIAL_ERROR);
          }
        })
        .catch(err => {
          setIsLoading(false);
          console.log('err', err);
        });
    }
  };

  return (
    <SafeAreaView
      style={{height: Height, width: Width, backgroundColor: 'white'}}>
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
          placeholder="Introduce your self"
          inputType="text"
          label={'Intoduction'}
          maxLength={50}
          onChange={value => {
            setMessage(value);
          }}
        />
        <OutlinedInputBox
          placeholder="Enter Code"
          inputType="text"
          maxLength={5}
          label={'QR Code'}
          onChange={value => {
            setQRcode(value);
          }}
        />
        <OutlinedInputBox
          placeholder="Enter Hobbies"
          inputType="text"
          maxLength={20}
          label={'Hobbies'}
          onChange={value => {
            setHobbies(value);
          }}
        />
        <OutlinedInputBox
          placeholder="Enter Interests"
          inputType="text"
          maxLength={20}
          label={'Interests'}
          onChange={value => {
            setInterests(value);
          }}
        />
        <OutlinedInputBox
          placeholder="Enter Achievements"
          inputType="text"
          maxLength={30}
          label={'Achievements'}
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
                  FunDelEducation(item);
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
                  FunDelJobHistory(item);
                }}
              />
            )}
          />
        </View>
        <BtnComponent
          placeholder="Finish"
          onPress={() => {
            onFinish();
          }}
        />

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
