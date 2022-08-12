import React, {useState} from 'react';
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

export function SkillModal({
  modalVisible,
  setModalVisible,
  setModalSkill,
  isEdit,
  onPress,
}) {
  let [modalSkillArray, setModalSKillArray] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [inputValue, setInputValue] = useState('');

  const FunModalSkillsArray = () => {
    debugger;
    let newModalSkillArray = [...modalSkillArray];
    newModalSkillArray.push(newSkill);
    setModalSKillArray((modalSkillArray = newModalSkillArray));
    debugger;
    setModalSkill(modalSkillArray);
    setInputValue('');
    console.log('skillsArray', modalSkillArray);
  };

  const FunDelSkill = index => {
    console.log('index', index);
    let newArr = [...modalSkillArray];
    newArr.splice(index);
    setModalSKillArray(newArr);
    setModalSkill((modalSkillArray = newArr));
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
                {isEdit ? 'Edit' : 'Add'} Skill
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
              placeholder="Skill Name"
              inputType="text"
              onChange={value => {
                // setSkill(value);
                setNewSkill(value);
                setInputValue(value);
              }}
              value={inputValue}
            />
            <TouchableOpacity
              onPress={() => {
                FunModalSkillsArray();
              }}
              style={{
                backgroundColor: PRIMARY,
                height: 30,
                width: 50,
                alignSelf: 'flex-end',
                borderRadius: 5,
              }}>
              <Text
                style={{color: WHITE, alignSelf: 'center', marginVertical: 5}}>
                Add
              </Text>
            </TouchableOpacity>
            {/* <FontAwesome name="remove" size={20} color={PRIMARY} /> */}
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={modalSkillArray}
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
            <BtnComponent
              placeholder={isEdit ? 'Edit' : 'Save'}
              // onPress={() => {
              //   setModalVisible(!modalVisible);
              // }}
              onPress={onPress}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
