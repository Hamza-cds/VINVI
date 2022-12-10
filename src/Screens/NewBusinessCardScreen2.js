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
import {GREY, PRIMARY, SECONDARY, WHITE} from '../Constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import Loader from '../Components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {BCDComplete} from '../../Store/Action';
import ProductModal from './ProductModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isNullOrEmpty, isNullOrEmptyArray} from '../Constants/TextUtils';

export default function NewBusinessCardScreen2(props) {
  // console.log('props', props);
  const dispatch = useDispatch();
  const DATA = useSelector(state => state.BCData);
  console.log('DATA', DATA);
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);
    });
  }, []);

  // console.log('BUSINESS_CARD_DATA_TEST', DATA);
  // console.log('userData', userData);

  let META = props.route.params.meta.businessCardArray;
  console.log('META', META);
  const [modalVisible, setModalVisible] = useState(false);
  let [productCategory, setProductCategory] = useState([]);
  let [product, setProduct] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  console.log('categoryName', categoryName);

  const categoryNameArray = () => {
    if (!isNullOrEmpty(categoryName)) {
      let newCategoryArray = [...productCategory];
      newCategoryArray.push(categoryName);
      setProductCategory((productCategory = newCategoryArray));
    } else {
      alert('Please add category');
    }
  };

  const onFinish = () => {
    let businessCategoryArray = [];
    let businessProductArray = [];
    for (let index = 0; index < productCategory.length; index++) {
      const element = productCategory[index];
      // console.log('element', element);

      for (let index = 0; index < product.length; index++) {
        const Element = product[index];
        if (element === Element.selectedCategory) {
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

    // console.log('businessCategoryArray', businessCategoryArray);

    var formdata = new FormData();
    formdata.append('Id', JSON.stringify(0));
    formdata.append('Name', DATA.b_Name);
    formdata.append('PhoneNo', DATA.b_Number);
    formdata.append('Address', DATA.b_Address);
    formdata.append('Description', DATA.b_OtherInfo);
    formdata.append('Tagline', DATA.b_Tagline);
    formdata.append('Website', DATA.b_Website);
    formdata.append('UserId', JSON.stringify(userData.id));
    // formdata.append('BusinessCardMeta', JSON.stringify([]));
    {
      DATA.b_Logo
        ? formdata.append('logo_image_file', {
            uri: DATA.b_Logo.path,
            name: DATA.b_LogoName,
            type: DATA.b_Logo.mime,
          })
        : formdata.append('logo_image_file', null);
    }

    {
      DATA.b_Cover
        ? formdata.append('cover_image_file', {
            uri: DATA.b_Cover.path,
            name: DATA.b_CoverName,
            type: DATA.b_Cover.mime,
          })
        : formdata.append('cover_image_file', null);
    }

    if (META.length == 0) {
      formdata.append('BusinessCardMeta', JSON.stringify([]));
    } else {
      for (let index = 0; index < META.length; index++) {
        const element = META[index];

        formdata.append(
          `BusinessCardMeta[${index}][BusinessKey]`,
          element.PersonalKey,
        );
        formdata.append(
          `BusinessCardMeta[${index}][BusinessValue]`,
          element.PersonalValue,
        );
        formdata.append(
          `BusinessCardMeta[${index}][Ishidden]`,
          element.Ishidden,
        );
      }
    }

    console.log('businessCategoryArray', businessCategoryArray);
    if (businessCategoryArray.length == 0) {
      formdata.append('BusinessCategory', JSON.stringify([]));
    } else {
      for (let index = 0; index < businessCategoryArray.length; index++) {
        const element = businessCategoryArray[index];

        formdata.append(`BusinessCategory[${index}].Id`, '0');
        formdata.append(
          `BusinessCategory[${index}].Name`,
          businessCategoryArray[index].Name,
        );

        if (element.BusinessCategoryProduct.length > 0) {
          for (
            let productIndex = 0;
            productIndex < element.BusinessCategoryProduct.length;
            productIndex++
          ) {
            const data = element.BusinessCategoryProduct[productIndex];
            formdata.append(
              `BusinessCategory[${index}].BusinessCategoryProduct[${productIndex}].Id`,
              JSON.stringify(data.Id),
            );
            formdata.append(
              `BusinessCategory[${index}].BusinessCategoryProduct[${productIndex}].Name`,
              data.Name,
            );
            formdata.append(
              `BusinessCategory[${index}].BusinessCategoryProduct[${productIndex}].Price`,
              data.Price,
            );
            formdata.append(
              `BusinessCategory[${index}].BusinessCategoryProduct[${productIndex}].product_image_file`,
              data.Picture,
            );
          }
        } else {
          formdata.append(
            `BusinessCategory[${index}].BusinessCategoryProduct`,
            '[]',
          );
        }
      }
    }

    console.log('formdata', formdata);

    setIsLoading(true);
    businessCardApiCall(formdata)
      .then(res => res.json())
      .then(data => {
        console.log('response', data);
        if (data.status === 200 && data.success === true) {
          setIsLoading(false);
          dispatch(BCDComplete(''));
          // props.navigation.reset({
          //   index: 0,
          //   routes: [{name: 'MyCardsDashboardScreen'}],
          // });
          props.navigation.navigate('MyCardsDashboardScreen');
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

  const FunDelProduct = index => {
    let newArr = [...product];
    setProduct((product = newArr.filter((item, Index) => Index !== index)));
  };

  return (
    <SafeAreaView style={{height: Height, width: Width}}>
      <Header
        navigation={props.navigation}
        variant="white"
        headerName="Add Card"
        onPress={() => {
          props.navigation.push('Dashboard');
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
              <View style={{marginTop: 20}}>
                <BtnComponent placeholder={'Finish'} onPress={onFinish} />
              </View>
            )}
            renderItem={({item, index}) => (
              <View>
                <View
                  style={{
                    // height: 140,
                    width: 140,
                    backgroundColor: 'black',
                    borderRadius: 5,
                    marginHorizontal: 5,
                    marginTop: 15,
                    marginRight: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      FunDelProduct(index);
                    }}
                    activeOpacity={0.7}
                    style={{
                      backgroundColor: GREY,
                      alignSelf: 'flex-end',
                      height: 25,
                      width: 25,
                      borderRadius: 25,
                      marginTop: -10,
                      marginRight: -10,
                      padding: 2,
                    }}>
                    <Entypo
                      name="cross"
                      size={22}
                      color={PRIMARY}
                      style={{alignSelf: 'center'}}
                    />
                  </TouchableOpacity>
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
        {isLoading ? <Loader /> : null}
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
