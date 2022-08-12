import React, {useState} from 'react';
import {Text, TouchableOpacity, TextInput, View} from 'react-native';
import {SECONDARY, TEXT_COLOR} from '../Constants/Colors';

export default function RegisterInputBox({
  placeholder,
  inputType,
  onChange,
  ERROR,
  ERROR_MESSAGE,
  maxLength,
  keyboardType,
}) {
  const [isfocused, setIsfocused] = useState(false);
  let secureTextEntry;
  if (inputType === 'password') {
    secureTextEntry = true;
    // inputType === 'email-address';
  } else {
    secureTextEntry = false;
  }
  return (
    <>
      {/* {ERROR ? (
        <Text style={{alignSelf: 'flex-end', color: 'red'}}>
          {ERROR_MESSAGE}
        </Text>
      ) : null} */}
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: '100%',
          backgroundColor: 'rgba(255,255,255,.7)',
          borderRadius: 5,
          marginVertical: 10,
        }}>
        {isfocused ? (
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                width: '100%',
                paddingHorizontal: 20,
                paddingTop: 10,
                fontSize: 12,
                color: SECONDARY,
              }}>
              {placeholder}
            </Text>
            {ERROR ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: -100,
                  marginTop: 10,
                  fontSize: 12,
                }}>
                {ERROR_MESSAGE}
              </Text>
            ) : null}
          </View>
        ) : null}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={TEXT_COLOR}
          style={{
            width: '100%',
            paddingHorizontal: 20,
            height: 50,
            color: SECONDARY,
          }}
          type={inputType}
          keyboardType={keyboardType}
          onChangeText={onChange}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          onPressIn={() => {
            setIsfocused(true);
          }}
          onBlur={() => {
            setIsfocused(false);
          }}
        />
      </TouchableOpacity>
    </>
  );
}
