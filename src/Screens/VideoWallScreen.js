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
import {Height, URL} from '../Constants/Constants';
import Header from '../Components/Header';
import Feather from 'react-native-vector-icons/Feather';
import BtnComponent from '../Components/BtnComponent';
// import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
// import VideoComponant from '../Components/VideoComponant';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {storyPostApiCall} from '../Apis/Repo';
import {isValidVideo} from '../Constants/Validations';
import Video from 'react-native-video';
import {isNullOrEmptyArray} from '../Constants/TextUtils';
import InstaGrid from '../Components/InstaGrid';
import {useFocusEffect} from '@react-navigation/core';
import Entypo from 'react-native-vector-icons/Entypo';

export default function VideoWallScreen({navigation, route}) {
  const [numOfColoums, setNumOfColoums] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  let [data, setData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  let [objectPassInModal, setObjectPassInModal] = useState('');
  let [image, setImage] = useState('');
  let [uplaodMedia, setUploadMedia] = useState('');
  let [mediaType, setMediaType] = useState('');
  let [fileType, setFileType] = useState('');
  let page = 1;
  let limit = 36;

  const DATA = useSelector(state => state.UserData);
  // console.log('dispatch DATA', DATA);

  // console.log('viewModal', viewModal);

  // useEffect(() => {
  //   GetVideoWallData();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      setData((data = ''));
      GetVideoWallData();
    }, [navigation]),
  );

  const GetVideoWallData = () => {
    setIsLoading(true);
    GetDataVideoWallApi(page, limit)
      .then(res => {
        console.log('video wall res', res);
        if (res.data.success) {
          setData((data = res.data.result));
          console.log('data video wall', data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          // alert('No data found!');
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };

  const onSelecet = image => {
    setIsVisible(false);
    // console.log('image', image);
    // for (let index = 0; index < image.assets.length; index++) {
    //   const element = image.assets[index];
    //   setUploadMedia((uplaodMedia = element));
    // }
    var imageType = image.mime;
    // console.log('imageType', imageType);
    var type = imageType.split('/')[1];
    // console.log('type', type);
    setMediaType((mediaType = type));

    // console.log('mediaType', mediaType);

    // if (isValidVideo(mediaType)) {
    var formdata = new FormData();
    formdata.append('Id', '0');
    formdata.append('UploadType', 2);
    formdata.append('Title', 'this is title');
    formdata.append('Description', 'this is description');
    formdata.append('UserId', JSON.stringify(DATA.id));
    formdata.append('media_file', {
      uri: image.path,
      name: 'vinvi' + '.' + mediaType,
      type: image.mime,
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
    // } else {
    //   alert('Please only select videos');
    // }
  };

  // const modalFunction = () => {
  //   return (
  //     <Modal
  //       animationType="slide"
  //       transparent={false}
  //       visible={viewModal}
  //       onRequestClose={() => {
  //         setViewModal(!viewModal);
  //       }}>
  //       <View style={{height: '100%', width: '100%', backgroundColor: 'black'}}>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             marginVertical: 20,
  //             marginHorizontal: 20,
  //           }}>
  //           <Image
  //             source={
  //               objectPassInModal
  //                 ? objectPassInModal.profileImage
  //                   ? {uri: URL.concat(objectPassInModal.profileImage)}
  //                   : require('../Assets/profilePic.png')
  //                 : require('../Assets/profilePic.png')
  //             }
  //             style={{height: 50, width: 50, borderRadius: 50}}
  //           />

  //           <Text
  //             numberOfLines={1}
  //             style={{
  //               color: 'white',
  //               fontSize: 15,
  //               marginLeft: 15,
  //               marginVertical: 13,
  //             }}>
  //             {objectPassInModal.firstName}
  //           </Text>
  //         </View>

  //         <Video
  //           source={{uri: URL.concat(objectPassInModal.media)}} // Can be a URL or a local file.
  //           paused={false}
  //           muted={false}
  //           resizeMode="contain"
  //           repeat={true}
  //           fullscreen={true}
  //           bufferConfig={{
  //             minBufferMs: 15000,
  //             maxBufferMs: 50000,
  //             bufferForPlaybackMs: 2500,
  //             bufferForPlaybackAfterRebufferMs: 5000,
  //           }}
  //           onLoadStart={() => {
  //             setIsLoading(true);
  //           }}
  //           onLoad={() => {
  //             setIsLoading(false);
  //           }}
  //           style={{height: '80%', width: '100%'}}
  //         />
  //       </View>
  //       {isLoading ? <Loader /> : null}
  //     </Modal>
  //   );
  // };

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

        {!isNullOrEmptyArray(data) ? (
          <InstaGrid
            setObjectPassInModal={setObjectPassInModal}
            objectPassInModal={objectPassInModal}
            setViewModal={setViewModal}
            viewModal={viewModal}
            data={data}
            columns={3} // Set the desired number of columns in each row
            // onEndReachedThreshold={0.5} // Adjust the threshold as needed
            onEndReached={() => {
              // Implement logic for loading more data
            }}
          />
        ) : (
          // ) : (
          // <FlatList
          //   data={data}
          //   horizontal={false}
          //   numColumns={numOfColoums}
          //   keyExtractor={item => item.id}
          //   renderItem={({item, index}) => (
          //     <>
          //       <InstaGrid
          //         data={item}
          //         columns={3} // Set the desired number of columns in each row
          //         // onEndReachedThreshold={0.5} // Adjust the threshold as needed
          //         onEndReached={() => {
          //           // Implement logic for loading more data
          //         }}
          //         // loading={false} // Set to true when loading more data
          //         // onItemClick={onItemClick}
          //       />
          //       {/* <TouchableOpacity
          //             onPress={() => {
          //               setImage((image = item));
          //               // checkMedia(image);
          //               setViewModal(true);
          //             }}
          //             style={{
          //               width: '16.40%',
          //               aspectRatio: 1,
          //               marginRight: 0.9,
          //               backgroundColor: GREY,
          //               marginTop: 10,
          //             }}>
          //             {!item.media.includes('.mp4') ? null : (
          //               <Video
          //                 source={{uri: URL.concat(item.media)}} // Can be a URL or a local file.
          //                 paused={false}
          //                 muted={true}
          //                 repeat={true}
          //                 // seek={0.2}
          //                 style={{height: '100%', width: '100%'}}
          //               />
          //             )}
          //           </TouchableOpacity> */}
          //     </>
          //   )}
          // />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              position: 'absolute',
              top: Height - Height / 2,
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
            position: 'absolute',
            bottom: 10,
            right: 10,
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
          setViewModal(!viewModal);
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'black',
            zIndex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 20,
              marginHorizontal: 20,
            }}>
            <Image
              source={
                objectPassInModal
                  ? objectPassInModal.profileImage
                    ? {uri: URL.concat(objectPassInModal.profileImage)}
                    : require('../Assets/profilePic.png')
                  : require('../Assets/profilePic.png')
              }
              style={{height: 50, width: 50, borderRadius: 50}}
            />

            <Text
              numberOfLines={1}
              style={{
                color: 'white',
                fontSize: 15,
                marginLeft: 15,
                marginVertical: 13,
              }}>
              {objectPassInModal.firstName}
            </Text>
          </View>

          {objectPassInModal ? (
            objectPassInModal.media.endsWith('.mp4') ||
            objectPassInModal.media.endsWith('.3gp') ||
            objectPassInModal.media.endsWith('.mkv') ||
            objectPassInModal.media.endsWith('.rmvb') ? (
              <Video
                source={{uri: URL.concat(objectPassInModal.media)}} // Can be a URL or a local file.
                paused={false}
                muted={false}
                resizeMode="contain"
                repeat={true}
                fullscreen={true}
                bufferConfig={{
                  minBufferMs: 15000,
                  maxBufferMs: 50000,
                  bufferForPlaybackMs: 2500,
                  bufferForPlaybackAfterRebufferMs: 5000,
                }}
                onLoadStart={() => {
                  setIsLoading(true);
                  console.log('abi load ho raha ha');
                }}
                onLoad={() => {
                  console.log('load complete ho gaya ha');
                  setIsLoading(false);
                }}
                style={{height: '80%', width: '100%'}}
              />
            ) : (
              <Image
                style={{height: '80%', width: '100%'}}
                source={{uri: URL.concat(objectPassInModal.media)}}
                onLoadStart={() => {
                  setIsLoading(true);
                }}
                onLoad={() => {
                  setIsLoading(false);
                }}
              />
            )
          ) : null}
        </View>
        {isLoading ? (
          <Loader
            cancil={true}
            onPress={() => {
              setViewModal(!viewModal);
              setIsLoading(false);
            }}
          />
        ) : null}
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
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
            placeholder="Record Video"
            onPress={() => {
              ImagePicker.openCamera({
                mediaType: 'video',
              }).then(image => {
                onSelecet(image);
              });
              // let options = {
              //   mediaType: 'video',
              //   maxWidth: 300,
              //   maxHeight: 550,
              //   quality: 0.7,
              //   videoQuality: 'low',
              //   durationLimit: 15, //Video max duration in seconds
              //   // saveToPhotos: true,
              // };
              // launchCamera(options, image => {
              //   console.log('image', image);
              //   if (image.didCancel) {
              //     console.log('User cancelled image picker');
              //   } else {
              //     onSelecet(image);
              //   }
              // });
            }}
          />
          <BtnComponent
            placeholder="Upload Media"
            onPress={() => {
              ImagePicker.openPicker({
                mediaType: 'mixed',
              }).then(image => {
                onSelecet(image);
              });
              // launchImageLibrary(
              //   {mediaType: 'video', durationLimit: 15},
              //   image => {
              //     console.log('hamza friday', image);
              //     if (image.didCancel) {
              //       console.log('User cancelled image picker');
              //     } else {
              //       onSelecet(image);
              //     }
              //   },
              // );
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

// <Image
//   source={{uri: URL.concat(item.media)}}
//   style={{
//     width: '100%',
//     aspectRatio: 1,
//     marginRight: 0.9,
//     backgroundColor: GREY,
//   }}
// />
