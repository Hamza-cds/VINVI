import React, {useState, useEffect, useRef} from 'react';
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
import VLCPlayer from 'react-native-vlc-media-player/VLCPlayer';
import Video from 'react-native-video';

export default function VideoWallScreen({navigation, route}) {
  const [numOfColoums, setNumOfColoums] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  let [data, setData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  let [image, setImage] = useState('');
  let [uplaodMedia, setUploadMedia] = useState('');
  let [mediaType, setMediaType] = useState('');
  let [fileType, setFileType] = useState('');
  let uploadType = 2;
  let page = 1;
  let limit = 10;

  const DATA = useSelector(state => state.UserData);
  console.log('dispatch DATA', DATA);

  useEffect(() => {
    GetVideoWallData();
  }, []);

  const GetVideoWallData = () => {
    setIsLoading(true);
    GetDataVideoWallApi(uploadType, page, limit)
      .then(res => {
        console.log('video wall res', res);
        if (res.data.success) {
          setData((data = res.data.result));
          console.log('data video wall', data);
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
    formdata.append('Id', '0');
    formdata.append('UploadType', 2);
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

  // const getFileType = () => {
  //   console.log('image....', image);
  //   var Type = image.media;
  //   console.log('imageType', Type);
  //   var type = Type.split('.')[1];
  //   console.log('type', type);
  // };

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
            navigation.navigate('Home');
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
                    width: '16.40%',
                    aspectRatio: 1,
                    marginRight: 0.9,
                    backgroundColor: GREY,
                    marginTop: 10,
                  }}>
                  {!item.media.includes('.mp4') ? (
                    <Image
                      source={{uri: URL.concat(item.media)}}
                      style={{
                        width: '100%',
                        aspectRatio: 1,
                        marginRight: 0.9,
                        backgroundColor: GREY,
                      }}
                    />
                  ) : (
                    <Video
                      source={{uri: URL.concat(item.media)}} // Can be a URL or a local file.
                      paused={false}
                      muted={true}
                      repeat={true}
                      // seek={0.2}
                      style={{height: '100%', width: '100%'}}
                    />
                  )}
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
            <Text style={{color: '#242424'}}>No data!</Text>
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
          {/* <Video
            source={{uri: URL.concat(image.media)}} // Can be a URL or a local file.
            ref={ref => {
              let player = ref;
            }} // Store reference
            //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
            //  onError={this.videoError}               // Callback when video cannot be loaded
            style={{height: '100%', width: '100%'}}
          /> */}

          <VLCPlayer
            style={{flex: 1}}
            // videoAspectRatio="16:9"
            // autoAspectRatio={true}
            source={{uri: URL.concat(image.media)}}
            showBack={true}
            resizeMode={'contain'}
            playInBackground={false}
            repeat={true}
            paused={false}
            onProgress={() => {
              setIsLoading(false);
              console.log('progress');
            }}
            onPlaying={() => {
              setIsLoading(true);
              console.log('playing');
            }}
            onBuffering={() => {
              setIsLoading(true);
            }}
          />
        </View>
        {isLoading ? <Loader /> : null}
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
