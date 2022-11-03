import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {SECONDARY, WHITE} from '../Constants/Colors';
import BtnComponent from '../Components/BtnComponent';
import PickerComponent from '../Components/PickerComponent';
import InputBoxWOPlaceholder from '../Components/InputBoxWOPlaceholder';
import Slider from '@react-native-community/slider';
import {GetAllLookupDetailApiCall, LookupDetailApiCall} from '../Apis/Repo';
import Select from '../Components/Select';

const SearchIndividualScreen = props => {
  const navigation = props.navigation;
  let [skillData, setSkillData] = useState([]);
  let [educationData, setEducationData] = useState([]);
  let [professionData, setProfessionData] = useState([]);
  let [languagesData, setLanguagesData] = useState([]);
  let [lookupData, setLookupData] = useState([]);
  const [range, setRange] = useState(0);
  const [DATA, setDATA] = useState('');

  console.log('skillData', skillData);
  // getSkills();
  // getEducation();

  useEffect(() => {
    getAllLookupdetail();
  }, []);

  const getAllLookupdetail = () => {
    GetAllLookupDetailApiCall()
      .then(res => {
        setLookupData((lookupData = res.data.result));

        for (let index = 0; index < lookupData.length; index++) {
          const element = lookupData[index];
          if (element.lookupId == 1) {
            let arraySkill = skillData;
            arraySkill.push(element);
            setSkillData((skillData = arraySkill));
          } else if (element.lookupId == 3) {
            let arrayEducation = educationData;
            arrayEducation.push(element);
            setEducationData((educationData = arrayEducation));
          } else if (element.lookupId == 4) {
            let arrayProfession = professionData;
            arrayProfession.push(element);
            setProfessionData((professionData = arrayProfession));
          } else if (element.lookupId == 7) {
            let arrayLangauge = languagesData;
            arrayLangauge.push(element);
            setLanguagesData((languagesData = arrayLangauge));
          }
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  // const getSkills = () => {
  //   LookupDetailApiCall(1)
  //     .then(res => {
  //       // console.log('skillData', res.data.result);
  //       setSkillData((skillData = res.data.result));
  //     })
  //     .catch(err => {
  //       console.log('err', err);
  //     });
  // };

  // const getEducation = () => {
  //   LookupDetailApiCall(3)
  //     .then(res => {
  //       // console.log('educationData', res.data.result);
  //       setEducationData((educationData = res.data.result));
  //       console.log('educationData', educationData);
  //     })
  //     .catch(err => {
  //       console.log('err', err);
  //     });
  // };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        backgroundColor: WHITE,
        paddingBottom: 20,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View
          style={{
            flex: 1,
            marginRight: 10,
          }}>
          {/* <PickerComponent
            placeholder="Profession"
            // itemLabels={('hello', 'Machenic')}
            // itemValues={('hello', 'Machenic')}
            DATA={professionData}
          /> */}
          <Select
            data={professionData}
            placeholder={'Profession'}
            onCallBack={setDATA}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 10,
          }}>
          {/* <PickerComponent placeholder="Education" DATA={educationData} /> */}
          <Select
            data={educationData}
            placeholder={'Education'}
            onCallBack={setDATA}
          />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View
          style={{
            flex: 1,
            marginRight: 10,
          }}>
          {/* <PickerComponent placeholder="Habbits" DATA={skillData} /> */}
          <Select
            data={skillData}
            placeholder={'Habbits'}
            onCallBack={setDATA}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 10,
          }}>
          {/* <PickerComponent placeholder="Interests" DATA={educationData} /> */}
          <Select
            data={professionData}
            placeholder={'Interests'}
            onCallBack={setDATA}
          />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View
          style={{
            flex: 1,
            marginRight: 10,
          }}>
          {/* <PickerComponent placeholder="Skills" DATA={educationData} /> */}
          <Select
            data={skillData}
            placeholder={'Skills'}
            onCallBack={setDATA}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 10,
          }}>
          {/* <PickerComponent placeholder="Languages" DATA={skillData} /> */}
          <Select
            data={languagesData}
            placeholder={'Languages'}
            onCallBack={setDATA}
          />
        </View>
      </View>
      <InputBoxWOPlaceholder placeholder={'location'} />

      <Text style={{marginTop: 10}}>Radius</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text>0km</Text>
        <Slider
          style={{
            flex: 1,
            height: 50,
          }}
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

      {/* <InputBoxWOPlaceholder /> */}
      <BtnComponent
        placeholder="Search"
        onPress={() => {
          // props.navigation.navigate('SearchResult');
        }}
      />
    </View>
  );
};

export default SearchIndividualScreen;
