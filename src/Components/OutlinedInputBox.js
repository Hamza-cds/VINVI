import React, {useState} from 'react';
import {Text, TouchableOpacity, TextInput, View} from 'react-native';
import {SECONDARY, TEXT_COLOR} from '../Constants/Colors';

export default function LoginInputBox({
  placeholder,
  inputType,
  onChange,
  style,
  multiline,
  maxLength,
  inputValue,
  KeyboardType,
  text,
  editable,
  label,
  error,
  errorMsg,
}) {
  const [isfocused, setIsfocused] = useState(false);
  let secureTextEntry;

  if (inputType === 'password') {
    secureTextEntry = true;
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
          backgroundColor: '#EFEFEF',
          borderRadius: 5,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: isfocused ? SECONDARY : '#EFEFEF',
          position: 'relative',
          ...style,
        }}>
        {/* {isfocused ? (
          <View
            style={{
              position: 'absolute',
              top: 5,
              left: 5,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: SECONDARY,
              }}>
              {placeholder}
            </Text>
          </View>
        ) : null} */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 20,
          }}>
          <Text
            style={{
              marginTop: 3,
              marginLeft: 20,
              color: 'black',
              fontSize: 12,
            }}>
            {label}
          </Text>
          {error == true ? (
            <Text
              style={{
                color: 'red',
                marginRight: 15,
                marginTop: 2,
              }}>
              {errorMsg}
            </Text>
          ) : null}
        </View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={'#A8A8A8'}
          maxLength={maxLength}
          // placeholderTextColor={TEXT_COLOR}
          editable={editable}
          style={{
            width: '100%',
            paddingHorizontal: 20,
            height: multiline ? 200 : 30,
            textAlignVertical: multiline ? 'top' : 'center',
            color: SECONDARY,
            paddingVertical: multiline ? 10 : 2,
          }}
          type={inputType}
          keyboardType={KeyboardType}
          secureTextEntry={secureTextEntry}
          onChangeText={onChange}
          onFocus={() => {
            setIsfocused(true);
          }}
          onBlur={() => {
            setIsfocused(false);
          }}
          // value={inputValue}
          // onPressIn={() => {
          //   setIsfocused(true);
          // }}
          // onBlur={() => {
          //   setIsfocused(false);
          // }}
          multiline={multiline}>
          <Text>{text ? text : null}</Text>
        </TextInput>
      </TouchableOpacity>
    </>
  );
}
