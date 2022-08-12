import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import OutlinedInputBox from '../Components/OutlinedInputBox';
import NewCardStepPanel from '../Components/NewCardStepPanel';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Height, Width} from '../Constants/Constants';
import {isNullOrEmpty} from '../Constants/TextUtils';
import {personalCardApiCall} from '../Apis/Repo';
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
import {PRIMARY, WHITE} from '../Constants/Colors';

export default function NewCardScreen(props) {
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
  const [educationArray, setEducationArray] = useState([]);
  let [educationObject, setEducationObject] = useState('');
  const [jobHistoryArray, setJobHistoryArray] = useState([]);
  let [jobHistoryObject, setJobHistoryObject] = useState('');
  let [userData, setUserData] = useState(null);
  const newArray1 = props.route.params.paramKey;
  const PersonalcardScreen4Array = [
    {
      key: 'Introductory Message',
      value: message,
    },
    {
      key: 'QR Code',
      value: qrCode,
    },
    {
      key: 'Hobbies',
      value: hobbies,
    },
    {
      key: 'Education',
      value: JSON.stringify(educationArray),
    },
    {
      key: 'Interests',
      value: interests,
    },
    {
      key: 'Achievements',
      value: achivements,
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
    // console.log('skillsArray', skillsArray);
  };

  const FunEducationArray = () => {
    let newEducationArray = educationArray;
    newEducationArray.push(educationObject);
    setEducationArray([]);
    setEducationArray(newEducationArray);
    // console.log('educationArray', educationArray);
  };

  const FunJobHistoryArray = () => {
    let newJobHistoryArray = jobHistoryArray;
    newJobHistoryArray.push(jobHistoryObject);
    setJobHistoryArray([]);
    setJobHistoryArray(newJobHistoryArray);
    // console.log('jobHistoryArray', jobHistoryArray);
  };

  useEffect(() => {
    // console.log('PCS4', props.route.params);
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
    });
  }, []);

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
          PersonalKey: element.key,
          PersonalValue: element.value,
          Ishidden: true,
        };
        PersonalCardMeta.push(newObject);
      }

      for (let index = 0; index < PersonalcardScreen4Array.length; index++) {
        const element1 = PersonalcardScreen4Array[index];
        let newObject1 = {
          PersonalKey: element1.key,
          PersonalValue: element1.value,
          Ishidden: true,
        };
        PersonalCardMeta.push(newObject1);
      }
      // console.log('PersonalCardMeta', PersonalCardMeta);

      let object = {
        name: props.route.params.name,
        Email: props.route.params.email,
        ProfilePicture: props.route.params.image,
        UserId: userData.id,
        PhoneNo: userData.phoneno,
        Address: props.route.params.address,
        PersonalCardMeta: PersonalCardMeta,
      };
      console.log('object', object);

      personalCardApiCall(object)
        .then(response => {
          console.log('response', response);
          if (response.data.status === 200) {
            props.navigation.push('MyCardsDashboardScreen');
            // , {
            //   paramKey: newArray1,
            //   paramKey: PersonalcardScreen4Array
            //   dont remove this !
            // }
          } else {
            alert(CREDIANTIAL_ERROR);
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  };

  return (
    <SafeAreaView style={{height: Height, width: Width}}>
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
          placeholder="Introductory Message"
          inputType="text"
          onChange={value => {
            setMessage(value);
          }}
        />
        <OutlinedInputBox
          placeholder="QR Code"
          inputType="text"
          onChange={value => {
            setQRcode(value);
          }}
        />
        <OutlinedInputBox
          placeholder="Hobbies"
          inputType="text"
          onChange={value => {
            setHobbies(value);
          }}
        />
        <OutlinedInputBox
          placeholder="Interests"
          inputType="text"
          onChange={value => {
            setInterests(value);
          }}
        />
        <OutlinedInputBox
          placeholder="Achievements"
          inputType="text"
          onChange={value => {
            setAchivements(value);
          }}
        />
        {/* <View style={{flexDirection: 'column', marginBottom: 20}}> */}
        <View
          style={{
            backgroundColor: '#E0E0E0',
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
            <Text style={{color: '#242424', fontSize: 16}}>Skills</Text>
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
            backgroundColor: '#E0E0E0',
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
            renderItem={({item, index}) => <EducationCard item={item} />}
          />
        </View>
        <View
          style={{
            backgroundColor: '#E0E0E0',
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
            renderItem={({item, index}) => <JobHistoryCard item={item} />}
          />
        </View>
        <BtnComponent
          placeholder="Finish"
          onPress={() => {
            onFinish();
          }}
        />
      </ScrollView>
      <EducationModal
        modalVisible={isEducationModalVisible}
        setModalVisible={setIsEducationModalVisible}
        onPress={data => {
          setEducationObject((educationObject = data));
          FunEducationArray();
          setIsEducationModalVisible(false);
        }}
      />
      <JobHistoryModal
        modalVisible={isJobHistoryModalVisible}
        setModalVisible={setIsJobHistoryModalVisible}
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
