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
import Loader from '../Components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {BCDComplete} from '../../Store/Action';
import ProductModal from './ProductModal';

export default function NewBusinessCardScreen2(props) {
  const dispatch = useDispatch();
  const DATA = useSelector(state => state.BCData);

  console.log('BUSINESS_CARD_DATA_TEST', DATA);

  const [modalVisible, setModalVisible] = useState(false);
  let [productCategory, setProductCategory] = useState([]);
  // const [product, setProduct] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  let [productObject, setProductObject] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  const categoryNameArray = () => {
    let newCategoryArray = productCategory;
    newCategoryArray.push(categoryName);
    // setCategory([]);
    setProductCategory((productCategory = newCategoryArray));
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
          onPres={data => {
            setProductObject((productObject = data));
          }}
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

          {/* <FlatList
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
          /> */}
        </View>
        {/* {isLoading ? <Loader /> : null} */}
      </View>
    </SafeAreaView>
  );
}
