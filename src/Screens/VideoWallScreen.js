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
import Video from 'react-native-video';

export default function VideoWallScreen({navigation, route}) {
  const [numOfColoums, setNumOfColoums] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  let [data, setData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  let [image, setImage] = useState('');
  console.log('image', image);
  let page = 1;
  let limit = 10;

  useEffect(() => {
    GetVideoWallData();
  }, []);

  const GetVideoWallData = () => {
    setIsLoading(true);
    GetDataVideoWallApi(page, limit)
      .then(res => {
        console.log('stories res', res);
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

  //   const imageView = image => {
  //     <Modal
  //       animationType="slide"
  //       transparent={true}
  //       visible={modalVisible}
  //       onRequestClose={() => {
  //         Alert.alert('Modal has been closed.');
  //         setModalVisible(!modalVisible);
  //       }}></Modal>;
  //   };

  return (
    <>
      <View style={{flex: 1, backgroundColor: WHITE}}>
        <Header
          navigation={navigation}
          variant="light"
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
                    setModalVisible(true);
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
    </>
  );
}
