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
}) {
  console.log('isEdit', isEdit);
  console.log('jobhistoryarray', jobhistoryarray);
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

  const Year = [
    {id: 1, name: '1960'},
    {id: 22, name: '1961'},
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
    console.log('EditArrayJobHistory', EditArrayJobHistory);
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
    console.log('newEditModalJobObj', newEditModalJobObj);
    console.log('jobhistoryarray onEdit', jobhistoryarray);

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
        console.log('Edit Skill Data', data);

        if (data.data.status == 200 && data.data.success == true) {
          setIsLoading(false);
          setModalVisible(false);
        } else {
          setIsLoading(false);
          alert(data.message);
          console.log('ADD');
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
    console.log('industry', industry);
  };
  const FunEmployee = value => {
    setEmployee((employee = value.name));
    console.log('employee', employee);
  };
  const FunstartDateMonth = value => {
    setStartMonth((startMonth = value.name));
    console.log('startMonth', startMonth);
  };
  const FunstartDateYear = value => {
    setStartYear((startYear = value.name));
    console.log('startYear', startYear);
  };
  const FunendDateMonth = value => {
    setEndMonth((endMonth = value.name));
    console.log('endMonth', endMonth);
  };
  const FunendDateYear = value => {
    setEndYear((endYear = value.name));
    console.log('endYear', endYear);
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
                placeholder="Title"
                inputType="text"
                text={editJob ? (editJob.title ? editJob.title : null) : null}
                onChange={value => {
                  setTitle(value);
                  // console.log(value);
                }}
              />
              <OutlinedInputBox
                placeholder="Company Name"
                inputType="text"
                text={
                  editJob
                    ? editJob.companyName
                      ? editJob.companyName
                      : null
                    : null
                }
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
                onCallBack={FunstartDateMonth}
              />

              <Select
                data={Year}
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
                onCallBack={FunstartDateYear}
              />

              <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
                End date
              </Text>
              <Select
                data={Months}
                placeholder={'Start month'}
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
                onCallBack={FunendDateMonth}
              />

              <Select
                data={Year}
                placeholder={'Start year'}
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
