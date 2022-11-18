import React, {useState} from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {Shadow} from 'react-native-shadow-2';
import {Height, Width} from '../Constants/Constants';
import BtnComponent from './BtnComponent';
import LinearGradient from 'react-native-linear-gradient';
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
import {
  Black,
  PRIMARY,
  PRIMARY1,
  SECONDARY,
  WHITE,
  White,
} from '../Constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Search} from 'react-native-feather';
import {isEmpty, isNullOrEmptyArray} from '../Constants/TextUtils';

export default function Select({
  placeholder,
  error,
  errorMessage,
  label,
  data,
  onCallBack,
  isEdit,
  editText,
}) {
  console.log('error', error);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const itemSelection = () => {
    setOpenModal(false);
    if (!isNullOrEmptyArray(selectedItem)) {
      // onCallBack(selectedItem.id);
      onCallBack(selectedItem);
    }
  };

  // const selectItems = value => {
  //   if (isMulti) {
  //     let newArray = [...itemsSelected];
  //     const found = newArray.find(element => element.value == value.value);
  //     if (found == undefined) {
  //       newArray.push(value);
  //       setSelectedItem([]);
  //       setSelectedItem(newArray);
  //     } else {
  //       const objectIndex = newArray.findIndex(
  //         element => element.value == value.value,
  //       );
  //       if (objectIndex > -1) {
  //         newArray.splice(objectIndex, 1);
  //         setSelectedItem([]);
  //         setSelectedItem(newArray);
  //       }
  //     }
  //   } else {
  //     setSelectedItem([]);
  //     setSelectedItem(prevArray => [...prevArray, value]);
  //   }
  // };

  // const removeSelectedItem = (item, index) => {
  //   let newArray = [...itemsSelected];
  //   const objectIndex = newArray.findIndex(
  //     element => element.value == item.value,
  //   );
  //   if (objectIndex > -1) newArray.splice(objectIndex, 1);

  //   onSelect(newArray);
  // };

  const onOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <View
      style={{
        marginVertical: 6,
        position: 'relative',
        // borderWidth: 1,
        borderRadius: 7,
        borderWidth: 0.7,
        borderColor: error ? 'red' : PRIMARY,
        backgroundColor: '#EFEFEF',
        // height: 50,
      }}>
      {error ? (
        <Text
          numberOfLines={2}
          style={{
            color: 'red',
            position: 'absolute',
            top: 2,
            right: 5,
            left: '35%',
            fontSize: 11,
            textAlign: 'right',
          }}>
          {errorMessage}
        </Text>
      ) : null}

      <Text
        style={{
          flex: 1,
          color: error ? 'red' : Black,
          marginBottom: 5,
          fontSize: 12,
          position: 'absolute',
          top: 5,
          left: 10,
          fontWeight: 'bold',
        }}>
        {label ? label : placeholder}
      </Text>
      <View
        style={{
          width: '100%',
          marginTop: 20,
          borderRadius: 10,
          paddingVertical: 6,
          paddingHorizontal: 10,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => onOpenModal()}
          style={{flex: 1, justifyContent: 'center'}}>
          {isEdit == true ? (
            <Text
              style={{
                color: 'black',
                fontSize: 14,
              }}>
              {editText}
            </Text>
          ) : (
            <Text
              style={{
                color: 'rgba(0,0,0,.5)',
                fontSize: 14,
              }}>
              {editText ? editText : placeholder}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => onOpenModal()}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 7,
          position: 'absolute',
          marginTop: 16,
          right: 10,
        }}>
        <MaterialIcons name="keyboard-arrow-down" size={25} />
      </TouchableOpacity>
      <Modal
        visible={openModal}
        transparent={true}
        style={{alignItems: 'center'}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#0EE1A390', '#0CA69D90']}
          style={{
            width: Width,
            // height: Height,
            height: Dimensions.get('window').height,
            justifyContent: 'center',
            padding: 20,
            backgroundColor: 'rgba(64,77,136,.8)',
          }}>
          <Shadow
            distance={40}
            startColor="rgba(0,0,0,.05)"
            finalColor="rgba(0,0,0,.01)"
            offset={[2, 3]}>
            <View
              style={{
                backgroundColor: WHITE,
                width: Width - 50,
                height: '100%',
                borderRadius: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setOpenModal(!openModal);
                }}
                style={{
                  paddingBottom: 10,
                  alignItems: 'center',
                  position: 'absolute',
                  right: 15,
                  top: 20,
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 15,
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: Black,
                    fontWeight: 'bold',
                    marginBottom: 5,
                  }}>
                  {placeholder}
                </Text>
              </View>
              {/************SEARCH BAR HERE************* */}

              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'relative',
                  backgroundColor: '#EFEFEF',
                  height: 40,
                  width: '85%',
                  borderWidth: 0.5,
                  marginTop: 10,
                  borderRadius: 15,
                  marginHorizontal: 20,
                  padding: 10,
                }}>
                <TextInput
                  placeholder="Search"
                  keyboardType="default"
                  onChangeText={value => {
                    console.log('value', value);
                    // setseacrhKey(value)
                  }}
                  placeholderTextColor={'#8D8C8C'}
                  style={{
                    padding: 0,
                    color: 'black',
                    fontWeight: 'bold',
                    flex: 1,
                  }}
                />
                <TouchableOpacity
                  style={{
                    width: 23,
                    height: 23,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    marginLeft: 5,
                  }}
                  onPress={() => {
                    props.navigation.push('Search Result');
                  }}>
                  <Search
                    stroke="#242424"
                    width={20}
                    height={20}
                    strokeWidth={1.5}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              </View> */}

              {/* **************SEARCH BAR END************** */}

              <FlatList
                horizontal={false}
                style={{marginHorizontal: 8, marginTop: 15}}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={{
                      marginTop: 5,
                      marginLeft: 10,
                      backgroundColor:
                        item.id == selectedItem.id ? SECONDARY : '#EFEFEF',
                      // backgroundColor: '#EFEFEF',
                      height: 40,
                      width: '90%',
                      borderRadius: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => setSelectedItem(item)}>
                    <Text
                      style={{
                        marginLeft: 20,
                        alignSelf: 'center',
                        color: item.id == selectedItem.id ? WHITE : 'black',
                      }}>
                      {item.name}
                    </Text>
                    {item.id == selectedItem.id ? (
                      <AntDesign
                        name="checkcircleo"
                        size={20}
                        color={WHITE}
                        style={{
                          alignSelf: 'flex-end',
                          marginRight: 15,
                          marginBottom: 12,
                        }}
                      />
                    ) : null}
                  </TouchableOpacity>
                )}
              />
              <View style={{marginHorizontal: 20, marginTop: 10}}>
                <BtnComponent
                  placeholder={'Select'}
                  TextColor={White}
                  onPress={() => {
                    itemSelection();
                  }}
                />
              </View>
            </View>
          </Shadow>
        </LinearGradient>
      </Modal>
    </View>
  );
}
