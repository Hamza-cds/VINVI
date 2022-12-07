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
import Select from '../Components/Select';
import {WHITE} from '../Constants/Colors';
import _ from 'lodash';
import {PersonalCardEditApiCall} from '../Apis/Repo';
import Loader from '../Components/Loader';
import {isNullOrEmpty, stringsNotEqual} from '../Constants/TextUtils';

export function JobHistoryModal({
  modalVisible,
  setModalVisible,
  onPress,
  isEdit,
  industryType,
  employeeType,
  jobhistoryarray,
  index,
  CardData,
  setJobHistoryData,
  jobHistoryData,
}) {
  // console.log('isEdit', isEdit);
  // console.log('jobhistoryarray', jobhistoryarray);
  // console.log('arrayjobhistory[index]', arrayjobhistory[index]);

  const [companyName, setCompanyName] = useState('');
  let [startMonth, setStartMonth] = useState('');
  let [startYear, setStartYear] = useState('');
  let [endMonth, setEndMonth] = useState('');
  let [endYear, setEndYear] = useState('');
  let [industry, setIndustry] = useState('');
  let [employee, setEmployee] = useState('');
  const [title, setTitle] = useState('');
  let [editJobHistoryArray, setEditJobHistoryArray] = useState([]);
  let [editJob, setEditJob] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [endYearError, setEndYearError] = useState(false);
  const [endYearErrorMsg, setEndYearErrorMsg] = useState('');
  const [startYearError, setStartYearError] = useState(false);
  const [startYearErrorMsg, setStartYearErrorMsg] = useState('');
  const [startMonthError, setStartMonthError] = useState(false);
  const [startMonthErrorMsg, setStartMonthErrorMsg] = useState('');
  const [endMonthError, setEndMonthError] = useState(false);
  const [endMonthErrorMsg, setEndMonthErrorMsg] = useState('');

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
      setEditJob((editJob = jobhistoryarray[index]));
      editJobHistoryArray.length <= 0
        ? setEditJobHistoryArray((editJobHistoryArray = jobhistoryarray))
        : setEditJobHistoryArray(editJobHistoryArray);
    }
  }, [modalVisible]);

  let EditArrayJobHistory;
  const extractJobHistoryForId = () => {
    EditArrayJobHistory = _.find(CardData.personalCardMeta, {
      personalKey: 'JobHistory',
    });
    if (EditArrayJobHistory) {
      EditArrayJobHistory = EditArrayJobHistory;
    } else {
      EditArrayJobHistory = '';
    }
    // console.log('EditArrayJobHistory', EditArrayJobHistory);
  };

  {
    isEdit == true ? extractJobHistoryForId() : null;
  }

  const onEdit = () => {
    let newEditModalJobObj = jobhistoryarray[index];
    newEditModalJobObj.title = title ? title.trim() : newEditModalJobObj.title;
    newEditModalJobObj.companyName = companyName
      ? companyName.trim()
      : newEditModalJobObj.companyName;
    newEditModalJobObj.employeeType = employee
      ? employee
      : newEditModalJobObj.employeeType;
    newEditModalJobObj.startMonth = startMonth
      ? startMonth
      : newEditModalJobObj.startMonth;
    newEditModalJobObj.startYear = startYear
      ? startYear
      : newEditModalJobObj.startYear;
    newEditModalJobObj.endMonth = endMonth
      ? endMonth
      : newEditModalJobObj.endMonth;
    newEditModalJobObj.endYear = endYear ? endYear : newEditModalJobObj.endYear;
    newEditModalJobObj.industryType = industry
      ? industry
      : newEditModalJobObj.industryType;

    let obj = {
      id: EditArrayJobHistory.id,
      ishidden: true,
      personalCardId: CardData.id,
      personalKey: 'JobHistory',
      personalValue: JSON.stringify(jobhistoryarray),
    };

    setIsLoading(true);
    PersonalCardEditApiCall(obj)
      // .then(res => res.json())
      .then(data => {
        // console.log('Edit Skill Data', data);

        if (data.data.status == 200 && data.data.success == true) {
          setJobHistoryData(
            (jobHistoryData = JSON.parse(data.data.result.personalValue)),
          );
          setIsLoading(false);
          setModalVisible(false);
        } else {
          setIsLoading(false);
          alert(data.message);
          // console.log('ADD');
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  /*********************************************************************/

  const onAdd = () => {
    let obj = {
      title: title.trim(),
      companyName: companyName.trim(),
      industryType: industry,
      employeeType: employee,
      startMonth: startMonth,
      startYear: startYear,
      endMonth: endMonth,
      endYear: endYear,
      // description: description.trim(),
    };
    onPress(obj);
  };

  const FunIndustry = value => {
    setIndustry((industry = value.name));
    // console.log('industry', industry);
  };
  const FunEmployee = value => {
    setEmployee((employee = value.name));
    // console.log('employee', employee);
  };
  const FunstartDateMonth = value => {
    if (startYear == endYear) {
      if (!isNullOrEmpty(endMonth)) {
        setStartMonth((startMonth = value.name));
        if (stringsNotEqual(value.name, endMonth)) {
          setStartMonthError(false);
          setEndMonthError(false);
        } else {
          setStartMonthError(true);
          setStartMonthErrorMsg('Start month, end month must not equal');
        }
      } else {
        setStartMonth((startMonth = value.name));
      }
    }
  };
  const FunstartDateYear = value => {
    if (!isNullOrEmpty(endYear)) {
      setStartYear((startYear = value.name));
      if (value.name < endYear || value.name == endYear) {
        setStartYearError(false);
      } else {
        setStartYearError(true);
        setStartYearErrorMsg('Start date must be before end date');
      }
    } else {
      setStartYear((startYear = value.name));
    }
  };

  const FunendDateMonth = value => {
    if (startYear == endYear) {
      if (!isNullOrEmpty(startMonth)) {
        setEndMonth((endMonth = value.name));
        if (stringsNotEqual(value.name, startMonth)) {
          setEndMonthError(false);
          setStartMonthError(false);
        } else {
          setEndMonthError(true);
          setEndMonthErrorMsg('Start month, end month must not equal');
        }
      } else {
        setEndMonth((endMonth = value.name));
      }
    } else {
      setEndMonth((endMonth = value.name));
    }
    // setEndMonth((endMonth = value.name));
    // if (startYear == endYear) {
    //   if (stringsNotEqual(value.name, endMonth)) {
    //     setEndMonthError(false);
    //     setStartMonthError(false);
    //   } else {
    //     setEndMonthError(true);
    //     setEndMonthErrorMsg('Start month, end month must not equal');
    //   }
    // }
  };

  const FunendDateYear = value => {
    setEndYear((endYear = value.name));
    if (value.name >= startYear) {
      setEndYearError(false);
    } else {
      setEndYearError(true);
      setEndYearErrorMsg('End date must be after start date');
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
      {/* <ScrollView
        style={{
          flex: 1,
        }}> */}
      <View
        style={{
          backgroundColor: 'rgba(190,190,190,.8)',
          // flex: 1,
          height: Dimensions.get('window').height,
          padding: 10,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#113066',
            width: '100%',
            backgroundColor: WHITE,
            padding: 20,
            marginVertical: 60,
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
              {isEdit ? 'Edit' : 'Add'} Job History
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginTop: 10}}>
              <OutlinedInputBox
                placeholder="Enter Title"
                inputType="text"
                // label={'Title'}
                text={editJob ? (editJob.title ? editJob.title : null) : null}
                onChange={value => {
                  setTitle(value);
                  // console.log(value);
                }}
              />
              <OutlinedInputBox
                placeholder="Enter Company Name"
                inputType="text"
                text={
                  editJob
                    ? editJob.companyName
                      ? editJob.companyName
                      : null
                    : null
                }
                // label={'Company Name'}
                onChange={value => {
                  setCompanyName(value);
                }}
              />

              <Select
                data={industryType}
                placeholder={'Industry type'}
                editText={
                  industry
                    ? industry
                    : editJob
                    ? editJob.industryType
                      ? editJob.industryType
                      : null
                    : null
                }
                onCallBack={FunIndustry}
                isEdit={isEdit}
              />
              <Select
                data={employeeType}
                placeholder={'Employee type'}
                isEdit={isEdit}
                editText={
                  employee
                    ? employee
                    : editJob
                    ? editJob.employeeType
                      ? editJob.employeeType
                      : null
                    : null
                }
                onChange={value => {
                  console.log('value', value);
                }}
                onCallBack={FunEmployee}
              />

              <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
                Start date
              </Text>
              <Select
                data={Months}
                placeholder={'Start month'}
                isEdit={isEdit}
                editText={
                  startMonth
                    ? startMonth
                    : editJob
                    ? editJob.startMonth
                      ? editJob.startMonth
                      : null
                    : null
                }
                error={startMonthError}
                errorMessage={startMonthErrorMsg}
                onCallBack={FunstartDateMonth}
              />

              <Select
                data={getYears()}
                placeholder={'Start year'}
                isEdit={isEdit}
                editText={
                  startYear
                    ? startYear
                    : editJob
                    ? editJob.startYear
                      ? editJob.startYear
                      : null
                    : null
                }
                error={startYearError}
                errorMessage={startYearErrorMsg}
                onCallBack={FunstartDateYear}
              />

              <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
                End date
              </Text>
              <Select
                data={Months}
                placeholder={'End month'}
                isEdit={isEdit}
                editText={
                  endMonth
                    ? endMonth
                    : editJob
                    ? editJob.endMonth
                      ? editJob.endMonth
                      : null
                    : null
                }
                error={endMonthError}
                errorMessage={endMonthErrorMsg}
                onCallBack={FunendDateMonth}
              />

              <Select
                data={getYears()}
                placeholder={'End year'}
                isEdit={isEdit}
                editText={
                  endYear
                    ? endYear
                    : editJob
                    ? editJob.endYear
                      ? editJob.endYear
                      : null
                    : null
                }
                error={endYearError}
                errorMessage={endYearErrorMsg}
                onCallBack={FunendDateYear}
              />
            </View>
          </ScrollView>
          {isEdit == true ? (
            <BtnComponent
              placeholder={isEdit ? 'Edit' : 'Add'}
              onPress={() => {
                // EditingJob();
                onEdit();
              }}
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
      {/* </ScrollView> */}
    </Modal>
  );
}

// const [description, setDescription] = useState('');
// let [industryType, setIndustryType] = useState([]);
// let [employeeType, setEmployeeType] = useState([]);
// let [lookupData, setLookupData] = useState([]);

// useEffect(() => {
//   getAllLookupdetail();
// }, []);

// const getAllLookupdetail = () => {
//   GetAllLookupDetailApiCall()
//     .then(res => {
//       setLookupData((lookupData = res.data.result));

//       for (let index = 0; index < lookupData.length; index++) {
//         const element = lookupData[index];
//         if (element.lookupId == 8) {
//           let arrayEmpType = employeeType;
//           arrayEmpType.push(element);
//           setEmployeeType((employeeType = arrayEmpType));
//         } else if (element.lookupId == 9) {
//           let arrayIndustryType = industryType;
//           arrayIndustryType.push(element);
//           setIndustryType((industryType = arrayIndustryType));
//         }
//       }
//     })
//     .catch(err => {
//       console.log('err', err);
//     });
// };

{
  /* <OutlinedInputBox
                placeholder="Decription"
                inputType="text"
                multiline
                onChange={value => {
                  setDescription(value);
                }}
              /> */
}

// onPress={() => {
//   setModalVisible(!modalVisible);
// }}
// onPress={() => {
//   let obj = {
//     companyName: companyName,
//     fromDate: fromDate,
//     toDate: toDate,
//     description: description,
//   };
//   onPress(obj);
// }}
