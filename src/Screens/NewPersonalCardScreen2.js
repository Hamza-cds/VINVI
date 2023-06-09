import React, {useState, useEffect} from 'react';
import {View, ImageBackground, ScrollView, BackHandler} from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import LinkBtn from '../Components/LinkBtn';
import NewCardStepPanel from '../Components/NewCardStepPanel';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import {Height, Width} from '../Constants/Constants';
import {useSelector, useDispatch} from 'react-redux';
import {PCScreen2Data} from '../../Store/Action';

export default function NewCardScreen(props) {
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');
  const [snapchat, setSnapchat] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [website, setWebsite] = useState('');

  const dispatch = useDispatch();

  const DATA_TEST = useSelector(state => state.PCData);
  console.log('DATA_TEST', DATA_TEST);

  let object = {
    PersonalcardScreen2Array: [
      {
        PersonalKey: 'facebook link',
        PersonalValue: facebook.trim(),
        Ishidden: true,
      },
      {
        PersonalKey: 'twitter link',
        PersonalValue: twitter.trim(),
        Ishidden: true,
      },
      {
        PersonalKey: 'instagram link',
        PersonalValue: instagram.trim(),
        Ishidden: true,
      },
      {
        PersonalKey: 'youtube link',
        PersonalValue: youtube.trim(),
        Ishidden: true,
      },
      {
        PersonalKey: 'snapchat link',
        PersonalValue: snapchat.trim(),
        Ishidden: true,
      },
      {
        PersonalKey: 'whatsapp link',
        PersonalValue: whatsapp.trim(),
        Ishidden: true,
      },
      {
        PersonalKey: 'website link',
        PersonalValue: website.trim(),
        Ishidden: true,
      },
    ],
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
    <View style={{flex: 1}}>
      <ScrollView>
        <ImageBackground
          source={require('../Assets/screenbg.png')}
          style={{flex: 1}}>
          <Header
            navigation={props.navigation}
            variant="light2"
            // headerIcon={
            //   <Svg
            //     xmlns="http://www.w3.org/2000/svg"
            //     width={20.936}
            //     height={20.828}
            //     viewBox="0 0 24.936 25.828">
            //     <Path
            //       d="M24.557 23.525l-6.147-6.393a10.424 10.424 0 10-7.982 3.724 10.316 10.316 0 005.974-1.887l6.194 6.442a1.36 1.36 0 101.96-1.886zM10.428 2.72a7.708 7.708 0 11-7.712 7.708 7.716 7.716 0 017.712-7.708z"
            //       fill="#4a5a92"
            //     />
            //   </Svg>
            // }
            headerName="Add Card"
            onPress={() => {
              props.navigation.push('NewPersonalCard1');
            }}
          />
          <NewCardStepPanel
            step1={true}
            step2={true}
            step3={false}
            step4={false}
          />
          <View
            style={{
              width: '100%',
              padding: 20,
            }}>
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
              onChange={value => {
                setFacebook(value);
              }}
              placeholder="Facebook Link"
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
              onChange={value => {
                setTwitter(value);
              }}
              placeholder="Twitter Link"
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
              onChange={value => {
                setInstagram(value);
              }}
              placeholder="Instagram Link"
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
              onChange={value => {
                setYoutube(value);
              }}
              placeholder="YouTube Link"
            />
            <LinkBtn
              svg={
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20.837}
                  height={20.11}
                  viewBox="0 0 28.837 27.11">
                  <Path
                    data-name="Icon awesome-snapchat-ghost"
                    d="M28.771 21.252c-.293.685-1.534 1.188-3.794 1.539a10.564 10.564 0 00-.366 1.349.652.652 0 01-.683.5h-.017c-.529 0-1.082-.243-2.188-.243a4.457 4.457 0 00-3.168 1.16 6.343 6.343 0 01-4.169 1.543 6.469 6.469 0 01-4.1-1.543 4.452 4.452 0 00-3.168-1.159 21.273 21.273 0 00-2.188.266.668.668 0 01-.7-.509 10.433 10.433 0 00-.367-1.359C2.694 22.613.068 22.155 0 20.983a.6.6 0 01.5-.623c3.919-.645 5.684-4.669 5.758-4.84l.013-.029a1.28 1.28 0 00.139-1.056c-.284-.671-1.51-.913-2.03-1.113-1.336-.528-1.522-1.134-1.442-1.549a1.45 1.45 0 011.859-.87 3.223 3.223 0 001.326.355 1.15 1.15 0 00.561-.122c-.115-2.024-.4-4.916.32-6.532a7.673 7.673 0 017.123-4.6l.569-.005a7.62 7.62 0 017.137 4.6c.72 1.614.436 4.494.321 6.534a1.1 1.1 0 00.484.12 3.365 3.365 0 001.243-.352 1.524 1.524 0 011.153 0 1.17 1.17 0 01.878 1.006c.01.549-.48 1.023-1.457 1.409a6.732 6.732 0 01-.419.142c-.552.175-1.385.44-1.612.973a1.279 1.279 0 00.139 1.056c0 .009.009.019.013.029.073.171 1.837 4.194 5.758 4.84a.615.615 0 01.437.896z"
                    fill="#ffd300"
                  />
                </Svg>
              }
              onChange={value => {
                setSnapchat(value);
              }}
              placeholder="Snapchat Link"
            />
            <LinkBtn
              svg={
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20.25}
                  height={20.25}
                  viewBox="0 0 24.25 24.25">
                  <Path
                    data-name="Icon ionic-logo-whatsapp"
                    d="M12.345 0A11.859 11.859 0 00.44 11.813a11.691 11.691 0 001.708 6.1L0 24.25l6.591-2.094A11.925 11.925 0 0024.25 11.813 11.859 11.859 0 0012.345 0zm5.92 16.3a3.075 3.075 0 01-2.106 1.357c-.558.03-.574.433-3.618-.89a12.421 12.421 0 01-5.019-4.746 5.838 5.838 0 01-1.123-3.164 3.373 3.373 0 011.159-2.475 1.166 1.166 0 01.825-.347c.24 0 .395-.007.572 0s.443-.037.674.576.782 2.119.852 2.273a.552.552 0 01.006.529 2.067 2.067 0 01-.323.492c-.159.17-.334.381-.476.511-.158.144-.323.3-.157.61a9.11 9.11 0 001.612 2.151 8.306 8.306 0 002.387 1.587c.3.163.477.145.662-.05s.792-.852 1.007-1.146.415-.237.69-.126 1.741.9 2.039 1.058.5.245.569.373a2.5 2.5 0 01-.232 1.426z"
                    fill="#068e0f"
                  />
                </Svg>
              }
              onChange={value => {
                setWhatsapp(value);
              }}
              placeholder="Whatsapp Link"
            />
            <LinkBtn
              svg={
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20.88}
                  height={20.875}
                  viewBox="0 0 20.88 20.875">
                  <Path
                    data-name="Icon ionic-ios-globe"
                    d="M10.437 0h-.035a10.438 10.438 0 00.005 20.875h.035A10.438 10.438 0 1010.437 0zm9.042 9.735h-3.893a19.761 19.761 0 00-.492-3.824 15.287 15.287 0 002.494-1.054 8.99 8.99 0 011.892 4.878zm-9.745 0h-3.1a17.836 17.836 0 01.442-3.467 15.267 15.267 0 002.659.357zm0 1.405v3.106a15.331 15.331 0 00-2.66.356 17.834 17.834 0 01-.442-3.462zm1.405 0h3.076a17.732 17.732 0 01-.442 3.457 14.978 14.978 0 00-2.634-.351zm0-1.405v-3.11a15.332 15.332 0 002.634-.351 17.784 17.784 0 01.442 3.462zm5.486-5.916a13.94 13.94 0 01-1.907.778 10.361 10.361 0 00-1.33-2.735 9.08 9.08 0 013.237 1.957zm-3.227 1.139a14.122 14.122 0 01-2.258.3V1.576a6.08 6.08 0 012.258 3.382zm-3.663-3.4v3.7a13.879 13.879 0 01-2.283-.306 6.077 6.077 0 012.283-3.396zm-2.288.321a10.443 10.443 0 00-1.322 2.712 14.254 14.254 0 01-1.88-.772 8.945 8.945 0 013.202-1.942zm-4.16 2.983a14.984 14.984 0 002.469 1.044 18.965 18.965 0 00-.492 3.819H1.4a8.944 8.944 0 011.887-4.863zM1.395 11.14h3.864a19.71 19.71 0 00.492 3.824 15.9 15.9 0 00-2.469 1.044 8.991 8.991 0 01-1.887-4.868zm2.845 5.916a14.044 14.044 0 011.885-.772 10.48 10.48 0 001.32 2.72 9.167 9.167 0 01-3.205-1.948zm3.212-1.131a13.952 13.952 0 012.283-.306v3.7a6.068 6.068 0 01-2.283-3.394zm3.688 3.377v-3.691a14.123 14.123 0 012.258.3 6.077 6.077 0 01-2.258 3.388zm2.258-.286a10.361 10.361 0 001.33-2.735 13.711 13.711 0 011.907.783 9.185 9.185 0 01-3.237 1.949zm4.19-3a15.287 15.287 0 00-2.494-1.054 19.658 19.658 0 00.492-3.819h3.894a8.951 8.951 0 01-1.892 4.87z"
                    fill="#006084"
                  />
                </Svg>
              }
              onChange={value => {
                setWebsite(value);
              }}
              placeholder="Website Link"
            />

            <View style={{marginTop: 20}}>
              <BtnComponent
                placeholder="Next"
                onPress={() => {
                  dispatch(PCScreen2Data(object));
                  props.navigation.navigate('NewPersonalCard3');
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
      {/* //{' '} */}
    </View>
  );
}
