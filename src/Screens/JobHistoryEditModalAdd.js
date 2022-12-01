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
import Loader from '../Components/Loader';
import _ from 'lodash';
import {PersonalCardEditApiCall} from '../Apis/Repo';
import {isNullOrEmpty} from '../Constants/TextUtils';
import {stringsNotEqual} from '../Constants/TextUtils';
import {PRIMARY} from '../Constants/Colors';

export function JobHistoryEditModalAdd({
  modalVisible,
  setModalVisible,
  industryType,
  employeeType,
  jobhistoryarray,
  isEdit,
  CardData,
  setJobHistoryData,
  jobHistoryData,
}) {
  // console.log('jobhistoryarray of EDIT/ADD Modal', jobhistoryarray);

  const [companyName, setCompanyName] = useState('');
  let [startMonth, setStartMonth] = useState('');
  let [startYear, setStartYear] = useState('');
  let [endMonth, setEndMonth] = useState('');
  let [endYear, setEndYear] = useState('');
  let [industry, setIndustry] = useState('');
  let [employee, setEmployee] = useState('');
  const [title, setTitle] = useState('');
  let [jobHistoryArray, setJobHistoryArray] = useState([]);
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

  let arrJobHistory = [];
  arrJobHistory = _.find(CardData.personalCardMeta, {
    personalKey: 'JobHistory',
  });
  if (arrJobHistory) {
    arrJobHistory = arrJobHistory;
  } else {
    arrJobHistory = 'Dummy job History';
  }

  const FunJobHistoryArray = () => {
    let data = {
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

    let newJobHistoryArray = jobhistoryarray;
    newJobHistoryArray.push(data);
    setJobHistoryArray([]);
    setJobHistoryArray((jobHistoryArray = newJobHistoryArray));
  };

  const onAdd = () => {
    if (isNullOrEmpty(title)) {
      alert('Enter title');
    } else if (isNullOrEmpty(companyName)) {
      alert('Enter company name');
    } else if (isNullOrEmpty(industry)) {
      alert('select industry type');
    } else if (isNullOrEmpty(employee)) {
      alert('select employee type');
    } else if (isNullOrEmpty(startMonth)) {
      alert('Select start month');
    } else if (isNullOrEmpty(startYear)) {
      alert('Select start year');
    } else if (isNullOrEmpty(endMonth)) {
      alert('Select end month');
    } else if (isNullOrEmpty(endYear)) {
      alert('Select start year');
    } else {
      let obj = {
        id: arrJobHistory.id,
        ishidden: true,
        personalCardId: CardData.id,
        personalKey: 'JobHistory',
        personalValue: JSON.stringify(jobhistoryarray),
      };

      // setIsLoading(true);
      PersonalCardEditApiCall(obj)
        // .then(res => res.json())
        .then(data => {
          console.log('edit case add job history', data);

          if (data.data.status == 200 && data.data.success == true) {
            // setIsLoading(false);
            setJobHistoryData(
              (jobHistoryData = JSON.parse(data.data.result.personalValue)),
            );
            setModalVisible(false);
          } else {
            // setIsLoading(false);
            alert(data.message);
            // console.log('ADD');
          }
        })
        .catch(err => {
          // setIsLoading(false);
          console.log('err', err);
        });
    }
  };

  const FunIndustry = value => {
    console.log('value', value);
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

  // const FunstartDateMonth = value => {
  //   setStartMonth((startMonth = value.name));
  //   // console.log('startMonth', startMonth);
  // };
  // const FunstartDateYear = value => {
  //   setStartYear((startYear = value.name));
  //   // console.log('startYear', startYear);
  // };
  // const FunendDateMonth = value => {
  //   setEndMonth((endMonth = value.name));
  //   // console.log('endMonth', endMonth);
  // };
  // const FunendDateYear = value => {
  //   setEndYear((endYear = value.name));
  //   // console.log('endYear', endYear);
  // };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
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
              marginVertical: 20,

              // height: '100%',
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
            <View style={{marginTop: 10}}>
              <OutlinedInputBox
                placeholder="Title"
                inputType="text"
                // text={editJob ? (editJob.title ? editJob.title : null) : null}
                onChange={value => {
                  setTitle(value);
                  //   console.log(value);
                }}
              />
              <OutlinedInputBox
                placeholder="Company Name"
                inputType="text"
                // text={
                //   editJob
                //     ? editJob.companyName
                //       ? editJob.companyName
                //       : null
                //     : null
                // }
                onChange={value => {
                  setCompanyName(value);
                }}
              />

              <Select
                data={industryType}
                placeholder={'Industry type'}
                editText={industry}
                // editText={
                //   industry
                //     ? industry
                //     : editJob
                //     ? editJob.industryType
                //       ? editJob.industryType
                //       : null
                //     : null
                // }
                onCallBack={FunIndustry}
                isEdit={isEdit}
              />
              <Select
                data={employeeType}
                placeholder={'Employee type'}
                isEdit={isEdit}
                editText={employee}
                // editText={
                //   employee
                //     ? employee
                //     : editJob
                //     ? editJob.employeeType
                //       ? editJob.employeeType
                //       : null
                //     : null
                // }
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
                editText={startMonth}
                error={startMonthError}
                errorMessage={startMonthErrorMsg}
                // editText={
                //   startMonth
                //     ? startMonth
                //     : editJob
                //     ? editJob.startMonth
                //       ? editJob.startMonth
                //       : null
                //     : null
                // }
                onCallBack={FunstartDateMonth}
              />

              <Select
                data={getYears()}
                placeholder={'Start year'}
                isEdit={isEdit}
                editText={startYear}
                error={startYearError}
                errorMessage={startYearErrorMsg}
                // editText={
                //   startYear
                //     ? startYear
                //     : editJob
                //     ? editJob.startYear
                //       ? editJob.startYear
                //       : null
                //     : null
                // }
                onCallBack={FunstartDateYear}
              />

              <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
                End date
              </Text>
              <Select
                data={Months}
                placeholder={'Start month'}
                isEdit={isEdit}
                editText={endMonth}
                error={endMonthError}
                errorMessage={endMonthErrorMsg}
                // editText={
                //   endMonth
                //     ? endMonth
                //     : editJob
                //     ? editJob.endMonth
                //       ? editJob.endMonth
                //       : null
                //     : null
                // }
                onCallBack={FunendDateMonth}
              />

              <Select
                data={getYears()}
                placeholder={'Start year'}
                isEdit={isEdit}
                editText={endYear}
                error={endYearError}
                errorMessage={endYearErrorMsg}
                // editText={
                //   endYear
                //     ? endYear
                //     : editJob
                //     ? editJob.endYear
                //       ? editJob.endYear
                //       : null
                //     : null
                // }
                onCallBack={FunendDateYear}
              />
            </View>
            <BtnComponent
              placeholder={isEdit ? 'Edit' : 'Add'}
              onPress={() => {
                FunJobHistoryArray();
                onAdd();
                // setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
