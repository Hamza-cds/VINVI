import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {SECONDARY, FIFTH, WHITE, PRIMARY} from '../Constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {URL} from '../Constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BusinessDeleteProductApiCall} from '../Apis/Repo';

export default function ProductCard({
  item,
  index,
  isEdit,
  // setIsProductModalVisible,
  // setEditProduct,
  // setEdit,
  onPress,
  selectedCategory,
  setRefresh,
  // selectedCategoryID,
}) {
  // console.log('ye raha item ', item);
  let newItemObj = item;
  newItemObj.categoryName = selectedCategory;
  newItemObj.index = index;

  const onDeleteProduct = () => {
    let obj = {
      Id: item.id,
    };

    // setIsLoading(true);
    BusinessDeleteProductApiCall(obj)
      .then(res => {
        console.log('delete product response', res);
        if (res.data.status == 200 && res.data.success == true) {
          // setIsLoading(false);
          // alert('product deleted');
          setRefresh(true);
          // getBusinessData();
        } else {
          // setIsLoading(false);
          alert(data.data.message);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <View
      style={{
        display: 'flex',
        backgroundColor: FIFTH,
        width: 150,
        borderRadius: 8,
        marginRight: 20,
        marginTop: 10,
      }}>
      <Image
        source={
          item
            ? item.picture
              ? {uri: URL.concat(item.picture)}
              : require('../Assets/productPic.png')
            : null
        }
        style={{
          width: '100%',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          height: 120,
        }}></Image>
      {isEdit ? (
        <TouchableOpacity
          // activeOpacity={7}
          onPress={onDeleteProduct}
          style={{
            position: 'absolute',
            top: -10,
            right: -10,
          }}>
          <AntDesign name="closecircle" size={22} color={SECONDARY} />
        </TouchableOpacity>
      ) : null}
      <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
        <Text
          style={{
            fontSize: 14,
            color: SECONDARY,
            marginBottom: 1,
          }}>
          {/* {productName} */}
          {item.name}
        </Text>
        <Text style={{fontSize: 15, color: SECONDARY, fontWeight: 'bold'}}>
          {/* {productPrice} */}
          {item.price}
        </Text>

        {isEdit ? (
          <TouchableOpacity
            // onPress={() => {
            //   setEdit(true);
            //   setEditProduct(newItemObj);
            //   setIsProductModalVisible(true);
            // }}
            onPress={onPress}
            style={{
              alignSelf: 'flex-end',
              borderRadius: 5,
              marginRight: -5,
              marginTop: -25,
            }}>
            <Feather name="edit" size={20} color={SECONDARY} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
