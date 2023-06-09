import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import OutlinedInputBox from '../Components/OutlinedInputBox';
import UploadBtn from '../Components/UploadBtn';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {G, Path} from 'react-native-svg';
import {Height, Width} from '../Constants/Constants';
import LinkBtn from '../Components/LinkBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WHITE} from '../Constants/Colors';
import MultiSelect from '../Components/MultiSelect';
import {useDispatch} from 'react-redux';
import {BCData} from '../../Store/Action';
import Select from '../Components/Select';
import {GetAllLookupDetailApiCall} from '../Apis/Repo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {isNullOrEmpty} from '../Constants/TextUtils';

export default function NewBusinessCardScreen1(props) {
  const dispatch = useDispatch();

  const [businessName, setBusinessName] = useState('');
  const [area, setArea] = useState('');
  const [tagline, setTagline] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [number, setNumber] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [logo, setLogo] = useState('');
  const [logoImageName, setLogoImageName] = useState('');
  const [cover, setCover] = useState('');
  const [coverImageName, setCoverImageName] = useState('');
  const [otherInfo, setOtherInfo] = useState('');
  const [industry, setIndustry] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  let [industryType, setIndustryType] = useState([]);
  let [lookupData, setLookupData] = useState([]);

  console.log('industry', industry);

  // const data = [
  //   {
  //     id: 1,
  //     name: 'Lahore',
  //   },
  //   {
  //     id: 2,
  //     name: 'Karachi',
  //   },
  //   {
  //     id: 3,
  //     name: 'Pindi',
  //   },
  // ];

  let [userData, setUserData] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user_data').then(response => {
      setUserData((userData = JSON.parse(response)));
      console.log('userdata', userData);

      getAllLookupdetail();
    });
  }, []);

  // useEffect(() => {
  //   getAllLookupdetail();
  // });

  const getAllLookupdetail = () => {
    // setIsLoading(true);
    GetAllLookupDetailApiCall()
      .then(res => {
        setLookupData((lookupData = res.data.result));
        console.log('lookupData', lookupData);
        // setIsLoading(false);

        for (let index = 0; index < lookupData.length; index++) {
          const element = lookupData[index];
          if (element.lookupId == 9) {
            let arrayIndustryType = industryType;
            arrayIndustryType.push(element);
            setIndustryType((industryType = arrayIndustryType));
          }
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const logoImage = image => {
    console.log('image Logo', image);
    var imageMime = image.mime;
    var name = imageMime.split('/')[1];
    setLogoImageName('vinviLogo.' + name);
    setLogo(image);
  };

  const coverImage = image => {
    console.log('image cover', image);
    var imageMime = image.mime;
    var name = imageMime.split('/')[1];
    setCoverImageName('vinviCover.' + name);
    setCover(image);
  };

  const onNext = () => {
    if (isNullOrEmpty(businessName)) {
      alert('Enter business name');
    } else if (isNullOrEmpty(number)) {
      alert('Enter number');
    }
    //  else if (isNullOrEmpty(businessAddress)) {
    //   alert('Enter business address');
    // }
    else {
      let object = {
        b_Name: businessName.trim(),
        b_Area: area,
        b_Tagline: tagline.trim(),
        b_Industry: industry,
        // b_Website: companyWebsite.trim(),
        b_Number: number.trim(),
        b_Address: businessAddress.trim(),
        b_OtherInfo: otherInfo.trim(),
        b_Logo: logo,
        b_LogoName: logoImageName.trim(),
        b_Cover: cover,
        b_CoverName: coverImageName.trim(),
      };

      let metaObj = {
        businessCardArray: [
          {
            PersonalKey: 'facebook link',
            PersonalValue: facebookLink.trim(),
            Ishidden: true,
          },
          {
            PersonalKey: 'twitter link',
            PersonalValue: twitterLink.trim(),
            Ishidden: true,
          },
          {
            PersonalKey: 'website link',
            PersonalValue: websiteLink.trim(),
            Ishidden: true,
          },
          {
            PersonalKey: 'instagram link',
            PersonalValue: instagramLink.trim(),
            Ishidden: true,
          },
          {
            PersonalKey: 'youtube link',
            PersonalValue: youtubeLink.trim(),
            Ishidden: true,
          },
        ],
      };

      console.log('object', object);

      dispatch(BCData(object));
      props.navigation.navigate('NewBusinessCard2', {
        meta: metaObj,
      });
    }
  };

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <SafeAreaView style={{height: Height, width: Width}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <Header
          navigation={props.navigation}
          variant="white"
          headerName="Add Card"
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              backgroundColor: WHITE,
              width: '100%',
              padding: 20,
            }}>
            <OutlinedInputBox
              placeholder="Name of Business"
              inputType="text"
              onChange={value => {
                setBusinessName(value);
              }}
            />
            {/* <MultiSelect placeholder="Area" data={data} onCallBack={setArea} /> */}
            <Select
              placeholder={'Industry type'}
              data={industryType}
              onCallBack={setIndustry}
              editText={
                industry ? (industry.name ? industry.name : null) : null
              }
            />
            <OutlinedInputBox
              placeholder="Any Other Information"
              inputType="text"
              onChange={value => {
                setOtherInfo(value);
              }}
            />
            <OutlinedInputBox
              placeholder="Tagline"
              inputType="text"
              onChange={value => {
                setTagline(value);
              }}
            />
            {/* <OutlinedInputBox
              placeholder="Company website"
              inputType="text"
              KeyboardType={'email-address'}
              onChange={value => {
                setCompanyWebsite(value);
              }}
            /> */}
            <OutlinedInputBox
              placeholder="Contact Number"
              inputType="text"
              maxLength={11}
              KeyboardType={'phone-pad'}
              onChange={value => {
                setNumber(value);
              }}
            />
            <OutlinedInputBox
              placeholder="Business Address"
              inputType="text"
              onChange={value => {
                setBusinessAddress(value);
              }}
            />
            <View
              style={{
                width: '100%',
              }}>
              <LinkBtn
                svg={
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20.88}
                    height={20.875}
                    viewBox="0 0 20.88 20.875">
                    <Path
                      data-name="Icon ionic-ios-globe"
                      d="M13.812 3.375h-.035a10.438 10.438 0 00.005 20.875h.035a10.438 10.438 0 10-.005-20.875zm9.042 9.735h-3.893a19.761 19.761 0 00-.492-3.824 15.287 15.287 0 002.494-1.054 8.99 8.99 0 011.892 4.878zm-9.745 0h-3.1a17.836 17.836 0 01.442-3.467A15.267 15.267 0 0013.11 10zm0 1.405v3.106a15.331 15.331 0 00-2.66.356 17.834 17.834 0 01-.442-3.462zm1.405 0h3.076a17.732 17.732 0 01-.442 3.457 14.978 14.978 0 00-2.634-.351zm0-1.405V10a15.332 15.332 0 002.634-.351 17.784 17.784 0 01.442 3.462zM20 7.194a13.94 13.94 0 01-1.907.778 10.361 10.361 0 00-1.33-2.735A9.08 9.08 0 0120 7.194zm-3.227 1.139a14.122 14.122 0 01-2.258.3V4.951a6.08 6.08 0 012.258 3.382zm-3.663-3.4v3.7a13.879 13.879 0 01-2.283-.306 6.077 6.077 0 012.283-3.396zm-2.288.321A10.443 10.443 0 009.5 7.966a14.254 14.254 0 01-1.88-.772 8.945 8.945 0 013.202-1.942zm-4.16 2.983a14.984 14.984 0 002.469 1.044 18.965 18.965 0 00-.492 3.819H4.775a8.944 8.944 0 011.887-4.863zM4.77 14.515h3.864a19.71 19.71 0 00.492 3.824 15.9 15.9 0 00-2.469 1.044 8.991 8.991 0 01-1.887-4.868zm2.845 5.916a14.044 14.044 0 011.885-.772 10.48 10.48 0 001.32 2.72 9.167 9.167 0 01-3.205-1.948zm3.212-1.131a13.952 13.952 0 012.283-.306v3.7a6.068 6.068 0 01-2.283-3.394zm3.688 3.377v-3.691a14.123 14.123 0 012.258.3 6.077 6.077 0 01-2.258 3.388zm2.258-.286a10.361 10.361 0 001.33-2.735 13.711 13.711 0 011.907.783 9.185 9.185 0 01-3.237 1.949zm4.19-3a15.287 15.287 0 00-2.494-1.054 19.658 19.658 0 00.492-3.819h3.894a8.951 8.951 0 01-1.892 4.87z"
                      transform="translate(-3.375 -3.375)"
                      fill="#006084"
                    />
                  </Svg>
                }
                placeholder="Website Link"
                onChange={value => {
                  setWebsiteLink(value);
                }}
              />
              <LinkBtn
                svg={
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14.633}
                    height={20.321}
                    viewBox="0 0 14.633 27.321">
                    <Path
                      data-name="Icon awesome-facebook-f"
                      d="M13.674 15.368l.759-4.944H9.691V7.215a2.472 2.472 0 012.788-2.671h2.157V.334A26.3 26.3 0 0010.804 0c-3.907 0-6.46 2.368-6.46 6.655v3.768H0v4.944h4.344v11.954h5.347V15.368z"
                      fill="#066aff"
                    />
                  </Svg>
                }
                placeholder="Facebook Link"
                onChange={value => {
                  setFacebookLink(value);
                }}
              />
              <LinkBtn
                svg={
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20.145}
                    height={20.497}
                    viewBox="0 0 32.145 26.497">
                    <Path
                      data-name="Icon awesome-twitter"
                      d="M28.841 6.603c.02.29.02.58.02.869 0 8.839-6.629 19.024-18.744 19.024A18.419 18.419 0 010 23.495a13.431 13.431 0 001.591.083 13.071 13.071 0 008.179-2.859 6.613 6.613 0 01-6.16-4.637 8.189 8.189 0 001.244.1 6.871 6.871 0 001.734-.228 6.663 6.663 0 01-5.283-6.562v-.073a6.561 6.561 0 002.978.849 6.762 6.762 0 01-2.039-8.949 18.637 18.637 0 0013.584 7 7.656 7.656 0 01-.163-1.532A6.635 6.635 0 0122.253.001a6.528 6.528 0 014.814 2.111A12.855 12.855 0 0031.248.497a6.651 6.651 0 01-2.9 3.685 13.055 13.055 0 003.794-1.035 14.279 14.279 0 01-3.3 3.457z"
                      fill="#09f"
                    />
                  </Svg>
                }
                placeholder="Twitter Link"
                onChange={value => {
                  setTwitterLink(value);
                }}
              />
              <LinkBtn
                svg={
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20.497}
                    height={20.491}
                    viewBox="0 0 29.497 29.491">
                    <Path
                      data-name="Icon awesome-instagram"
                      d="M14.752 7.184a7.561 7.561 0 107.561 7.561 7.549 7.549 0 00-7.561-7.561zm0 12.477a4.916 4.916 0 114.916-4.916 4.925 4.925 0 01-4.916 4.917zm9.634-12.786a1.764 1.764 0 11-1.764-1.764 1.759 1.759 0 011.764 1.764zm5.008 1.79a8.728 8.728 0 00-2.382-6.179A8.785 8.785 0 0020.833.104c-2.435-.138-9.733-.138-12.167 0a8.772 8.772 0 00-6.18 2.375A8.756 8.756 0 00.105 8.662c-.14 2.431-.14 9.729 0 12.163a8.728 8.728 0 002.382 6.179 8.8 8.8 0 006.178 2.383c2.435.138 9.733.138 12.167 0a8.728 8.728 0 006.179-2.382 8.785 8.785 0 002.382-6.179c.138-2.435.138-9.726 0-12.161zm-3.146 14.773a4.977 4.977 0 01-2.8 2.8c-1.941.77-6.548.592-8.693.592s-6.758.171-8.693-.592a4.977 4.977 0 01-2.8-2.8c-.77-1.941-.592-6.548-.592-8.693s-.171-6.758.592-8.693a4.977 4.977 0 012.8-2.8c1.943-.773 6.543-.595 8.69-.595s6.758-.171 8.693.592a4.977 4.977 0 012.8 2.8c.77 1.941.592 6.548.592 8.693s.181 6.761-.589 8.696z"
                      fill="#f90"
                    />
                  </Svg>
                }
                placeholder="Instagram Link"
                onChange={value => {
                  setInstagramLink(value);
                }}
              />
              <LinkBtn
                svg={
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20.784}
                    height={16.645}
                    viewBox="0 0 30.784 21.645">
                    <Path
                      data-name="Icon awesome-youtube"
                      d="M30.141 3.387A3.868 3.868 0 0027.42.647C25.019 0 15.392 0 15.392 0S5.765 0 3.365.647a3.868 3.868 0 00-2.722 2.74A40.578 40.578 0 000 10.845 40.578 40.578 0 00.643 18.3 3.81 3.81 0 003.365 21c2.4.647 12.027.647 12.027.647s9.627 0 12.027-.647a3.81 3.81 0 002.722-2.7 40.578 40.578 0 00.643-7.458 40.578 40.578 0 00-.643-7.458zm-17.9 12.035V6.267l8.046 4.577-8.046 4.577z"
                      fill="red"
                    />
                  </Svg>
                }
                placeholder="YouTube Link"
                onChange={value => {
                  setYoutubeLink(value);
                }}
              />

              <UploadBtn
                svg={logo}
                placeholder="Upload Logo"
                onCallBack={logoImage}
                label={'select logo'}
              />

              <UploadBtn
                svg={cover}
                placeholder="Upload Cover"
                onCallBack={coverImage}
                label={'select cover'}
              />

              <View style={{marginVertical: 10}}>
                <BtnComponent
                  placeholder="Next"
                  onPress={() => {
                    onNext();
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
