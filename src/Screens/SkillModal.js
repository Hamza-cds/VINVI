import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
  FlatList,
} from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import OutlinedInputBox from '../Components/OutlinedInputBox';
import Svg, {Path} from 'react-native-svg';
import {PRIMARY, WHITE} from '../Constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import {PersonalCardEditApiCall} from '../Apis/Repo';
import {isNullOrEmpty, isNullOrEmptyArray} from '../Constants/TextUtils';
import Loader from '../Components/Loader';
import {Skills} from './Skills';

export function SkillModal({
  modalVisible,
  setModalVisible,
  isEdit,
  onPress,
  skillarr,
  CardData,
  setSkillArr,
  skillData,
  setSkillData,
  setModalSkill,
  modalSkill,
  setEditSkillsArray,
  editSkillsArray,
}) {
  let [modalSkillArray, setModalSKillArray] = useState([]);
  // let [editModalSkillArray, setEditModalSKillArray] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tempArr, setTempArr] = useState([]);
  const [del, setDel] = useState(false);

  // console.log('modalSkillArray', modalSkillArray);
  // console.log('skillData', skillData);

  useEffect(() => {
    if (isEdit) {
      // setSkillData((skillData = skillarr));
      // debugger;
      if (skillData.length <= 0) {
        setSkillData((skillData = skillarr));
        setEditSkillsArray((editSkillsArray = skillData));
        // setEditModalSKillArray((editModalSkillArray = skillarr));
        // console.log('editModalSkillArray', editModalSkillArray);
      }
    } else {
      setModalSkill((modalSkill = modalSkillArray));
    }
  }, [skillarr]);

  /* these funtions used when creating personal cards skills  */

  const FunModalSkillsArray = () => {
    if (isNullOrEmpty(newSkill)) {
      alert('Enter atleast one skill');
    } else {
      let newModalSkillArray = modalSkillArray;
      newModalSkillArray.push(newSkill.trim());
      setModalSKillArray((modalSkillArray = newModalSkillArray));
      // setModalSkill((modalSkill = modalSkillArray));
      setNewSkill('');
    }
  };

  const FunDelSkill = index => {
    // debugger;
    let newArr = [...modalSkillArray];
    setTempArr(newArr);
    setModalSKillArray(
      (modalSkillArray = newArr.filter((item, Index) => Index !== index)),
    );
    setModalSkill((modalSkill = modalSkillArray));
    setDel(true);
  };

  /*These functions used when editing personal cards skill*/

  var EditArraySkills;
  const extractSkillForId = () => {
    EditArraySkills = _.find(CardData.personalCardMeta, {
      personalKey: 'Skills',
    });
    if (EditArraySkills) {
      EditArraySkills = EditArraySkills;
    } else {
      EditArraySkills = '';
    }
    // console.log('EditArraySkills', EditArraySkills);
  };

  {
    isEdit == true ? extractSkillForId() : null;
  }

  const funEditModalSkillsArray = () => {
    if (isNullOrEmpty(newSkill)) {
      alert('Enter atleast one skill');
    } else {
      let neweditModalSkillArray = skillarr;
      neweditModalSkillArray.push(newSkill);
      setSkillData((skillData = neweditModalSkillArray));
      setEditSkillsArray((editSkillsArray = skillData));
      // setEditModalSKillArray((editModalSkillArray = neweditModalSkillArray));
      // setSkillArr(editModalSkillArray);
      // setEditModalSkill(modalSkillArray);
      // setInputValue('');
      setNewSkill('');
    }
  };

  const funEditDelSkill = index => {
    // console.log('index', index);
    // debugger;
    var afterDelete = skillData.filter((x, Index) => Index !== index);
    // console.log('afterDelete', afterDelete);
    // setEditModalSKillArray((editModalSkillArray = afterDelete));
    setSkillData((skillData = afterDelete));
    setEditSkillsArray((editSkillsArray = skillData));

    // setSkillArr(editModalSkillArray);
    // setEditModalSkill(editModalSkillArray);
  };

  const Add = () => {
    if (isEdit == true) funEditModalSkillsArray();
    else FunModalSkillsArray();
  };

  const onEdit = () => {
    let obj = {
      id: EditArraySkills.id,
      ishidden: true,
      personalCardId: CardData.id,
      personalKey: 'Skills',
      personalValue: JSON.stringify(skillData),
      // personalValue: JSON.stringify(skillData),
    };

    console.log('abject', obj);

    setIsLoading(true);
    PersonalCardEditApiCall(obj)
      // .then(res => res.json())
      .then(data => {
        // console.log('Edit Skill Data', data);

        if (data.data.status == 200 && data.data.success == true) {
          setIsLoading(false);
          setModalVisible(false);
          setSkillData(
            (skillData = JSON.parse(data.data.result.personalValue)),
          );
          // setEditModalSKillArray('');
        } else {
          setIsLoading(false);
          alert(data.message);
        }
      })
      .catch(err => {
        setIsLoading(false);
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
            backgroundColor: 'rgba(190,190,190,.8)',
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
                {isEdit ? 'Edit' : 'Add'} Skill
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  if (isEdit == true) {
                    setSkillData([]);
                  } else {
                    if (del == true) {
                      setModalSKillArray(tempArr);
                      setModalSkill((modalSkill = tempArr));
                    } else {
                      setModalSKillArray([]);
                    }
                  }
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
              placeholder="Enter Skill Name"
              inputType="text"
              onChange={value => {
                setNewSkill(value);
                // setInputValue(value);
              }}
              text={newSkill}
            />
            <TouchableOpacity
              onPress={() => {
                Add();
                setNewSkill('');
              }}
              style={{
                backgroundColor: PRIMARY,
                height: 30,
                width: 50,
                alignSelf: 'flex-end',
                borderRadius: 5,
                marginVertical: 5,
              }}>
              <Text
                style={{color: WHITE, alignSelf: 'center', marginVertical: 5}}>
                Add
              </Text>
            </TouchableOpacity>
            {isEdit ? (
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{marginVertical: 20}}
                data={skillData}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      backgroundColor: '#EFEFEF',
                      marginRight: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderRadius: 3,
                      // marginTop: 10,
                    }}>
                    <Text
                      style={{
                        marginVertical: 5,
                        marginHorizontal: 5,
                        color: '#7A7A7A',
                      }}>
                      {item}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        funEditDelSkill(index);
                      }}>
                      <Entypo
                        name="cross"
                        size={22}
                        color={'black'}
                        style={{marginVertical: 4}}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            ) : (
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{marginBottom: 15}}
                data={modalSkillArray}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      backgroundColor: '#EFEFEF',
                      marginRight: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderRadius: 3,
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        marginVertical: 5,
                        marginHorizontal: 5,
                        color: '#7A7A7A',
                      }}>
                      {item}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        FunDelSkill(index);
                      }}>
                      <Entypo
                        name="cross"
                        size={22}
                        color={'black'}
                        style={{marginVertical: 4}}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}

            {isEdit == true ? (
              <BtnComponent
                placeholder={isEdit ? 'Edit' : 'Save'}
                onPress={() => {
                  onEdit();
                }}
              />
            ) : (
              <BtnComponent
                placeholder={isEdit ? 'Edit' : 'Save'}
                onPress={onPress}
              />
            )}
          </View>
        </View>
        {isLoading ? <Loader /> : null}
      </ScrollView>
    </Modal>
  );
}
