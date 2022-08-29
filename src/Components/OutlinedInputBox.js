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
        {isfocused ? (
          <View
            style={{
              position: 'absolute',
              top: -20,
              left: 0,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: SECONDARY,
              }}>
              {placeholder}
            </Text>
          </View>
        ) : null}
        <TextInput
          placeholder={placeholder}
          maxLength={maxLength}
          placeholderTextColor={TEXT_COLOR}
          style={{
            width: '100%',
            paddingHorizontal: 20,
            height: multiline ? 200 : 45,
            textAlignVertical: multiline ? 'top' : 'center',
            color: SECONDARY,
            paddingVertical: multiline ? 15 : 0,
          }}
          type={inputType}
          keyboardType={KeyboardType}
          secureTextEntry={secureTextEntry}
          onChangeText={onChange}
          // value={inputValue}
          onPressIn={() => {
            setIsfocused(true);
          }}
          onBlur={() => {
            setIsfocused(false);
          }}
          multiline={multiline}>
          <Text>{text ? text : null}</Text>
        </TextInput>
      </TouchableOpacity>
    </>
  );
}
