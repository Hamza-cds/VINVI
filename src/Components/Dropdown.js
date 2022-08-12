import React, {useState} from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Dropdown({LABEL, LABEL1, LABEL2, placeholder, OPEN}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Daily');
  const [items, setItems] = useState([
    {label: LABEL, value: LABEL},
    {label: LABEL1, value: LABEL1},
    {label: LABEL2, value: LABEL2},
  ]);
  return (
    <View style={{marginVertical: 10}}>
      <DropDownPicker
        containerProps={{
          height: open === true ? 50 : null,
        }}
        placeholder={placeholder}
        placeholderStyle={{
          color: '#ABABAB',
          marginLeft: 10,
        }}
        key={`id`}
        multiple={false}
        itemKey="id"
        zIndex={2000}
        zIndexInverse={1000}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        // onChangeValue={onChangeDropDownValue}
        setItems={setItems}
        listMode="SCROLLVIEW"
        containerStyle={{
          width: '100%',
          alignSelf: 'center',
        }}
        dropDownContainerStyle={{
          backgroundColor: 'white',
          zIndex: 1000,
          elevation: 1000,
        }}
        dropDownDirection={'BOTTOM'}
        style={{borderWidth: 0.6, color: 'black'}}></DropDownPicker>
    </View>
  );
}
