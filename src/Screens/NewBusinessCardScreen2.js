import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, Modal, Image} from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import OutlinedInputBox from '../Components/OutlinedInputBox';
import UploadBtn from '../Components/UploadBtn';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {G, Path} from 'react-native-svg';
import {Height, Width} from '../Constants/Constants';
import {businessCardApiCall} from '../Apis/Repo';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {PRIMARY, WHITE} from '../Constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';

export default function NewBusinessCardScreen2(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [pic, setPic] = useState('');
  // const [id, setID] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  console.log('product', product);

  const getBase64 = type => {
    // setID(id + 1);
    console.log('image base 64', pic);
    console.log('type', type);
    console.log('name', name);
    console.log('price', price);
    // const base64Converted = 'data:image/png;base64,' + pic;
    let obj = {name: name, price: price, img: pic};
    let newArray = product;
    // newArray.push(base64Converted);
    newArray.push(obj);

    setProduct([]);
    setProduct(newArray);
  };

  const categoryNameArray = () => {
    let newCategoryArray = category;
    newCategoryArray.push(categoryName);
    setCategory([]);
    setCategory(newCategoryArray);
  };

  return (
    <SafeAreaView style={{height: Height, width: Width}}>
      <Header
        navigation={props.navigation}
        variant="white"
        headerName="Add Card"
        onPress={() => {
          props.navigation.push('NewBuisnessCard1');
        }}
      />
      <View style={{backgroundColor: WHITE, flex: 1, paddingBottom: 100}}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View
            style={{
              backgroundColor: '#D3D3D3',
              height: '70%',
              width: '90%',
              alignSelf: 'center',
              marginVertical: 100,
              borderRadius: 15,
              paddingHorizontal: 20,
            }}>
            <ScrollView style={{marginTop: 20}}>
              <View style={{marginBottom: 20}}>
                <Picker
                  selectedValue={selectedCategory}
                  mode={'dropdown'}
                  style={{
                    backgroundColor: '#EFEFEF',
                    height: 40,
                    width: '100%',
                    borderRadius: 5,
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedCategory(itemValue)
                  }>
                  {category.map((item, index) => (
                    <Picker.Item label={item} value={item} />
                  ))}
                </Picker>
              </View>

              <OutlinedInputBox
                placeholder="Name"
                inputType="text"
                onChange={value => {
                  setName(value);
                }}
              />
              <OutlinedInputBox
                placeholder="Price"
                inputType="text"
                onChange={value => {
                  setPrice(value);
                }}
              />

              <UploadBtn
                svg={
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={42.736}
                    height={51.223}
                    viewBox="0 0 42.736 51.223">
                    <G data-name="user (2)" fill="#fff">
                      <Path
                        data-name="Path 2128"
                        d="M33.382 12.337a11.939 11.939 0 01-3.61 8.723 11.938 11.938 0 01-8.724 3.614h-.006a11.94 11.94 0 01-8.717-3.614 11.937 11.937 0 01-3.614-8.724 11.936 11.936 0 013.614-8.722A11.935 11.935 0 0121.039 0h.006a11.942 11.942 0 018.727 3.615 11.937 11.937 0 013.614 8.722zm0 0"
                      />
                      <Path
                        data-name="Path 2129"
                        d="M42.737 42.414a8.5 8.5 0 01-2.527 6.435 9.093 9.093 0 01-6.51 2.374H9.036a9.089 9.089 0 01-6.509-2.375A8.5 8.5 0 010 42.414c0-1.029.034-2.046.1-3.025a30.282 30.282 0 01.415-3.238 25.55 25.55 0 01.8-3.253 16.135 16.135 0 011.338-3.036 11.489 11.489 0 012.017-2.629 8.9 8.9 0 012.9-1.821 10.019 10.019 0 013.7-.669 3.749 3.749 0 012 .849c.61.4 1.314.852 2.09 1.348a11.933 11.933 0 002.7 1.191 10.769 10.769 0 002.978.528q.164.006.327.006a10.745 10.745 0 003.306-.534 11.933 11.933 0 002.7-1.191c.785-.5 1.488-.954 2.09-1.347a3.745 3.745 0 012.005-.85 10.025 10.025 0 013.7.669 8.9 8.9 0 012.9 1.821 11.449 11.449 0 012.017 2.629 16.082 16.082 0 011.338 3.035 25.528 25.528 0 01.8 3.255 30.567 30.567 0 01.414 3.236c.069.975.1 1.993.1 3.026zm0 0"
                      />
                      <Path
                        data-name="Path 2130"
                        d="M21.046 24.674h-.006V0h.006a11.942 11.942 0 018.724 3.614 11.937 11.937 0 013.614 8.722 11.939 11.939 0 01-3.614 8.724 11.938 11.938 0 01-8.724 3.614zm0 0"
                      />
                      <Path
                        data-name="Path 2131"
                        d="M42.736 42.414a8.5 8.5 0 01-2.527 6.435 9.093 9.093 0 01-6.51 2.375h-12.66V28.659q.164.006.327.006a10.745 10.745 0 003.306-.534 11.933 11.933 0 002.7-1.191c.785-.5 1.488-.954 2.09-1.347a3.745 3.745 0 012.005-.85 10.026 10.026 0 013.7.669 8.9 8.9 0 012.9 1.821 11.448 11.448 0 012.017 2.629 16.083 16.083 0 011.338 3.035 25.536 25.536 0 01.8 3.255 30.57 30.57 0 01.414 3.236c.069.975.1 1.993.1 3.026zm0 0"
                      />
                    </G>
                  </Svg>
                }
                placeholder="Upload Photo"
                onCallBack={setPic}
              />
            </ScrollView>
            <View>
              <BtnComponent
                onPress={() => {
                  getBase64();
                  setModalVisible(false);
                }}
                placeholder={'Save'}
                vertical={5}
              />
              <BtnComponent
                onPress={() => {
                  setModalVisible(false);
                }}
                placeholder={'Cancil'}
                backgroundView={WHITE}
                COLOR={'black'}
                vertical={15}
              />
            </View>
          </View>
        </Modal>

        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
          }}>
          <OutlinedInputBox
            placeholder="Add Category"
            inputType="text"
            onChange={value => {
              setCategoryName(value);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              categoryNameArray();
            }}
            style={{
              backgroundColor: PRIMARY,
              width: '100%',
              height: 45,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: WHITE,
                fontSize: 16,
                fontWeight: '700',
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              Add Category
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'black',
              marginTop: 10,
            }}>
            Categories
          </Text>
          <FlatList
            style={{marginTop: 15}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={category}
            renderItem={({item, index}) => (
              <View
                style={{
                  height: 25,
                  backgroundColor: '#D3D3D3',
                  borderRadius: 5,
                  marginHorizontal: 5,
                }}>
                <Text style={{marginHorizontal: 5, marginTop: 3}}>{item}</Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              backgroundColor: PRIMARY,
              width: '100%',
              height: 45,
              borderRadius: 5,
              marginTop: 10,
              // marginLeft: -69,
            }}>
            <Text
              style={{
                color: WHITE,
                fontSize: 16,
                fontWeight: '700',
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              Add Product
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'black',
              marginTop: 15,
            }}>
            Newly added
          </Text>

          <FlatList
            style={{marginHorizontal: 5}}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={product}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <View>
                <View
                  style={{
                    height: 140,
                    width: 140,
                    backgroundColor: 'black',
                    borderRadius: 5,
                    marginHorizontal: 5,
                    marginTop: 15,
                  }}>
                  <Image
                    source={{uri: item.pic}}
                    style={{height: 30, width: 30, borderRadius: 5}}
                  />
                </View>

                <Text style={{marginHorizontal: 7}}>{item.name}</Text>
                <Text style={{marginHorizontal: 7}}>{item.price}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
