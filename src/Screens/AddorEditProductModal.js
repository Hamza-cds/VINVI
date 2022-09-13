import React, {useState, useEffect} from 'react';
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

export default function AddorEditProductModal({
  visibleModal,
  setModalVisible,
  category,
  editProduct,
  isEdit,
  editCategory,
}) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImg, setProductImg] = useState('');
  const [productImageName, setProductImageName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  let [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    categoryList.length <= 0
      ? category.map(e => {
          let arr = [...categoryList];
          arr.push(e.name);
          setCategoryList((categoryList = arr));
          console.log('categoryList', categoryList);
        })
      : setCategoryList(categoryList);
  }, []);

  const ProductImage = image => {
    console.log('Product Image', image);
    var imageMime = image.mime;
    var name = imageMime.split('/')[1];
    setProductImageName('Vinvi.' + name);
    setProductImg(image);
  };

  const onSelectEdit = (index, value) => {
    setSelectedCategory(value);
  };

  const onUpdate = () => {
    var formdata = new FormData();

    formdata.append(`BusinessCategory.Id`, '0');
    formdata.append(`BusinessCategory.Name`, selectedCategory);
    {
      isEdit == false
        ? formdata.append(`BusinessCategory.BusinessCategoryProduct.Id`, '0')
        : formdata.append(
            `BusinessCategory.BusinessCategoryProduct.Id`,
            JSON.stringify(editProduct.id),
          );
    }
    formdata.append(
      `BusinessCategory.BusinessCategoryProduct.Name`,
      productName ? productName : editProduct.name,
    );
    formdata.append(
      `BusinessCategory.BusinessCategoryProduct.Price`,
      productPrice ? productPrice : editProduct.price,
    );
    formdata.append(
      `BusinessCategory.BusinessCategoryProduct.product_image_file`,
      productImg
        ? {uri: productImg.path, name: productImageName, type: productImg.mime}
        : editProduct.picture,
    );

    console.log('formdata', formdata);

    // setIsLoading(true);
    editBusinessCardApiCall(formdata)
      .then(res => res.json())
      .then(data => {
        console.log('response', data);
        if (data.status === 200 && data.success === true) {
          // setIsLoading(false);
          props.navigation.replace('MyCardsDashboardScreen');
        } else {
          // setIsLoading(false);
          alert('Invalid Request');
        }
      })
      .catch(err => {
        // setIsLoading(false);
        console.log('err', err);
      });
  };

  //   const onAdd = () => {};

  return (
    <Modal animationType="slide" transparent={true} visible={visibleModal}>
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

          <ScrollView style={{marginTop: 20}}>
            {/* <Select
              data={category}
              placeholder={'Select Category'}
              onCallBack={setSelectedCategory}
            /> */}

            <ModalDropdown
              options={editCategory.length != 0 ? editCategory : categoryList}
              defaultValue={'Select category'}
              dropdownStyle={{
                width: '80%',
                marginTop: 9,
                marginLeft: -10,
                height: 110,
              }}
              dropdownTextHighlightStyle={{
                backgroundColor: PRIMARY,
                color: WHITE,
              }}
              textStyle={{fontSize: 14, marginLeft: 12, marginVertical: 3}}
              style={{
                backgroundColor: '#EFEFEF',
                height: 46,
                width: '100%',
                borderRadius: 5,
                padding: 10,
              }}
              onSelect={onSelectEdit}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{selectedCategory}</Text>
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
                text={isEdit == true ? editProduct.name : null}
                onChange={value => {
                  // console.log('name', value);
                  setProductName(value);
                }}
              />
              <OutlinedInputBox
                placeholder="Price"
                inputType="text"
                text={isEdit == true ? editProduct.price : null}
                onChange={value => {
                  // console.log('price', value);
                  setProductPrice(value);
                }}
              />
            </View>

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
              onCallBack={ProductImage}
            />

            <BtnComponent
              onPress={onUpdate}
              placeholder={'Save'}
              vertical={5}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
