import React, { useEffect, useState } from 'react';
import { View, ImageBackground, ScrollView, } from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import OutlinedInputBox from '../Components/OutlinedInputBox';
import NewCardStepPanel from '../Components/NewCardStepPanel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Height, Width } from '../Constants/Constants';
import { EMPTY_ACHIVEMENT, EMPTY_EDUCATION, EMPTY_HOBBIES, EMPTY_INTERESTS, EMPTY_JOBHISTORY, EMPTY_MESSAGE, EMPTY_PERSONALINFO, EMPTY_PORTFOLIO, EMPTY_QRCODE, EMPTY_SKILLS } from '../Constants/Strings';
import { isNullOrEmpty } from '../Constants/TextUtils';
import { personalCardApiCall } from '../Apis/Repo';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewCardScreen(props) {

  const [message, setMessage] = useState("")
  const [qrCode, setQRcode] = useState("")
  const [hobbies, setHobbies] = useState("")
  const [education, setEducation] = useState("")
  const [interests, setInterests] = useState("")
  const [achivements, setAchivements] = useState("")
  const [personalinfo, setPersonalInfo] = useState("")
  const [skills, setSkills] = useState("")
  const [portfolio, setPortFolio] = useState("")
  const [jobHistory, setJobHistory] = useState("")
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log("PCS3", props)
    AsyncStorage.getItem("user_data").then((response) => {
      setUserData(userData = JSON.parse(response))
      console.log("userdata", userData);
    })
  }, [])

  const onFinish = () => {
    debugger;
    props.navigation.push("Individual", {
      paramKey: props.route.params.paramkey,
    })
    console.log("tye ha data", props)

    //props.navigation.push("Individual")


    // if (isNullOrEmpty(message)) {
    //   alert(EMPTY_MESSAGE)
    // }
    // else if (isNullOrEmpty(qrCode)) {
    //   alert(EMPTY_QRCODE)
    // }
    // else if (isNullOrEmpty(hobbies)) {
    //   alert(EMPTY_HOBBIES)
    // }
    // else if (isNullOrEmpty(education)) {
    //   alert(EMPTY_EDUCATION)
    // }
    // else if (isNullOrEmpty(interests)) {
    //   alert(EMPTY_INTERESTS)
    // }
    // else if (isNullOrEmpty(achivements)) {
    //   alert(EMPTY_ACHIVEMENT)
    // }
    // else if (isNullOrEmpty(personalinfo)) {
    //   alert(EMPTY_PERSONALINFO)
    // }
    // else if (isNullOrEmpty(skills)) {
    //   alert(EMPTY_SKILLS)
    // }
    // else if (isNullOrEmpty(portfolio)) {
    //   alert(EMPTY_PORTFOLIO)
    // }
    // else if (isNullOrEmpty(jobHistory)) {
    //   alert(EMPTY_JOBHISTORY)
    // }
    // else {
    //   let object = {

    //     "UserId": userData.id,
    //     "PhoneNo": userData.phoneno,
    //     "PersonalCardMeta": [
    //       {
    //         "PersonalKey": "Introductory Message",
    //         "PersonalValue": message,
    //         "Ishidden": true

    //       },
    //       {
    //         "PersonalKey": "QR Code",
    //         "PersonalValue": qrCode,
    //         "Ishidden": true

    //       },
    //       {
    //         "PersonalKey": "Hobbies",
    //         "PersonalValue": hobbies,
    //         "Ishidden": true

    //       },
    //       {
    //         "PersonalKey": "Education",
    //         "PersonalValue": education,
    //         "Ishidden": true
    //       },
    //       {
    //         "PersonalKey": "Interests",
    //         "PersonalValue": interests,
    //         "Ishidden": true
    //       },
    //       {
    //         "PersonalKey": "Achivements",
    //         "PersonalValue": achivements,
    //         "Ishidden": true
    //       },
    //       {
    //         "PersonalKey": "Personal Info",
    //         "PersonalValue": personalinfo,
    //         "Ishidden": true
    //       },
    //       {
    //         "PersonalKey": "Skills",
    //         "PersonalValue": skills,
    //         "Ishidden": true
    //       },
    //       {
    //         "PersonalKey": "Portfolio",
    //         "PersonalValue": portfolio,
    //         "Ishidden": true
    //       },
    //       {
    //         "PersonalKey": "Job History",
    //         "PersonalValue": jobHistory,
    //         "Ishidden": true
    //       },
    //     ],
    //   }
    //   console.log("object", object)

    //   personalCardApiCall(object)
    //     .then((response) => {
    //       console.log("response", response)
    //       if (response.data.status == 200) {
    //         props.navigation.push("Individual")
    //       }
    //       else {
    //         alert(CREDIANTIAL_ERROR)
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("err", err)
    //     })

    //   // }
  }

  return (
    <SafeAreaView style={{ height: Height, width: Width }}>
      <ImageBackground
        source={require('../Assets/screenbg.png')}
        style={{ flex: 1 }}>
        <Header
          navigation={props.navigation}
          variant="dark"
          headerName="New Card"
          onPress={() => {
            props.navigation.navigate('NewPersonalCard3');
          }}
        />
        <NewCardStepPanel
          step1={true}
          step2={true}
          step3={true}
          step4={true}
        />
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              width: '100%',
              padding: 20,
            }}>
            <OutlinedInputBox
              placeholder="Introductory Message"
              inputType="text"
              onChange={(value) => {
                setMessage(value);
              }}
            />
            <OutlinedInputBox
              placeholder="QR Code"
              inputType="text"
              onChange={(value) => {
                setQRcode(value);
              }} />
            <OutlinedInputBox
              placeholder="Hobbies"
              inputType="text"
              onChange={(value) => {
                setHobbies(value);
              }} />
            <OutlinedInputBox
              placeholder="Education"
              inputType="text"
              onChange={(value) => {
                setEducation(value);
              }} />
            <OutlinedInputBox
              placeholder="Interests"
              inputType="text"
              onChange={(value) => {
                setInterests(value);
              }} />
            <OutlinedInputBox
              placeholder="Achievements"
              inputType="text"
              onChange={(value) => {
                setAchivements(value);
              }} />
            <OutlinedInputBox
              placeholder="Personal Info"
              inputType="text"
              onChange={(value) => {
                setPersonalInfo(value);
              }} />
            <OutlinedInputBox
              placeholder="Skills"
              inputType="text"
              onChange={(value) => {
                setSkills(value);
              }} />
            <OutlinedInputBox
              placeholder="Portfolio"
              inputType="text"
              onChange={(value) => {
                setPortFolio(value);
              }} />
            <OutlinedInputBox
              placeholder="Job History"
              inputType="text"
              onChange={(value) => {
                setJobHistory(value);
              }} />
            <BtnComponent
              placeholder="Finish"
              onPress={() => {
                onFinish();
                // navigation.navigate('Individual');
              }}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );

}
