import React, {useState, useRef} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function PickerComponent({
  placeholder,
  itemValues,
  itemLabels,
  inline,
  DATA,
}) {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const pickerRef = useRef();

  return (
    <>
      {inline ? null : <Text>{placeholder}</Text>}
      <View
        style={{
          height: inline ? 45 : 40,
          backgroundColor: '#eeeeee',
          borderRadius: 5,
          marginVertical: 10,
        }}>
        <Picker
          style={{marginTop: -6}}
          ref={pickerRef}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          {DATA.map(item => (
            <Picker.Item key={item} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>
    </>
  );
}
