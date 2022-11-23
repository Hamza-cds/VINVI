import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
} from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import OutlinedInputBox from '../Components/OutlinedInputBox';
import Svg, {Path} from 'react-native-svg';
import _ from 'lodash';
import {personalCardApiCall} from '../Apis/Repo';
import Loader from '../Components/Loader';

export function PersonalModal({
  modalVisible,
  setModalVisible,
  isEdit,
  hobbiesarray,
  interestarray,
  achievmentarray,
  birthdayarray,
  CardData,
}) {
  // console.log('CardData', CardData);
  const [name, setName] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [interests, setInterests] = useState('');
  const [achevements, setAchevements] = useState('');
  const [dob, setDOB] = useState('');
  const [occupation, setOccupation] = useState('');
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  let arrayhobbies = [];
  arrayhobbies = _.find(CardData.personalCardMeta, {personalKey: 'Hobbies'});
  if (arrayhobbies) {
    arrayhobbies = arrayhobbies;
  } else {
    arrayhobbies = 'Dummy hobbies';
  }

  let arrayinterest = [];
  arrayinterest = _.find(CardData.personalCardMeta, {personalKey: 'Interests'});
  if (arrayinterest) {
    arrayinterest = arrayinterest;
  } else {
    arrayinterest = 'Dummy Interests';
  }

  let arraybirthday = [];
  arraybirthday = _.find(CardData.personalCardMeta, {personalKey: 'birthday'});
  if (arraybirthday) {
    arraybirthday = arraybirthday;
  } else {
    arraybirthday = 'Dummy Birthday';
  }

  let arrayachievment = [];
  arrayachievment = _.find(CardData.personalCardMeta, {
    personalKey: 'Achievements',
  });
  if (arrayachievment) {
    arrayachievment = arrayachievment;
  } else {
    arrayachievment = 'Dummy Achievements';
  }

  let arrayOccupation;
  arrayOccupation = _.find(CardData.personalCardMeta, {
    personalKey: 'occupation',
  });
  if (arrayOccupation) {
    arrayOccupation = arrayOccupation;
  } else {
    arrayOccupation = 'Dummy occupation';
  }

  let arrayIntro = [];
  arrayIntro = _.find(CardData.personalCardMeta, {
    personalKey: 'Introductory Message',
  });
  if (arrayIntro) {
    arrayIntro = arrayIntro;
  } else {
    arrayIntro = 'Dummy Introduction';
  }

  const onEdit = () => {
    let PersonalCardMeta = [
      {
        id: arrayhobbies.id,
        personalCardId: CardData.id,
        PersonalKey: 'Hobbies',
        PersonalValue: hobbies ? hobbies.trim() : arrayhobbies.personalValue,
        Ishidden: arrayhobbies.ishidden,
      },
      {
        id: arrayinterest.id,
        personalCardId: CardData.id,
        PersonalKey: 'Interests',
        PersonalValue: interests
          ? interests.trim()
          : arrayinterest.personalValue,
        Ishidden: arrayinterest.ishidden,
      },
      {
        id: arrayachievment.id,
        personalCardId: CardData.id,
        PersonalKey: 'Achievements',
        PersonalValue: achevements
          ? achevements.trim()
          : arrayachievment.personalValue,
        Ishidden: arrayachievment.ishidden,
      },
      {
        id: arraybirthday.id,
        personalCardId: CardData.id,
        PersonalKey: 'birthday',
        PersonalValue: dob ? dob.trim() : arraybirthday.personalValue,
        Ishidden: arraybirthday.ishidden,
      },
      {
        id: arrayOccupation.id,
        personalCardId: CardData.id,
        PersonalKey: 'occupation',
        PersonalValue: occupation
          ? occupation.trim()
          : arrayOccupation.personalValue,
        Ishidden: arrayOccupation.ishidden,
      },
      {
        id: arrayIntro.id,
        personalCardId: CardData.id,
        PersonalKey: 'Introductory Message',
        PersonalValue: msg ? msg.trim() : arrayIntro.personalValue,
        Ishidden: arrayIntro.ishidden,
      },
    ];

    var formdata = new FormData();
    formdata.append('Name', name ? name : CardData.name);
    formdata.append('Email', CardData.email);
    formdata.append('UserId', JSON.stringify(CardData.userId));
    formdata.append('id', JSON.stringify(CardData.id));
    formdata.append('PhoneNo', CardData.phoneNo);
    formdata.append('Address', CardData.address);
    formdata.append('ProfilePicture', CardData.profilePicture);
    formdata.append('CoverPicture', CardData.coverPicture);
    for (let index = 0; index < PersonalCardMeta.length; index++) {
      const element = PersonalCardMeta[index];
      formdata.append(`PersonalCardMeta[${index}][id]`, element.id);
      formdata.append(
        `PersonalCardMeta[${index}][personalCardId]`,
        element.personalCardId,
      );
      formdata.append(
        `PersonalCardMeta[${index}][PersonalKey]`,
        element.PersonalKey,
      );
      formdata.append(
        `PersonalCardMeta[${index}][PersonalValue]`,
        element.PersonalValue,
      );
      formdata.append(`PersonalCardMeta[${index}][Ishidden]`, element.Ishidden);
    }

    console.log('formdata', formdata);

    // setIsLoading(true);
    // personalCardApiCall(formdata)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log('response', data);
    //     if (data.status === 200 && data.success === true) {
    //       setIsLoading(false);
    //       setModalVisible(false);
    //     } else {
    //       setIsLoading(false);
    //       alert('alert');
    //     }
    //   })
    //   .catch(err => {
    //     setIsLoading(false);
    //     console.log('err', err);
    //   });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: 'rgba(64,77,136,.8)',
            flex: 1,
            height: Dimensions.get('window').height,
            padding: 20,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#113066',
              width: '100%',
              backgroundColor: '#ffffff',
              padding: 20,
              paddingBottom: 0,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: '#242424',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {isEdit ? 'Edit' : 'Add'} Personal Details
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20.849}
                  height={20.849}
                  viewBox="0 0 30.849 30.849">
                  <Path
                    data-name="Icon metro-cancel"
                    d="M17.995 1.928a15.424 15.424 0 1015.424 15.424A15.424 15.424 0 0017.995 1.928zm0 27.956a12.532 12.532 0 1112.532-12.532 12.532 12.532 0 01-12.532 12.533zm4.82-20.244l-4.82 4.82-4.82-4.82-2.892 2.892 4.82 4.82-4.82 4.82 2.892 2.892 4.82-4.82 4.82 4.82 2.892-2.892-4.82-4.82 4.82-4.82z"
                    transform="translate(-2.571 -1.928)"
                    fill="#242424"
                  />
                </Svg>
              </TouchableOpacity>
            </View>

            <OutlinedInputBox
              placeholder="Name"
              inputType="text"
              text={CardData.name ? CardData.name : null}
              onChange={value => {
                setName(value);
              }}
            />

            <OutlinedInputBox
              placeholder="Hobbies"
              inputType="text"
              text={
                arrayhobbies.personalValue ? arrayhobbies.personalValue : null
              }
              onChange={value => {
                setHobbies(value);
              }}
            />
            <OutlinedInputBox
              placeholder="Interests"
              inputType="text"
              text={
                arrayinterest.personalValue ? arrayinterest.personalValue : null
              }
              onChange={value => {
                setInterests(value);
              }}
            />
            <OutlinedInputBox
              placeholder="Achevements"
              inputType="text"
              text={
                arrayachievment.personalValue
                  ? arrayachievment.personalValue
                  : null
              }
              onChange={value => {
                setAchevements(value);
              }}
            />
            <OutlinedInputBox
              placeholder="Date of birth"
              inputType="text"
              text={
                arraybirthday.personalValue ? arraybirthday.personalValue : null
              }
              onChange={value => {
                setDOB(value);
              }}
            />
            <OutlinedInputBox
              placeholder="occupation"
              inputType="text"
              text={
                arrayOccupation.personalValue
                  ? arrayOccupation.personalValue
                  : null
              }
              onChange={value => {
                setOccupation(value);
              }}
            />
            <OutlinedInputBox
              placeholder="Introductory Message"
              inputType="text"
              text={arrayIntro.personalValue ? arrayIntro.personalValue : null}
              onChange={value => {
                setMsg(value);
              }}
            />
            <BtnComponent
              placeholder={isEdit ? 'Edit' : 'Add'}
              onPress={() => {
                onEdit();
                // setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
        {isLoading ? <Loader /> : null}
      </ScrollView>
    </Modal>
  );
}
