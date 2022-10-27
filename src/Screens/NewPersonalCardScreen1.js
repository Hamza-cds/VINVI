import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import OutlinedInputBox from '../Components/OutlinedInputBox';
import NewCardStepPanel from '../Components/NewCardStepPanel';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Height, Width} from '../Constants/Constants';
import {isNullOrEmpty} from '../Constants/TextUtils';
import {PCData} from '../../Store/Action';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import RegisterInputBox from '../Components/RegisterInputBox';
import {GREY, WHITE} from '../Constants/Colors';
import {
  EMPTY_ADDRESS,
  EMPTY_BIRTHDAY,
  EMPTY_CITY,
  EMPTY_COUNTRY,
  EMPTY_EMAIL,
  EMPTY_NAME,
  EMPTY_OCCUPATION,
  EMPTY_PHONE,
} from '../Constants/Strings';
import {isInvalidEmail} from '../Constants/Validations';

export default function NewCardScreen(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const PersonalcardScreen1Array = [
    {
      key: 'Birthday',
      value: birthday,
    },
    {
      key: 'City',
      value: city,
    },
    {
      key: 'Country',
      value: country,
    },
    {
      key: 'occupation',
      value: occupation,
    },
  ];

  let [UserData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((UserData = JSON.parse(response)));
      console.log('Userdata', UserData);
    });
  }, []);

  let object = {
    Name: name.trim(),
    Email: email.trim(),
    PhoneNo: phoneNumber.trim(),
    Address: address.trim(),
    // UserId: UserData.id,
    PersonalcardScreen1Array: [
      {
        PersonalKey: 'occupation',
        PersonalValue: occupation.trim(),
        Ishidden: true,
      },
      {
        PersonalKey: 'birthday',
        PersonalValue: birthday.trim(),
        Ishidden: true,
      },
      {
        PersonalKey: 'city',
        PersonalValue: city.trim(),
        Ishidden: true,
      },
      {
        PersonalKey: 'country',
        PersonalValue: country.trim(),
        Ishidden: true,
      },
    ],
  };

  const CheckEmail = value => {
    if (value == '') {
      setError(false);
    } else if (isInvalidEmail(value)) {
      setError(true);
      setErrorMsg('Invalid Email');
    } else {
      setError(false);
    }
  };

  // const onNext = () => {
  //   if (isNullOrEmpty(name)) {
  //     alert(EMPTY_NAME);
  //   } else if (isNullOrEmpty(occupation)) {
  //     alert(EMPTY_OCCUPATION);
  //   } else if (isNullOrEmpty(phoneNumber)) {
  //     alert(EMPTY_PHONE);
  //   } else if (isNullOrEmpty(email)) {
  //     alert(EMPTY_EMAIL);
  //   } else if (isNullOrEmpty(birthday)) {
  //     alert(EMPTY_BIRTHDAY);
  //   } else if (isNullOrEmpty(address)) {
  //     alert(EMPTY_ADDRESS);
  //   } else if (isNullOrEmpty(city)) {
  //     alert(EMPTY_CITY);
  //   } else if (isNullOrEmpty(country)) {
  //     alert(EMPTY_COUNTRY);
  //   } else {
  //     props.navigation.push('NewPersonalCard2', {
  //       paramkey: PersonalcardScreen1Array,
  //       name: name,
  //       occupation: occupation,
  //       email: email,
  //       address: address,
  //     });
  //     console.log('PersonalcardScreen1Array', PersonalcardScreen1Array);
  //     let object = {
  //       Name: name,
  //       Email: email,
  //       PhoneNo: phoneNumber,
  //       Address: address,
  //       UserId: userData.id,
  //       PersonalCardMeta: [
  //         {
  //           PersonalKey: 'occupation',
  //           PersonalValue: occupation,
  //           Ishidden: true,
  //         },
  //         {
  //           PersonalKey: 'birthday',
  //           PersonalValue: birthday,
  //           Ishidden: true,
  //         },
  //         {
  //           PersonalKey: 'city',
  //           PersonalValue: city,
  //           Ishidden: true,
  //         },
  //         {
  //           PersonalKey: 'country',
  //           PersonalValue: country,
  //           Ishidden: true,
  //         },
  //       ],
  //     };
  //     console.log('object', object);
  //   }
  // };

  return (
    <SafeAreaView
      style={{height: Height, width: Width, backgroundColor: WHITE}}>
      <Header
        navigation={props.navigation}
        variant="dark"
        headerName="Add Card"
        onPress={() => {
          props.navigation.navigate('AddCard');
        }}
      />
      <NewCardStepPanel
        step1={true}
        step2={false}
        step3={false}
        step4={false}
      />
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            padding: 20,
          }}>
          <OutlinedInputBox
            placeholder="Enter Name"
            backgroundColor={WHITE}
            label="Name"
            inputType="text"
            maxLength={30}
            onChange={value => {
              setName(value);
            }}
          />
          <OutlinedInputBox
            placeholder="Enter Occupation"
            label="Occupation"
            inputType="text"
            backgroundColor={GREY}
            maxLength={30}
            onChange={value => {
              setOccupation(value);
            }}
          />
          <OutlinedInputBox
            placeholder="Enter Phone No"
            maxLength={11}
            backgroundColor={GREY}
            label="Phone"
            inputType="text"
            KeyboardType={'numeric'}
            onChange={value => {
              setPhoneNumber(value);
            }}
          />
          <OutlinedInputBox
            placeholder="Enter Email"
            label="Email"
            inputType="text"
            backgroundColor={GREY}
            maxLength={30}
            error={error}
            errorMsg={errorMsg}
            onChange={value => {
              CheckEmail(value);
              setEmail(value);
            }}
          />
          <OutlinedInputBox
            placeholder="Enter Birthday"
            label="Birthday"
            maxLength={20}
            backgroundColor={GREY}
            inputType="text"
            onChange={value => {
              setBirthday(value);
            }}
          />
          <OutlinedInputBox
            placeholder="Enter Address"
            label="Address"
            maxLength={50}
            backgroundColor={GREY}
            inputType="text"
            onChange={value => {
              setAddress(value);
            }}
          />
          <OutlinedInputBox
            placeholder="Enter City"
            label="City"
            maxLength={30}
            inputType="text"
            backgroundColor={GREY}
            onChange={value => {
              setCity(value);
            }}
          />
          <OutlinedInputBox
            placeholder="Enter Country"
            label="Country"
            maxLength={30}
            backgroundColor={GREY}
            inputType="text"
            onChange={value => {
              setCountry(value);
            }}
          />
          <BtnComponent
            placeholder="Next"
            onPress={() => {
              // onNext();
              dispatch(PCData(object));
              props.navigation.navigate('NewPersonalCard2');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
