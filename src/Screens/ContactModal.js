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

export function ContactModal({
  modalVisible,
  setModalVisible,
  setHobbies,
  isEdit,
  CardData,
  countryarray,
  cityarray,
}) {
  console.log('CardData contact', CardData);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  let arraycity;
  arraycity = _.find(CardData.personalCardMeta, {personalKey: 'city'});
  if (arraycity) {
    arraycity = arraycity;
  } else {
    arraycity = 'Dummy city';
  }

  let arraycountry;
  arraycountry = _.find(CardData.personalCardMeta, {personalKey: 'country'});
  if (arraycountry) {
    arraycountry = arraycountry;
  } else {
    arraycountry = 'Dummy country';
  }

  const onEdit = () => {
    let PersonalCardMeta = [
      {
        id: arraycity.id,
        personalCardId: CardData.id,
        PersonalKey: 'city',
        PersonalValue: city ? city.trim() : arraycity.personalValue,
        Ishidden: arraycity.ishidden,
      },
      {
        id: arraycountry.id,
        personalCardId: CardData.id,
        PersonalKey: 'country',
        PersonalValue: country ? country.trim() : arraycountry.personalValue,
        Ishidden: arraycountry.ishidden,
      },
    ];

    var formdata = new FormData();
    formdata.append('Name', CardData.name);
    formdata.append('Email', CardData.email);
    formdata.append('UserId', JSON.stringify(CardData.userId));
    formdata.append('id', JSON.stringify(CardData.id));
    formdata.append('PhoneNo', CardData.phoneNo);
    formdata.append('Address', address ? address : CardData.address);
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

    {
      CardData.profilePicture
        ? formdata.append('profile_image_file', {
            uri: profilePic.path,
            name: profilePicName,
            type: profilePic.mime,
          })
        : formdata.append('profile_image_file', null);
    }

    // {
    //   coverPic
    //     ? formdata.append('cover_image_image', {
    //         uri: coverPic.path,
    //         name: coverName,
    //         type: coverPic.mime,
    //       })
    //     : formdata.append('cover_image_image', null);
    // }

    console.log('formdata', formdata);

    personalCardApiCall(formdata)
      .then(res => res.json())
      .then(data => {
        console.log('response', data);
        if (data.status === 200 && data.success === true) {
          setModalVisible(false);
        } else {
          alert('alert');
        }
      })
      .catch(err => {
        console.log('err', err);
      });
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
                {isEdit ? 'Edit' : 'Add'} Contact Details
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
              placeholder="Number"
              inputType="text"
              editable={false}
              text={CardData.phoneNo ? CardData.phoneNo : null}
              // onChange={value => {
              //   setHobbies(value);
              // }}
            />
            <OutlinedInputBox
              placeholder="Email Address"
              inputType="text"
              editable={false}
              text={CardData.email ? CardData.email : null}
              // onChange={value => {
              //   setHobbies(value);
              // }}
            />
            <OutlinedInputBox
              placeholder="Address"
              inputType="text"
              text={CardData.address ? CardData.address : null}
              onChange={value => {
                setAddress(value);
              }}
            />
            <OutlinedInputBox
              placeholder="City"
              inputType="text"
              text={cityarray}
              onChange={value => {
                setCity(value);
              }}
            />
            <OutlinedInputBox
              placeholder="Country"
              inputType="text"
              text={countryarray}
              onChange={value => {
                setCountry(value);
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
      </ScrollView>
    </Modal>
  );
}
