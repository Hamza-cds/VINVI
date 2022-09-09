import React from 'react';
import {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {SECONDARY, FIFTH} from '../Constants/Colors';

export default function ProductCard({productPic, productName, productPrice}) {
  return (
    <View
      style={{
        display: 'flex',
        backgroundColor: FIFTH,
        width: 150,
        borderRadius: 8,
        marginRight: 20,
      }}>
      <Image
        source={productPic}
        style={{
          width: '100%',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          height: 120,
        }}
      />
      <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
        <Text
          style={{
            fontSize: 14,
            color: SECONDARY,
            marginBottom: 1,
          }}>
          {productName}
          {/* {e.name} */}
        </Text>
        <Text style={{fontSize: 15, color: SECONDARY, fontWeight: 'bold'}}>
          {productPrice}
          {/* {e.price} */}
        </Text>
      </View>
    </View>
  );
}
