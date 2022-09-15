import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
} from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import OutlinedInputBox from '../Components/OutlinedInputBox';
import Svg, {Path} from 'react-native-svg';
import Select from '../Components/Select';
import _ from 'lodash';
import Loader from '../Components/Loader';
import {PersonalCardEditApiCall} from '../Apis/Repo';

export function EducationEditModalAdd({
  modalVisible,
  setModalVisible,
  degreeData,
  educationarray,
  isEdit,
  CardData,
}) {
  // console.log('EducationEditModalAdd', educationarray);

  const [institute, setInstitute] = useState('');
  let [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  let [startDateMonth, setStartDateMonth] = useState('');
  let [startDateYear, setStartDateYear] = useState('');
  let [endDateMonth, setEndDateMonth] = useState('');
  let [endDateYear, setEndDateYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let [arrayEducation, setArrayEducation] = useState([]);

  const Year = [
    {id: 1, name: '1960'},
    {id: 2, name: '1961'},
    {id: 3, name: '1962'},
    {id: 4, name: '1963'},
    {id: 5, name: '1964'},
    {id: 6, name: '1965'},
    {id: 7, name: '1966'},
    {id: 8, name: '1967'},
    {id: 9, name: '1968'},
    {id: 10, name: '1969'},
    {id: 11, name: '1970'},
    {id: 12, name: '1971'},
    {id: 13, name: '1972'},
    {id: 14, name: '1973'},
    {id: 15, name: '1974'},
    {id: 16, name: '1975'},
    {id: 17, name: '1976'},
    {id: 18, name: '1977'},
    {id: 19, name: '1978'},
    {id: 20, name: '1979'},
    {id: 21, name: '1980'},
    {id: 22, name: '1981'},
    {id: 23, name: '1982'},
    {id: 24, name: '1983'},
    {id: 25, name: '1984'},
    {id: 26, name: '1985'},
    {id: 27, name: '1986'},
    {id: 28, name: '1987'},
    {id: 29, name: '1988'},
    {id: 30, name: '1989'},
    {id: 31, name: '1990'},
    {id: 32, name: '1991'},
    {id: 33, name: '1992'},
    {id: 34, name: '1993'},
    {id: 35, name: '1994'},
    {id: 36, name: '1995'},
    {id: 37, name: '1996'},
    {id: 38, name: '1997'},
    {id: 39, name: '1998'},
    {id: 40, name: '1999'},
    {id: 41, name: '2000'},
    {id: 42, name: '2001'},
    {id: 43, name: '2002'},
    {id: 44, name: '2003'},
    {id: 45, name: '2004'},
    {id: 46, name: '2005'},
    {id: 47, name: '2006'},
    {id: 48, name: '2007'},
    {id: 49, name: '2008'},
    {id: 50, name: '2009'},
    {id: 51, name: '2010'},
    {id: 52, name: '2011'},
    {id: 53, name: '2012'},
    {id: 54, name: '2013'},
    {id: 55, name: '2014'},
    {id: 56, name: '2015'},
    {id: 57, name: '2016'},
    {id: 58, name: '2017'},
    {id: 59, name: '2018'},
    {id: 60, name: '2019'},
    {id: 61, name: '2020'},
    {id: 62, name: '2021'},
    {id: 63, name: '2022'},
  ];

  const Months = [
    {
      id: 1,
      name: 'January',
    },
    {
      id: 2,
      name: 'February',
    },
    {
      id: 3,
      name: 'March',
    },
    {
      id: 4,
      name: 'April',
    },
    {
      id: 5,
      name: 'May',
    },
    {
      id: 6,
      name: 'June',
    },
    {
      id: 7,
      name: 'July',
    },
    {
      id: 8,
      name: 'August',
    },
    {
      id: 9,
      name: 'September',
    },
    {
      id: 10,
      name: 'October',
    },
    {
      id: 11,
      name: 'November',
    },
    {
      id: 12,
      name: 'December',
    },
  ];

  let arrEducation = [];
  arrEducation = _.find(CardData.personalCardMeta, {personalKey: 'Education'});
  if (arrEducation) {
    arrEducation = arrEducation;
  } else {
    arrEducation = 'Dummy education';
  }

  const FunDegree = value => {
    setDegree((degree = value.name));
  };
  const FunstartDateMonth = value => {
    setStartDateMonth((startDateMonth = value.name));
    // console.log('startDateMonth', startDateMonth);
  };
  const FunstartDateYear = value => {
    setStartDateYear((startDateYear = value.name));
    // console.log('startDateYear', startDateYear);
  };
  const FunendDateMonth = value => {
    setEndDateMonth((endDateMonth = value.name));
    // console.log('endDateMonth', endDateMonth);
  };
  const FunendDateYear = value => {
    setEndDateYear((endDateYear = value.name));
    // console.log('endDateYear', endDateYear);
  };

  const FunEducationArray = () => {
    let data = {
      institute: institute.trim(),
      startDateMonth: startDateMonth,
      startDateYear: startDateYear,
      endDateMonth: endDateMonth,
      endDateYear: endDateYear,
      degree: degree,
    };

    let newEducationArray = educationarray;
    newEducationArray.push(data);
    setArrayEducation([]);
    setArrayEducation((arrayEducation = newEducationArray));
    // console.log('hamza sahab', arrayEducation);
  };

  const onAdd = () => {
    let obj = {
      id: arrEducation.id,
      ishidden: true,
      personalCardId: CardData.id,
      personalKey: 'Education',
      personalValue: JSON.stringify(arrayEducation),
    };

    setIsLoading(true);
    PersonalCardEditApiCall(obj)
      // .then(res => res.json())
      .then(data => {
        // console.log('Edit Skill Data', data);

        if (data.data.status == 200 && data.data.success == true) {
          setIsLoading(false);
          setModalVisible(false);
        } else {
          alert(data.message);
          setIsLoading(false);
          // console.log('ADD');
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: 'rgba(64,77,136,.8)',
            flex: 1,
            height: Dimensions.get('window').height,
            padding: 20,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#113066',
              width: '100%',
              backgroundColor: '#ffffff',
              padding: 20,
              paddingBottom: 0,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: '#242424',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {isEdit ? 'Edit' : 'Add'} Education
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20.849}
                  height={20.849}
                  viewBox="0 0 30.849 30.849">
                  <Path
                    data-name="Icon metro-cancel"
                    d="M17.995 1.928a15.424 15.424 0 1015.424 15.424A15.424 15.424 0 0017.995 1.928zm0 27.956a12.532 12.532 0 1112.532-12.532 12.532 12.532 0 01-12.532 12.533zm4.82-20.244l-4.82 4.82-4.82-4.82-2.892 2.892 4.82 4.82-4.82 4.82 2.892 2.892 4.82-4.82 4.82 4.82 2.892-2.892-4.82-4.82 4.82-4.82z"
                    transform="translate(-2.571 -1.928)"
                    fill="#242424"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
            <Select
              data={degreeData}
              placeholder={'Degree'}
              onCallBack={FunDegree}
              isEdit={isEdit}
            />
            <OutlinedInputBox
              placeholder="University-Institute"
              inputType="text"
              onChange={value => {
                setInstitute(value);
              }}
            />
            <OutlinedInputBox
              placeholder="Field of study"
              inputType="text"
              onChange={value => {
                setFieldOfStudy(value);
              }}
            />

            <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
              Start date
            </Text>
            <Select
              data={Months}
              placeholder={'Start month'}
              onCallBack={FunstartDateMonth}
              isEdit={isEdit}
            />

            <Select
              data={Year}
              placeholder={'Start year'}
              onCallBack={FunstartDateYear}
              isEdit={isEdit}
            />

            <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
              End date
            </Text>
            <Select
              data={Months}
              placeholder={'End month'}
              onCallBack={FunendDateMonth}
              isEdit={isEdit}
            />

            <Select
              data={Year}
              placeholder={'End year'}
              onCallBack={FunendDateYear}
              isEdit={isEdit}
            />
            <BtnComponent
              placeholder={isEdit ? 'Edit' : 'Add'}
              onPress={() => {
                FunEducationArray();
                onAdd();
                // setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>

        {isLoading ? <Loader /> : null}
      </ScrollView>
    </Modal>
  );
}
