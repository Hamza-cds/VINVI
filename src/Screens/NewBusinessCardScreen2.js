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
import {PRIMARY, SECONDARY, WHITE} from '../Constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import Loader from '../Components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {BCDComplete} from '../../Store/Action';
import ProductModal from './ProductModal';
import {stringsEqual} from '../Constants/TextUtils';

export default function NewBusinessCardScreen2(props) {
  const dispatch = useDispatch();
  const DATA = useSelector(state => state.BCData);

  console.log('BUSINESS_CARD_DATA_TEST', DATA);

  const [modalVisible, setModalVisible] = useState(false);
  let [productCategory, setProductCategory] = useState([]);
  let [product, setProduct] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  console.log('product', product);

  const categoryNameArray = () => {
    let newCategoryArray = [...productCategory];
    newCategoryArray.push(categoryName);
    setProductCategory((productCategory = newCategoryArray));
  };

  const onFinish = () => {
    let businessCategoryArray = [];
    let businessProductArray = [];
    for (let index = 0; index < productCategory.length; index++) {
      const element = productCategory[index];
      // console.log('element', element);

      for (let index = 0; index < product.length; index++) {
        const Element = product[index];
        // console.log('Element', Element);
        if (element === Element.selectedCategory) {
          // console.log('Element', Element.selectedCategory);
          // console.log('element', element);

          let productObj = {
            Id: 0,
            Name: Element.productName,
            Price: Element.productPrice,
            Picture: {
              uri: Element.productImg.path,
              name: Element.productImageName,
              type: Element.productImg.mime,
            },
            BusinessCategoryIdFk: 0,
          };
          businessProductArray.push(productObj);
        }
      }

      let categoryObj = {
        Id: 0,
        Name: element,
        BusinessCardIdFk: 0,
        BusinessCategoryProduct: businessProductArray,
      };

      businessCategoryArray.push(categoryObj);
      businessProductArray = [];
    }

    console.log('businessCategoryArray', businessCategoryArray);

    var formdata = new FormData();
    formdata.append('id', 0);
    formdata.append('Name', DATA.b_Name);
    formdata.append('PhoneNo', DATA.b_Number);
    formdata.append('Address', DATA.b_Address);
    formdata.append('Description', DATA.b_OtherInfo);
    formdata.append('Tagline', DATA.b_Tagline);
    formdata.append('Website', DATA.b_Website);
    // formdata.append('UserId', JSON.stringify(userData.id));
    formdata.append('logo_image_file', {
      uri: DATA.b_Logo.path,
      name: DATA.b_LogoName,
      type: DATA.b_Logo.mime,
    });
    formdata.append('cover_image_file', {
      uri: DATA.b_Cover.path,
      name: DATA.b_CoverName,
      type: DATA.b_Cover.mime,
    });

    for (let index = 0; index < businessCategoryArray.length; index++) {
      const element = businessCategoryArray[index];

      formdata.append(`BusinessCategory[${index}][Id]`, 0);
      formdata.append(
        `BusinessCategory[${index}][Id]`,
        businessCategoryArray[index].Name,
      );

      for (
        let productIndex = 0;
        productIndex < element.BusinessCategoryProduct.length;
        productIndex++
      ) {
        const data = element.BusinessCategoryProduct[productIndex];
        formdata.append(
          `BusinessCategory[${index}][Id][BusinessCategoryProduct][${productIndex}][Id]`,
          data.Id,
        );
        formdata.append(
          `BusinessCategory[${index}][Id][BusinessCategoryProduct][${productIndex}][Name]`,
          data.Name,
        );
        formdata.append(
          `BusinessCategory[${index}][Id][BusinessCategoryProduct][${productIndex}][Price]`,
          data.Price,
        );
        formdata.append(
          `BusinessCategory[${index}][Id][BusinessCategoryProduct][${productIndex}][Picture
        ]`,
          data.Picture,
        );
      }
    }

    console.log('formdata', formdata);
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
        <ProductModal
          visibleModal={modalVisible}
          setModalVisible={setModalVisible}
          category={productCategory}
          product={product}
          setProduct={setProduct}
          setSelectedIndex={setSelectedIndex}
        />

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
              backgroundColor: SECONDARY,
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
            data={productCategory}
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
              backgroundColor: SECONDARY,
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
            style={{marginHorizontal: 5, marginBottom: 240}}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={product}
            keyExtractor={item => item.id}
            ListFooterComponent={() => (
              <BtnComponent placeholder={'Finish'} onPress={onFinish} />
            )}
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
                    marginRight: 30,
                  }}>
                  <Image
                    source={{uri: item.productImg.path}}
                    style={{height: 140, width: 140, borderRadius: 5}}
                  />
                </View>

                <Text style={{marginHorizontal: 7}}>{item.productName}</Text>
                <Text style={{marginHorizontal: 7}}>{item.productPrice}</Text>
              </View>
            )}
          />
        </View>
        {/* {isLoading ? <Loader /> : null} */}
      </View>
    </SafeAreaView>
  );
}

// let categoryObj = {
//   Id: 0,
//   Name: element,
//   BusinessCardIdFk: 0,
//   BusinessCategoryProduct: businessProductArray,

//   // BusinessCategoryProduct: [
//   //   {
//   //     Id: 0,
//   //     Name: product.productName,
//   //     // Picture: product.productImg.path,
//   //     BusinessCategoryIdFk: 0,
//   //   },
//   // ],
// };
// businessCategoryArray.push(categoryObj);
