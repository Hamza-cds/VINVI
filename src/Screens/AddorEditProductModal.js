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
import {
  editBusinessCardApiCall,
  editBusinessCardAddProductApiCall,
} from '../Apis/Repo';
import Loader from '../Components/Loader';
import {URL} from '../Constants/Constants';
// import DropDownPicker from 'react-native-dropdown-picker';

export default function AddorEditProductModal({
  visibleModal,
  setModalVisible,
  category,
  editProduct,
  isEdit,
  setIsEdit,
  editCategory,
  userData,
  setRefresh,
  selectedCategoryID,
  selectedCategory,
}) {
  // console.log('++++++++++++++++++++++++++++++++++++isEdit', isEdit);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImg, setProductImg] = useState('');
  const [productImageName, setProductImageName] = useState('');
  // let [selectedCategory, setSelectedCategory] = useState('');
  let [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // console.log('*****categoryList', categoryList);
  // console.log('*****editProduct', editProduct);
  // console.log('*****editCategory', editCategory);
  // console.log('*****selectedCategory', selectedCategory);
  // console.log('*****selectedCategoryID', selectedCategoryID);

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

  // const onSelectEdit = (index, value) => {
  //   setSelectedCategory((selectedCategory = value));
  // };

  const onUpdate = () => {
    if (isEdit == false) {
      var formdata = new FormData();
      formdata.append(`[0].Id`, '0');
      formdata.append(`[0].Name`, selectedCategory);
      formdata.append(`[0].BusinessCardIdFk`, JSON.stringify(userData.id));
      formdata.append(`[0].BusinessCategoryProduct[0].Id`, '0');
      formdata.append(
        `[0].BusinessCategoryProduct[0].BusinessCategoryIdFk`,
        JSON.stringify(selectedCategoryID),
      );
      formdata.append(`[0].BusinessCategoryProduct[0].Name`, productName);
      formdata.append(`[0].BusinessCategoryProduct[0].Price`, productPrice);
      formdata.append(`[0].BusinessCategoryProduct[0].product_image_file`, {
        uri: productImg.path,
        name: productImageName,
        type: productImg.mime,
      });

      console.log('formdata', formdata);

      setIsLoading(true);
      editBusinessCardAddProductApiCall(formdata)
        .then(res => res.json())
        .then(data => {
          console.log('response', data);
          if (data.status === 200 && data.success === true) {
            setIsLoading(false);
            setModalVisible(false);
            setRefresh(true);
          } else {
            setIsLoading(false);
            alert('Invalid Request');
          }
        })
        .catch(err => {
          setIsLoading(false);
          console.log('err', err);
        });
    } else {
      var formdata = new FormData();
      formdata.append(`[${editProduct.index}].Id`, '0');
      formdata.append(`[${editProduct.index}].Name`, selectedCategory);
      formdata.append(
        `[${editProduct.index}].BusinessCardIdFk`,
        JSON.stringify(userData.id),
      );
      formdata.append(
        `[${editProduct.index}].BusinessCategoryProduct[0].Id`,
        JSON.stringify(editProduct.id),
      );
      formdata.append(
        `[${editProduct.index}].BusinessCategoryProduct[0].BusinessCategoryIdFk`,
        JSON.stringify(editProduct.businessCategoryIdFk),
      );
      formdata.append(
        `[${editProduct.index}].BusinessCategoryProduct[0].Name`,
        productName ? productName : editProduct.name,
      );
      formdata.append(
        `[${editProduct.index}].BusinessCategoryProduct[0].Price`,
        productPrice ? productPrice : JSON.stringify(editProduct.price),
      );

      {
        productImg
          ? formdata.append(
              `[0].BusinessCategoryProduct[0].product_image_file`,
              {
                uri: productImg.path,
                name: productImageName,
                type: productImg.mime,
              },
            )
          : formdata.append(
              `[${editProduct.index}].BusinessCategoryProduct[0].Picture`,
              editProduct.picture,
            );
      }

      console.log('formdata', formdata);

      setIsLoading(true);
      editBusinessCardAddProductApiCall(formdata)
        .then(res => res.json())
        .then(data => {
          console.log('response', data);
          if (data.status === 200 && data.success === true) {
            setIsLoading(false);
            setModalVisible(false);
            setRefresh(true);
          } else {
            setIsLoading(false);
            alert('Invalid Request');
          }
        })
        .catch(err => {
          setIsLoading(false);
          console.log('err', err);
        });
    }
  };
  //   var formdata = new FormData();

  //   {
  //     console.log('isEdit', isEdit);
  //     isEdit == false
  //       ? formdata.append(`[0].Id`, '0') &&
  //         formdata.append(`[0].Name`, selectedCategory) &&
  //         formdata.append(
  //           `[0].BusinessCardIdFk`,
  //           JSON.stringify(userData.id),
  //         ) &&
  //         formdata.append(`[0].BusinessCategoryProduct[0].Id`, '0') &&
  //         formdata.append(
  //           `[0].BusinessCategoryProduct[0].BusinessCategoryIdFk`,
  //           JSON.stringify(selectedCategoryID),
  //         ) &&
  //         formdata.append(`[0].BusinessCategoryProduct[0].Name`, productName) &&
  //         formdata.append(
  //           `[0].BusinessCategoryProduct[0].Price`,
  //           productPrice,
  //         ) &&
  //         formdata.append(`[0].BusinessCategoryProduct[0].product_image_file`, {
  //           uri: productImg.path,
  //           name: productImageName,
  //           type: productImg.mime,
  //         })
  //       : formdata.append(`[${editProduct.index}].Id`, '0') &&
  //         formdata.append(`[${editProduct.index}].Name`, selectedCategory) &&
  //         formdata.append(
  //           `[${editProduct.index}].BusinessCardIdFk`,
  //           JSON.stringify(userData.id),
  //         ) &&
  //         formdata.append(
  //           `[${editProduct.index}].BusinessCategoryProduct[0].Id`,
  //           '0',
  //         ) &&
  //         formdata.append(
  //           `[${editProduct.index}].BusinessCategoryProduct[0].BusinessCategoryIdFk`,
  //           JSON.stringify(editProduct.businessCategoryIdFk),
  //         ) &&
  //         formdata.append(
  //           `[${editProduct.index}].BusinessCategoryProduct[0].Name`,
  //           editProduct.name,
  //         ) &&
  //         formdata.append(
  //           `[${editProduct.index}].BusinessCategoryProduct[0].Price`,
  //           JSON.stringify(editProduct.price),
  //         ) &&
  //         formdata.append(
  //           `[${editProduct.index}].BusinessCategoryProduct[0].Picture`,
  //           editProduct.picture,
  //         );
  //   }
  //   // {
  //   //   isEdit == false
  //   //     ? formdata.append(`[0].BusinessCategoryProduct[0].Id`, '0')
  //   //     : formdata.append(
  //   //         `[${editProduct.index}].BusinessCategoryProduct[0].Id`,
  //   //         '0',
  //   //       );
  //   //   // JSON.stringify(editProduct.id)
  //   // }

  //   console.log('formdata', formdata);

  //   setIsLoading(true);
  //   editBusinessCardApiCall(formdata)
  //     // .then(res => res.json())
  //     .then(data => {
  //       console.log('response', data);
  //       if (data.status === 200 && data.success === true) {
  //         setIsLoading(false);
  //         setModalVisible(false);
  //         setRefresh(true);
  //       } else {
  //         setIsLoading(false);
  //         alert('Invalid Request');
  //       }
  //     })
  //     .catch(err => {
  //       setIsLoading(false);
  //       console.log('err', err);
  //     });
  // };

  //   const onAdd = () => {};
  // const [openService, setOpenService] = useState(false);
  // const [valueService, setValueService] = useState([]);
  // const [itemsService, setItemsService] = useState([
  //   {label: 'Massage', value: 'Massage'},
  //   {label: 'Classic Haircut', value: 'Classic Haircut'},
  //   {label: 'Sauna', value: 'Sauna'},
  //   {label: 'Shave', value: 'Shave'},
  //   {label: 'Light Beard Trim', value: 'Light Beard Trim'},
  //   {label: 'Line It Up', value: 'Line It Up'},
  //   {label: 'Skin Fade', value: 'Skin Fade'},
  // ]);

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
              data={editCategory.length != 0 ? editCategory : categoryList}
              placeholder={'Select Category'}
              onCallBack={setSelectedCategory}
            /> */}

            {/* <DropDownPicker
              placeholder="Service name"
              placeholderStyle={{
                color: '#828080',
                fontSize: 14,
              }}
              textStyle={{
                fontSize: 14,
                color: '#828080',
              }}
              key={`id`}
              // multiple={false}
              itemKey="id"
              zIndex={555}
              // zIndexInverse={1000}
              open={openService}
              value={valueService}
              items={itemsService}
              setOpen={setOpenService}
              setValue={setValueService}
              setItems={setItemsService}
              listMode="SCROLLVIEW"
              multiple={true}
              containerStyle={{
                alignSelf: 'center',
              }}
              style={styles.dropDown}
            /> */}

            {/* <ModalDropdown
              options={
                editCategory.length != 0 ? editCategory : selectedCategory
              }
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
                <Text>
                  {selectedCategory
                    ? selectedCategory
                    : editProduct
                    ? editProduct.categoryName
                      ? editProduct.categoryName
                      : null
                    : null}
                </Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  size={30}
                  style={{alignSelf: 'flex-end'}}
                />
              </View>
            </ModalDropdown> */}

            <View style={{marginTop: 10}}>
              <OutlinedInputBox
                text={selectedCategory}
                editable={false}
                onChange={value => {
                  // console.log('name', value);
                  setProductName(value);
                }}
              />

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
              label={'Add product image'}
              svg={
                productImg
                  ? productImg
                  : editProduct
                  ? editProduct.picture
                    ? {uri: URL.concat(editProduct.picture)}
                    : null
                  : null
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

          {isLoading ? <Loader /> : null}
        </View>
      </View>
    </Modal>
  );
}
