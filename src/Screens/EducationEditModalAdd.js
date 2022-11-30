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
import {isNullOrEmpty} from '../Constants/TextUtils';

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

  const [endYearError, setEndYearError] = useState(false);
  const [endYearErrorMsg, setEndYearErrorMsg] = useState('');
  const [startYearError, setStartYearError] = useState(false);
  const [startYearErrorMsg, setStartYearErrorMsg] = useState('');

  const [startMonthError, setStartMonthError] = useState(false);
  const [startMonthErrorMsg, setStartMonthErrorMsg] = useState('');
  const [endMonthError, setEndMonthError] = useState(false);
  const [endMonthErrorMsg, setEndMonthErrorMsg] = useState('');
  let [startMonthID, setStartMonthID] = useState('');
  let [endMonthID, setEndMonthID] = useState('');

  const getYears = () => {
    let id = 1;
    let formattedYearsData = [];
    let currentYear = new Date().getFullYear();
    for (let index = 1960; index <= currentYear; index++) {
      formattedYearsData.push({name: index, id: id++});
    }
    // console.log('formattedYearsData', formattedYearsData);
    return formattedYearsData.reverse();
  };

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

  console.log('EducationEditModalAdd arrEducation', arrEducation);

  const FunDegree = value => {
    setDegree((degree = value.name));
  };
  // const FunstartDateMonth = value => {
  //   setStartDateMonth((startDateMonth = value.name));
  //   // console.log('startDateMonth', startDateMonth);
  // };
  // const FunstartDateYear = value => {
  //   setStartDateYear((startDateYear = value.name));
  //   // console.log('startDateYear', startDateYear);
  // };
  // const FunendDateMonth = value => {
  //   setEndDateMonth((endDateMonth = value.name));
  //   // console.log('endDateMonth', endDateMonth);
  // };
  // const FunendDateYear = value => {
  //   setEndDateYear((endDateYear = value.name));
  //   // console.log('endDateYear', endDateYear);
  // };

  const FunstartDateYear = value => {
    console.log('FunstartDateYear', value);
    if (!isNullOrEmpty(endDateYear)) {
      setStartDateYear((startDateYear = value.name));
      if (value.name < endDateYear) {
        setStartYearError(false);
      } else {
        setStartYearError(true);
        setStartYearErrorMsg('Start date must be before end date');
      }
    } else {
      setStartDateYear((startDateYear = value.name));
    }
  };

  const FunendDateYear = value => {
    console.log('FunendDateYear', value);
    setEndDateYear((endDateYear = value.name));
    if (value.name >= startDateYear) {
      setEndYearError(false);
    } else {
      setEndYearError(true);
      setEndYearErrorMsg('End date must be after start date');
    }
  };

  const FunstartDateMonth = value => {
    setStartMonthID((startMonthID = value.id));
    if (startDateYear == endDateYear) {
      if (!isNullOrEmpty(endDateMonth)) {
        setStartDateMonth((startDateMonth = value.name));
        // if (stringsNotEqual(value.name, endDateMonth))
        if (startMonthID < endMonthID) {
          setStartMonthError(false);
          setEndMonthError(false);
        } else {
          setStartMonthError(true);
          setStartMonthErrorMsg("start month can't greater then end month ");
        }
      } else {
        setStartMonthID(value.id);
        setStartDateMonth((startDateMonth = value.name));
      }
    } else {
      setStartDateMonth((startDateMonth = value.name));
    }
  };

  const FunendDateMonth = value => {
    // console.log('value', value);
    setEndMonthID((endMonthID = value.id));
    if (startDateYear == endDateYear) {
      if (!isNullOrEmpty(startDateMonth)) {
        // if (stringsNotEqual(value.name, startDateMonth))
        if (endMonthID > startMonthID) {
          setEndDateMonth((endDateMonth = value.name));
          setEndMonthError(false);
          setStartMonthError(false);
        } else {
          setEndMonthError(true);
          setEndMonthErrorMsg("End month can't less then start month ");
        }
      } else {
        setEndMonthID(value.id);
        setEndDateMonth((endDateMonth = value.name));
      }
    } else {
      setEndDateMonth((endDateMonth = value.name));
    }
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
    if (isNullOrEmpty(degree)) {
      alert('select degree');
    } else if (isNullOrEmpty(degree)) {
      alert('select degree');
    } else if (isNullOrEmpty(startDateMonth)) {
      alert('select start month');
    } else if (isNullOrEmpty(startDateYear)) {
      alert('select start year');
    } else if (isNullOrEmpty(endDateMonth)) {
      alert('select end month');
    } else if (isNullOrEmpty(endDateYear)) {
      alert('select end year');
    } else {
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
    }
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
              editText={degree}
            />
            <OutlinedInputBox
              placeholder="University-Institute"
              inputType="text"
              onChange={value => {
                setInstitute(value);
              }}
            />
            {/* <OutlinedInputBox
              placeholder="Field of study"
              inputType="text"
              onChange={value => {
                setFieldOfStudy(value);
              }}
              // text={
              //   editJob
              //     ? editJob.companyName
              //       ? editJob.companyName
              //       : null
              //     : null
              // }
            /> */}

            <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
              Start date
            </Text>
            <Select
              data={Months}
              placeholder={'Start month'}
              onCallBack={FunstartDateMonth}
              error={startMonthError}
              errorMessage={startMonthErrorMsg}
              isEdit={isEdit}
              editText={startDateMonth}
            />

            <Select
              data={getYears()}
              placeholder={'Start year'}
              onCallBack={FunstartDateYear}
              error={startYearError}
              errorMessage={startYearErrorMsg}
              isEdit={isEdit}
              editText={startDateYear}
            />

            <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
              End date
            </Text>
            <Select
              data={Months}
              placeholder={'End month'}
              onCallBack={FunendDateMonth}
              error={endMonthError}
              errorMessage={endMonthErrorMsg}
              isEdit={isEdit}
              editText={endDateMonth}
            />

            <Select
              data={getYears()}
              placeholder={'End year'}
              onCallBack={FunendDateYear}
              error={endYearError}
              errorMessage={endYearErrorMsg}
              isEdit={isEdit}
              editText={endDateYear}
            />
            <View style={{marginVertical: 10}}>
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
        </View>

        {isLoading ? <Loader /> : null}
      </ScrollView>
    </Modal>
  );
}
