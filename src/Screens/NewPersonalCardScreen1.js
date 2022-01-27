import React, { useState } from 'react';
import { View, ImageBackground, ScrollView } from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import OutlinedInputBox from '../Components/OutlinedInputBox';
import NewCardStepPanel from '../Components/NewCardStepPanel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Height, Width } from '../Constants/Constants';
import { isNullOrEmpty } from '../Constants/TextUtils';
import { CREDIANTIAL_ERROR, EMPTY_ADDRESS, EMPTY_BIRTHDAY, EMPTY_CITY, EMPTY_COUNTRY, EMPTY_EMAIL, EMPTY_NAME, EMPTY_OCCUPATION, EMPTY_PHONE } from '../Constants/Strings';
import { personalCardApiCall } from '../Apis/repo';

export default function NewCardScreen(props, navigation) {
  const [name, setName] = useState("")
  const [occupation, setOccupation] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [birthday, setBirthday] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")

  const onNext = () => {
    props.navigation.push("NewPersonalCard2")

    // if (isNullOrEmpty(name)) {
    //   alert(EMPTY_NAME)
    // }
    // else if (isNullOrEmpty(occupation)) {
    //   alert(EMPTY_OCCUPATION)
    // }
    // else if (isNullOrEmpty(phoneNumber)) {
    //   alert(EMPTY_PHONE)
    // }
    // else if (isNullOrEmpty(email)) {
    //   alert(EMPTY_EMAIL)
    // }
    // else if (isNullOrEmpty(birthday)) {
    //   alert(EMPTY_BIRTHDAY)
    // }
    // else if (isNullOrEmpty(address)) {
    //   alert(EMPTY_ADDRESS)
    // }
    // else if (isNullOrEmpty(city)) {
    //   alert(EMPTY_CITY)
    // }
    // else if (isNullOrEmpty(country)) {
    //   alert(EMPTY_COUNTRY)
    // }
    // else {
    //   let object = {
    //     "Name": name,
    //     "Email": email,
    //     "PhoneNo": phoneNumber,
    //     "Address": address,
    //     "PersonalCardMeta": [
    //       {
    //         "PersonalKey": "occupation",
    //         "PersonalValue": occupation,
    //         "Ishidden": true

    //       },
    //       {
    //         "PersonalKey": "birthday",
    //         "PersonalValue": birthday,
    //         "Ishidden": true

    //       },
    //       {
    //         "PersonalKey": "city",
    //         "PersonalValue": city,
    //         "Ishidden": true

    //       },
    //       {
    //         "PersonalKey": "country",
    //         "PersonalValue": country,
    //         "Ishidden": true
    //       },
    //     ],
    //   }
    //   console.log("object", object)

    //   personalCardApiCall(object)
    //     .then((response) => {
    //       console.log("response", response)
    //       if (response.data.status == 200) {
    //         props.navigation.push("NewPersonalCard2")
    //       }
    //       else {
    //         alert(CREDIANTIAL_ERROR)
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("err", err)
    //     })

    // }
  }

  return (
    <SafeAreaView style={{ height: Height, width: Width }}>
      <ImageBackground
        source={require('../Assets/screenbg.png')}
        style={{ flex: 1 }}>
        <Header
          navigation={navigation}
          variant="dark"
          headerName="New Card"
          onPress={() => {
            navigation.navigate('AddCard');
          }}
        />
        <NewCardStepPanel
          step1={true}
          step2={false}
          step3={false}
          step4={false}
        />
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              width: '100%',
              padding: 20,
            }}>
            <OutlinedInputBox
              placeholder="Name"
              inputType="text"
              onChange={(value) => {
                setOccupation(value);
              }} />
            <OutlinedInputBox
              placeholder="Occupation"
              inputType="text"
              onChange={(value) => {
                setName(value);
              }} />
            <OutlinedInputBox
              placeholder="Phone No"
              inputType="text"
              onChange={(value) => {
                setPhoneNumber(value);
              }} />
            <OutlinedInputBox
              placeholder="Email"
              inputType="text"
              onChange={(value) => {
                setEmail(value);
              }} />
            <OutlinedInputBox
              placeholder="Birthday"
              inputType="text"
              onChange={(value) => {
                setBirthday(value);
              }} />
            <OutlinedInputBox
              placeholder="Address"
              inputType="text"
              onChange={(value) => {
                setAddress(value);
              }} />
            <OutlinedInputBox
              placeholder="City"
              inputType="text"
              onChange={(value) => {
                setCity(value);
              }} />
            <OutlinedInputBox
              placeholder="Country"
              inputType="text"
              onChange={(value) => {
                setCountry(value);
              }} />
            <BtnComponent
              placeholder="Next"
              onPress={() => {
                onNext();
              }}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );

}
