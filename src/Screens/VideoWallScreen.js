import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {GetDataVideoWallApi} from '../Apis/Repo';
import Loader from '../Components/Loader';
import {GREY, PRIMARY, WHITE} from '../Constants/Colors';
import {URL} from '../Constants/Constants';
import Header from '../Components/Header';
import Feather from 'react-native-vector-icons/Feather';
import BtnComponent from '../Components/BtnComponent';
// import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
// import VideoComponant from '../Components/VideoComponant';
import {launchImageLibrary} from 'react-native-image-picker';
import {storyPostApiCall} from '../Apis/Repo';
import {isValidImage, isValidVideo} from '../Constants/Validations';
import {VLCPlayer, VlCPlayerView} from 'react-native-vlc-media-player';

export default function VideoWallScreen({navigation, route}) {
  const [numOfColoums, setNumOfColoums] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  let [data, setData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  let [image, setImage] = useState('');
  let [uplaodMedia, setUploadMedia] = useState('');
  let [mediaType, setMediaType] = useState('');
  let page = 1;
  let limit = 20;

  const DATA = useSelector(state => state.UserData);
  console.log('dispatch DATA', DATA);

  useEffect(() => {
    GetVideoWallData();
  }, []);

  const GetVideoWallData = () => {
    setIsLoading(true);
    GetDataVideoWallApi(page, limit)
      .then(res => {
        console.log('video wall res', res);
        if (res.data.success) {
          setData((data = res.data.result));
          setIsLoading(false);
        } else {
          setIsLoading(false);
          alert('No data found!');
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  const onSelecet = image => {
    setIsVisible(false);
    console.log('image', image);
    for (let index = 0; index < image.assets.length; index++) {
      const element = image.assets[index];
      setUploadMedia((uplaodMedia = element));
    }
    var imageType = uplaodMedia.type;
    console.log('imageType', imageType);
    var type = imageType.split('/')[1];
    console.log('type', type);
    setMediaType((mediaType = type));

    var formdata = new FormData();
    formdata.append('Id', 2);
    formdata.append('Title', 'this is title');
    formdata.append('Description', 'this is description');
    formdata.append('UserId', JSON.stringify(DATA.id));
    formdata.append('media_file', {
      uri: uplaodMedia.uri,
      name: uplaodMedia.fileName + '.' + mediaType,
      type: uplaodMedia.type,
    });
    console.log('formdata', formdata);
    setIsLoading(true);
    storyPostApiCall(formdata)
      .then(res => res.json())
      .then(data => {
        console.log('response', data);
        if (data.status === 200 && data.success === true) {
          setIsLoading(false);
          GetVideoWallData();
          // props.navigation.replace('MyCardsDashboardScreen');
          alert('successfully posted');
        } else {
          setIsLoading(false);
          alert('invalid request');
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  const checkMedia = image => {
    console.log('image....', image);
    var Type = image.media;
    console.log('imageType', Type);
    var type = Type.split('.')[1];
    console.log('type', type);
    // setMediaType((mediaType = type));

    if (isValidImage(image.media)) {
      setModalVisible(true);
    } else if (isValidVideo(image.media)) {
      setViewModal(true);
    }
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: WHITE}}>
        <Header
          navigation={navigation}
          variant="hamza"
          headerName="Video Wall"
          back={true}
          onPress={() => {
            props.navigation.navigate('Home');
          }}
        />

        {data != null ? (
          <FlatList
            data={data}
            horizontal={false}
            numColumns={numOfColoums}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setImage((image = item));
                    checkMedia(image);
                    // setModalVisible(true);
                  }}
                  style={{
                    width: '33.25%',
                    aspectRatio: 1,
                    marginRight: 0.9,
                    backgroundColor: GREY,
                  }}>
                  <Image
                    source={{uri: URL.concat(item.media)}}
                    style={{
                      width: '100%',
                      aspectRatio: 1,
                      marginRight: 0.9,
                      backgroundColor: GREY,
                    }}
                  />
                </TouchableOpacity>
              </>
            )}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 300,
            }}>
            <Text style={{color: '#242424'}}>No data !</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
          style={{
            height: 50,
            width: 50,
            backgroundColor: PRIMARY,
            borderRadius: 50,
            alignSelf: 'flex-end',
            marginRight: 20,
            marginBottom: 20,
          }}>
          <Feather
            name="upload"
            size={30}
            color={WHITE}
            style={{alignSelf: 'center', marginVertical: 5}}
          />
        </TouchableOpacity>

        {isLoading ? <Loader /> : null}
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{flex: 1, backgroundColor: 'black', justifyContent: 'center'}}>
          <Image
            source={{uri: URL.concat(image.media)}}
            style={{height: '70%', width: '100%'}}
          />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={viewModal}
        onRequestClose={() => {
          setViewModal(false);
        }}>
        <View
          style={{flex: 1, backgroundColor: 'black', justifyContent: 'center'}}>
          <VLCPlayer
            style={{flex: 1}}
            videoAspectRatio="16:9"
            source={{uri: URL.concat(image.media)}}
          />
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          // alert('Modal has been closed.');
          setIsVisible(!isVisible);
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '55%',
            backgroundColor: 'rgba(255,255,255,.5)',
          }}
          onPress={() => setIsVisible(!isVisible)}
        />
        <View
          style={{
            width: '100%',
            backgroundColor: WHITE,
            bottom: 0,
            padding: 20,
            position: 'absolute',
            height: '45%',
          }}>
          <BtnComponent
            placeholder="Open Camera"
            onPress={() => {
              launchImageLibrary({mediaType: 'mixed'}, image => {
                if (image.didCancel) {
                  console.log('User cancelled image picker');
                } else {
                  onSelecet(image);
                }
              });
            }}
          />
          <BtnComponent
            placeholder="Upload Image"
            onPress={() => {
              launchImageLibrary({mediaType: 'mixed'}, image => {
                if (image.didCancel) {
                  console.log('User cancelled image picker');
                } else {
                  onSelecet(image);
                }
              });
            }}
          />
          <BtnComponent
            placeholder="Close"
            onPress={() => setIsVisible(!isVisible)}
          />
        </View>
      </Modal>
    </>
  );
}

