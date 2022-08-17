import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {SECONDARY, WHITE} from '../Constants/Colors';
import BtnComponent from '../Components/BtnComponent';
import InputBoxWOPlaceholder from '../Components/InputBoxWOPlaceholder';
import Slider from '@react-native-community/slider';
import Select from '../Components/Select';

export default function SearchBuisnessScreen(props) {
  const [range, setRange] = useState(0);
  const [DATA, setDATA] = useState('');

  const data = [
    {
      id: 1,
      name: 'need data',
    },
    {
      id: 2,
      name: 'no data',
    },
  ];

  return (
    <View
      style={{
        paddingHorizontal: 20,
        backgroundColor: WHITE,
        paddingBottom: 20,
        height: '100%',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View style={{flex: 1, marginRight: 10}}>
          <Select data={data} placeholder={'Industry'} onCallBack={setDATA} />
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Select data={data} placeholder={'Area'} onCallBack={setDATA} />
        </View>
      </View>
      <Text>Radius</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text>0km</Text>
        <Slider
          style={{flex: 1, height: 50}}
          minimumValue={0}
          maximumValue={30}
          minimumTrackTintColor={SECONDARY}
          maximumTrackTintColor={SECONDARY}
          thumbTintColor={SECONDARY}
          step={2}
          onValueChange={value => {
            setRange(value.toFixed(0));
          }}
        />
        <Text>{range + ' km'}</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View style={{flex: 1}}></View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View style={{flex: 1, marginRight: 10}}></View>
        <View style={{flex: 1, marginLeft: 10}}></View>
      </View>
      {/* <Text>Name</Text> */}
      {/* <InputBoxWOPlaceholder /> */}
      <BtnComponent
        placeholder="Search"
        onPress={() => {
          props.navigation.navigate('SearchResult');
        }}
      />
    </View>
  );
}
