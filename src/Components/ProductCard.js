import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {SECONDARY, FIFTH, WHITE} from '../Constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {URL} from '../Constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ProductCard({
  item,
  isEdit,
  setIsProductModalVisible,
  setEditProduct,
  setEdit,
  onPress
}) {
  return (
    <View
      style={{
        display: 'flex',
        backgroundColor: FIFTH,
        width: 150,
        borderRadius: 8,
        marginRight: 20,
      }}>
      <View>

        <ImageBackground
          // source={productPic}
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
          }}>
            {isEdit == true ? 
          <TouchableOpacity
            activeOpacity={7}
            onPress={onPress}
            style={{
              alignSelf: 'flex-end',
              // marginTop: 5,
              padding: 2,
            }}>
            <AntDesign
              style={{marginLeft: 5}}
              name="closecircle"
              size={25}
              color={WHITE}
            />
          </TouchableOpacity>
          :null}
        </ImageBackground>
      </View>
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

        {isEdit == true ? (
          <TouchableOpacity
            onPress={() => {
              setEdit(true);
              setEditProduct(item);
              setIsProductModalVisible(true);
            }}
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
