import React, {useState} from 'react';
import {
  Modal,
  View,
  ScrollView,
  Picker,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import OutlinedInputBox from '../Components/OutlinedInputBox';
import UploadBtn from '../Components/UploadBtn';
import BtnComponent from '../Components/BtnComponent';
import Svg, {G, Path} from 'react-native-svg';
import ModalDropdown from 'react-native-modal-dropdown';
import {PRIMARY, WHITE} from '../Constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {editBusinessCardApiCall} from '../Apis/Repo';
import Select from '../Components/MultiSelect';
import {isNullOrEmpty} from '../Constants/TextUtils';

export default function ProductModal({
  visibleModal,
  setModalVisible,
  category,
  onPress,
  setSelectedIndex,
  product,
  setProduct,
}) {
  console.log('category', category);

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImg, setProductImg] = useState('');
  const [productImageName, setProductImageName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const ProductImage = image => {
    console.log('Product Image', image);
    var imageMime = image.mime;
    var name = imageMime.split('/')[1];
    setProductImageName('Vinvi.' + name);
    setProductImg(image);
  };

  const onSelect = (index, value) => {
    // console.log('value', value);
    // console.log('index', index);
    setSelectedIndex(index);
    setSelectedCategory(value);
  };

  const onSave = () => {
    if (isNullOrEmpty(selectedCategory)) {
      alert('Please select a category');
    } else if (isNullOrEmpty(productName)) {
      alert('Enter product name');
    } else if (isNullOrEmpty(productPrice)) {
      alert('Enter product price');
    } else if (isNullOrEmpty(productImg || productImageName)) {
      alert('Select image of the product');
    } else {
      let obj = {
        productName: productName.trim(),
        productPrice: productPrice.trim(),
        productImg: productImg ? productImg : null,
        productImageName: productImageName ? productImageName : null,
        selectedCategory: selectedCategory,
      };
      let newArr = product;
      newArr.push(obj);
      setProduct((product = newArr));
      setModalVisible(!visibleModal);
      setProductImg('');
      setSelectedCategory('');
      // onPress(obj);
    }
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visibleModal}>
      <View
        style={{
          backgroundColor: 'rgba(190,190,190,.8)',
          flex: 1,
          height: Dimensions.get('window').height,
          //   padding: 20,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#DCDCDC',
            width: '90%',
            height: '90%',
            alignSelf: 'center',
            marginVertical: '36%',
            borderRadius: 15,
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            style={{marginTop: 10, alignSelf: 'flex-end', marginRight: -10}}
            onPress={() => {
              setModalVisible(!visibleModal);
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

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginTop: 20}}>
            {/* <Select
              data={category}
              placeholder={'Select Category'}
              onCallBack={setSelectedCategory}
            /> */}

            <ModalDropdown
              options={category}
              // defaultValue={'Please Select...'}
              dropdownStyle={{
                width: '79%',
                marginTop: 9,
                marginLeft: -10,
                height: 110,
              }}
              dropdownTextHighlightStyle={{
                backgroundColor: PRIMARY,
                color: WHITE,
              }}
              textStyle={{
                fontSize: 14,
                marginLeft: 12,
                marginVertical: 3,
              }}
              style={{
                backgroundColor: '#EFEFEF',
                height: 46,
                width: '100%',
                borderRadius: 5,
                padding: 10,
              }}
              onSelect={onSelect}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>
                  {selectedCategory ? selectedCategory : 'Please Select...'}
                </Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  size={30}
                  style={{alignSelf: 'flex-end'}}
                />
              </View>
            </ModalDropdown>

            <View style={{marginTop: 10}}>
              <OutlinedInputBox
                placeholder="Name"
                inputType="text"
                onChange={value => {
                  // console.log('name', value);
                  setProductName(value);
                }}
              />
              <OutlinedInputBox
                placeholder="Price"
                KeyboardType={'numeric'}
                inputType="text"
                onChange={value => {
                  // console.log('price', value);
                  setProductPrice(value);
                }}
              />
            </View>

            <UploadBtn
              svg={productImg}
              placeholder="Upload Photo"
              onCallBack={ProductImage}
              label={'Select product image'}
            />
            <View style={{marginVertical: 10}}>
              <BtnComponent
                onPress={onSave}
                placeholder={'Save'}
                vertical={5}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
