import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {SECONDARY, TEXT_COLOR} from '../Constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

export default function RegisterInputBox({
  secure,
  placeholder,
  inputType,
  onChange,
  ERROR,
  ERROR_MESSAGE,
  maxLength,
  keyboardType,
  backgroundColor,
}) {
  const [isfocused, setIsfocused] = useState(false);

  const [secureTextEntry, setSecureTextEntry] = useState(secure);
  // let secureTextEntry;
  // if (inputType === 'password') {
  //   secureTextEntry = true;
  //   // inputType === 'email-address';
  // } else {
  //   secureTextEntry = false;
  // }
  return (
    <>
      {/* {ERROR ? (
        <Text style={{alignSelf: 'flex-end', color: 'red'}}>
          {ERROR_MESSAGE}
        </Text>
      ) : null} */}

      <KeyboardAvoidingView behavior="padding">
        <View
          activeOpacity={1}
          style={{
            width: '100%',
            backgroundColor: backgroundColor
              ? backgroundColor
              : 'rgba(255,255,255,.7)',
            borderRadius: 5,
            marginTop: 8,
          }}>
          {isfocused ? (
            <View>
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
                    marginRight: 10,
                    alignSelf: 'flex-end',
                    marginTop: -18,
                    fontSize: 11,
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
              flex: 1,
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

          {secure ? (
            <TouchableOpacity
              style={{
                width: 40,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-end',
                marginTop: -30,
              }}
              onPress={() => {
                secureTextEntry
                  ? setSecureTextEntry(false)
                  : setSecureTextEntry(true);
              }}>
              {secureTextEntry ? (
                <Feather
                  name={'eye-off'}
                  stroke="#242424"
                  fill="#ffffff"
                  size={16}
                  strokeWidth={1.5}
                  style={{marginTop: -23}}
                />
              ) : (
                <Feather
                  name={'eye'}
                  stroke="#242424"
                  fill="#ffffff"
                  size={16}
                  strokeWidth={1.5}
                  style={{marginTop: -22}}
                />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