// import React, {useState, useRef} from 'react';
// import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import Video from 'react-native-video';
// import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

// export default function VideoWallScreen() {
//   const videoPlayer = useRef(null);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [paused, setPaused] = useState(false);
//   const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
//   const [screenType, setScreenType] = useState('content');

//   const onSeek = seek => {
//     //Handler for change in seekbar
//     videoPlayer.current.seek(seek);
//   };

//   const onPaused = playerState => {
//     //Handler for Video Pause
//     setPaused(!paused);
//     setPlayerState(playerState);
//   };

//   const onReplay = () => {
//     //Handler for Replay
//     setPlayerState(PLAYER_STATES.PLAYING);
//     videoPlayer.current.seek(0);
//   };

//   const onProgress = data => {
//     // Video Player will progress continue even if it ends
//     if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
//       setCurrentTime(data.currentTime);
//     }
//   };

//   const onLoad = data => {
//     setDuration(data.duration);
//     setIsLoading(false);
//   };

//   const onLoadStart = data => setIsLoading(true);

//   const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

//   const onError = () => alert('Oh! ', error);

//   const exitFullScreen = () => {
//     alert('Exit full screen');
//   };

//   const enterFullScreen = () => {};

//   const onFullScreen = () => {
//     setIsFullScreen(isFullScreen);
//     if (screenType == 'content') setScreenType('cover');
//     else setScreenType('content');
//   };

//   const renderToolbar = () => (
//     <View>
//       <Text style={styles.toolbar}> toolbar </Text>
//     </View>
//   );

//   const onSeeking = currentTime => setCurrentTime(currentTime);

//   return (
//     <View style={{flex: 1}}>
//       <Video
//         onEnd={onEnd}
//         onLoad={onLoad}
//         onLoadStart={onLoadStart}
//         onProgress={onProgress}
//         paused={paused}
//         ref={videoPlayer}
//         resizeMode={screenType}
//         onFullScreen={isFullScreen}
//         source={{
//           uri: '../Assets/hamtum.mp4',
//         }}
//         style={styles.mediaPlayer}
//         volume={10}
//       />
//       <MediaControls
//         duration={duration}
//         isLoading={isLoading}
//         mainColor="#333"
//         onFullScreen={onFullScreen}
//         onPaused={onPaused}
//         onReplay={onReplay}
//         onSeek={onSeek}
//         onSeeking={onSeeking}
//         playerState={playerState}
//         progress={currentTime}
//         toolbar={renderToolbar()}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   toolbar: {
//     marginTop: 30,
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 5,
//   },
//   mediaPlayer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//   },
// });
