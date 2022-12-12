import React, {useState, useEffect} from 'react';
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
import {LookupDetailApiCall} from '../Apis/Repo';
// import Dropdown from '../Components/Dropdown';
import Select from '../Components/Select';
import _ from 'lodash';
import {PersonalCardEditApiCall} from '../Apis/Repo';
import Loader from '../Components/Loader';
import {isNullOrEmpty, stringsNotEqual} from '../Constants/TextUtils';

export function EducationModal({
  modalVisible,
  setModalVisible,
  isEdit,
  onPress,
  degreeData,
  CardData,
  index,
  educationarray,
  setEducationHistoryData,
  educationHistoryData,
}) {
  const [institute, setInstitute] = useState('');
  let [degree, setDegree] = useState('');
  // const [fieldOfStudy, setFieldOfStudy] = useState('');
  let [startDateMonth, setStartDateMonth] = useState('');
  let [startDateYear, setStartDateYear] = useState('');
  let [endDateMonth, setEndDateMonth] = useState('');
  let [endDateYear, setEndDateYear] = useState('');
  // let [degreeData, setDegreeData] = useState('hamza');
  let [editEdu, setEditEdu] = useState('');
  let [editEduHistoryArray, setEditEducationHistoryArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  // console.log('editEdu', editEdu);

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

  useEffect(() => {
    if (isEdit) {
      setEditEdu((editEdu = educationarray[index]));
      // console.log('editEdu', editEdu);
      editEduHistoryArray.length <= 0
        ? setEditEducationHistoryArray((editEduHistoryArray = educationarray))
        : setEditEducationHistoryArray(editEduHistoryArray);
    }
  }, [modalVisible]);

  let EditArrayEducation;
  const extractEduHistoryForId = () => {
    // debugger;
    EditArrayEducation = _.find(CardData.personalCardMeta, {
      personalKey: 'Education',
    });
    if (EditArrayEducation) {
      EditArrayEducation = EditArrayEducation;
    } else {
      EditArrayEducation = '';
    }
    // console.log('EditArrayEducation', EditArrayEducation);
  };

  {
    // debugger;
    isEdit == true ? extractEduHistoryForId() : null;
  }

  const onEdit = () => {
    if (isNullOrEmpty(index)) {
      // if case start here

      if (isNullOrEmpty(institute)) {
        alert('Enter institute');
      } else if (isNullOrEmpty(startDateMonth)) {
        alert('select start month');
      } else if (isNullOrEmpty(startDateYear)) {
        alert('select start year');
      } else if (isNullOrEmpty(endDateMonth)) {
        alert('select end month');
      } else if (isNullOrEmpty(endDateYear)) {
        alert('select end year');
      } else if (isNullOrEmpty(degree)) {
        alert('select degree');
      } else if (startMonthError == true) {
        alert(startMonthErrorMsg);
      } else if (startYearError == true) {
        alert(startYearErrorMsg);
      } else if (endMonthError == true) {
        alert(endMonthErrorMsg);
      } else if (endYearError == true) {
        alert(endYearErrorMsg);
      } else {
        let newEditModalEduObj = educationarray[index];
        newEditModalEduObj.degree = degree
          ? degree.trim()
          : newEditModalEduObj.degree;
        newEditModalEduObj.institute = institute
          ? institute.trim()
          : newEditModalEduObj.institute;
        newEditModalEduObj.startDateMonth = startDateMonth
          ? startDateMonth
          : newEditModalEduObj.startDateMonth;
        newEditModalEduObj.startDateYear = startDateYear
          ? startDateYear
          : newEditModalEduObj.startDateYear;
        newEditModalEduObj.endDateMonth = endDateMonth
          ? endDateMonth
          : newEditModalEduObj.endDateMonth;
        newEditModalEduObj.endDateYear = endDateYear
          ? endDateYear
          : newEditModalEduObj.endDateYear;
        // console.log('newEditModalEduObj', newEditModalEduObj);
        // console.log('educationarray onEdit', educationarray);
        // console.log('EditArrayEducation', EditArrayEducation);

        let obj = {
          id: EditArrayEducation.id,
          ishidden: true,
          personalCardId: CardData.id,
          personalKey: 'Education',
          personalValue: JSON.stringify(educationarray),
        };

        setIsLoading(true);
        PersonalCardEditApiCall(obj)
          // .then(res => res.json())
          .then(data => {
            // debugger;
            // console.log('Edit Skill Data', data);

            if (data.data.status == 200 && data.data.success == true) {
              setInstitute('');
              setStartDateMonth('');
              setStartDateYear('');
              setEndDateMonth('');
              setEndDateYear('');
              setDegree('');
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
    }

    // else case start here
    else {
      // existed education card editing

      let newEditModalEduObj = educationarray[index];
      newEditModalEduObj.degree = degree
        ? degree.trim()
        : newEditModalEduObj.degree;
      newEditModalEduObj.institute = institute
        ? institute.trim()
        : newEditModalEduObj.institute;
      newEditModalEduObj.startDateMonth = startDateMonth
        ? startDateMonth
        : newEditModalEduObj.startDateMonth;
      newEditModalEduObj.startDateYear = startDateYear
        ? startDateYear
        : newEditModalEduObj.startDateYear;
      newEditModalEduObj.endDateMonth = endDateMonth
        ? endDateMonth
        : newEditModalEduObj.endDateMonth;
      newEditModalEduObj.endDateYear = endDateYear
        ? endDateYear
        : newEditModalEduObj.endDateYear;

      let obj = {
        id: EditArrayEducation.id,
        ishidden: true,
        personalCardId: CardData.id,
        personalKey: 'Education',
        personalValue: JSON.stringify(educationarray),
      };

      setIsLoading(true);
      PersonalCardEditApiCall(obj)
        // .then(res => res.json())
        .then(data => {
          // debugger;
          console.log('Edit education single card response', data);

          if (data.data.status == 200 && data.data.success == true) {
            setEducationHistoryData(
              (educationHistoryData = JSON.parse(
                data.data.result.personalValue,
              )),
            );
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
    // else case end here
  };

  const onAdd = () => {
    if (isNullOrEmpty(institute)) {
      alert('Enter institute');
    } else if (isNullOrEmpty(startDateMonth)) {
      alert('select start month');
    } else if (isNullOrEmpty(startDateYear)) {
      alert('select start year');
    } else if (isNullOrEmpty(endDateMonth)) {
      alert('select end month');
    } else if (isNullOrEmpty(endDateYear)) {
      alert('select end year');
    } else if (isNullOrEmpty(degree)) {
      alert('select degree');
    } else if (startMonthError == true) {
      alert(startMonthErrorMsg);
    } else if (startYearError == true) {
      alert(startYearErrorMsg);
    } else if (endMonthError == true) {
      alert(endMonthErrorMsg);
    } else if (endYearError == true) {
      alert(endYearErrorMsg);
    } else {
      let obj = {
        institute: institute.trim(),
        startDateMonth: startDateMonth,
        startDateYear: startDateYear,
        endDateMonth: endDateMonth,
        endDateYear: endDateYear,
        degree: degree,
      };
      onPress(obj);
      setInstitute('');
      setStartDateMonth('');
      setStartDateYear('');
      setEndDateMonth('');
      setEndDateYear('');
      setDegree('');
    }
    // setModalVisible(!modalVisible);
  };

  const FunDegree = value => {
    // console.log('FunDegree', value);
    setDegree((degree = value.name));
  };

  const FunstartDateYear = value => {
    // console.log('FunstartDateYear', value);
    if (!isNullOrEmpty(endDateYear)) {
      setStartDateYear((startDateYear = value.name));
      if (value.name < endDateYear) {
        setStartYearError(false);
        setEndYearError(false);
      } else {
        setStartYearError(true);
        setStartYearErrorMsg('Start date must be before end date');
      }
    } else {
      setStartDateYear((startDateYear = value.name));
    }
  };

  const FunendDateYear = value => {
    // console.log('FunendDateYear', value);
    setEndDateYear((endDateYear = value.name));
    if (value.name >= startDateYear) {
      setEndYearError(false);
      setStartYearError(false);
    } else {
      setEndYearError(true);
      setEndYearErrorMsg('End date must be after start date');
    }
  };

  const FunstartDateMonth = value => {
    setStartMonthID((startMonthID = value.id));
    if (!isNullOrEmpty(startDateYear) && !isNullOrEmpty(endDateYear)) {
      if (!isNullOrEmpty(startDateYear) == !isNullOrEmpty(endDateYear)) {
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
      }
    } else {
      setStartDateMonth((startDateMonth = value.name));
    }
  };

  const FunendDateMonth = value => {
    // debugger;
    // console.log('value', value);
    setEndMonthID((endMonthID = value.id));
    if (!isNullOrEmpty(startDateYear) && !isNullOrEmpty(endDateYear)) {
      if (!isNullOrEmpty(startDateYear) == !isNullOrEmpty(endDateYear)) {
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
      }
    } else {
      setEndDateMonth((endDateMonth = value.name));
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
            backgroundColor: 'rgba(190,190,190,.8)',
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
              editText={
                degree
                  ? degree
                  : editEdu
                  ? editEdu.degree
                    ? editEdu.degree
                    : null
                  : null
              }
              onCallBack={FunDegree}
              isEdit={isEdit}
            />
            <OutlinedInputBox
              placeholder="Enter University/Institute Name"
              inputType="text"
              text={
                editEdu ? (editEdu.institute ? editEdu.institute : null) : null
              }
              // label={'University / Institute'}
              onChange={value => {
                setInstitute(value);
              }}
            />
            {/* <OutlinedInputBox
              placeholder="Enter Field of study"
              inputType="text"
              // label={'Field of study'}
              onChange={value => {
                setFieldOfStudy(value);
              }}
            /> */}

            <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
              Start date
            </Text>
            <Select
              data={Months}
              placeholder={'Start month'}
              editText={
                startDateMonth
                  ? startDateMonth
                  : editEdu
                  ? editEdu.startDateMonth
                    ? editEdu.startDateMonth
                    : null
                  : null
              }
              error={startMonthError}
              errorMessage={startMonthErrorMsg}
              onCallBack={FunstartDateMonth}
              isEdit={isEdit}
            />

            <Select
              data={getYears()}
              placeholder={'Start year'}
              editText={
                startDateYear
                  ? startDateYear
                  : editEdu
                  ? editEdu.startDateYear
                    ? editEdu.startDateYear
                    : null
                  : null
              }
              error={startYearError}
              errorMessage={startYearErrorMsg}
              onCallBack={FunstartDateYear}
              isEdit={isEdit}
            />

            <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
              End date
            </Text>
            <Select
              data={Months}
              placeholder={'End month'}
              editText={
                endDateMonth
                  ? endDateMonth
                  : editEdu
                  ? editEdu.endDateMonth
                    ? editEdu.endDateMonth
                    : null
                  : null
              }
              error={endMonthError}
              errorMessage={endMonthErrorMsg}
              onCallBack={FunendDateMonth}
              isEdit={isEdit}
            />

            <Select
              data={getYears()}
              placeholder={'End year'}
              editText={
                endDateYear
                  ? endDateYear
                  : editEdu
                  ? editEdu.endDateYear
                    ? editEdu.endDateYear
                    : null
                  : null
              }
              error={endYearError}
              errorMessage={endYearErrorMsg}
              onCallBack={FunendDateYear}
              isEdit={isEdit}
            />

            {isEdit == true ? (
              <BtnComponent
                placeholder={isEdit ? 'Edit' : 'Add'}
                onPress={onEdit}
              />
            ) : (
              <BtnComponent
                placeholder={isEdit ? 'Edit' : 'Add'}
                onPress={onAdd}
              />
            )}
          </View>
        </View>
        {isLoading ? <Loader /> : null}
      </ScrollView>
    </Modal>
  );
}

// const id = 3;

// useEffect(() => {
//   // getDegree();
//   LookupDetailApiCall(id)
//     .then(res => {
//       console.log('degree res', res.data.result);
//       setDegreeData((degreeData = res.data.result));
//     })
//     .catch(err => {
//       console.log('err', err);
//     });
// }, []);

// const getDegree = () => {
//   LookupDetailApiCall(id)
//     .then(res => {
//       console.log('res ha hamza', res.data.result);
//       setDegreeData((degreeData = res.data.result));
//     })
//     .catch(err => {
//       console.log('err', err);
//     });
// };

{
  /* <View
              style={{
                flexDirection: 'row',
              }}>
              <OutlinedInputBox
                placeholder="From"
                inputType="text"
                style={{
                  width: '48%',
                  marginRight: '2%',
                }}
                onChange={value => {
                  setFromDate(value);
                }}
              />
              <OutlinedInputBox
                placeholder="To"
                inputType="text"
                style={{
                  width: '50%',
                }}
                onChange={value => {
                  setToDate(value);
                }}
              />
            </View>
            <OutlinedInputBox
              placeholder="Degree"
              inputType="text"
              onChange={value => {
                setDegree(value);
              }}
            /> */
}
