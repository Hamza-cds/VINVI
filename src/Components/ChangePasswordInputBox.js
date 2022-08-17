import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import {SECONDARY, TEXT_COLOR} from '../Constants/Colors';
import Svg, {Path} from 'react-native-svg';

export default function ChangePasswordInputBox({
  placeholder,
  onChange,
  text,
  icon,
}) {
  const [focus, setFocus] = useState(false);
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 20,
        backgroundColor: '#eeeeee',
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: focus ? 1 : 0,
        borderColor: SECONDARY,
      }}>
      {icon}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={TEXT_COLOR}
        style={{paddingHorizontal: 20}}
        onChangeText={onChange}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}>
        <Text>{text ? text : null}</Text>
      </TextInput>
    </View>
  );
}
