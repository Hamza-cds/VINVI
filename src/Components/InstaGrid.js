// import React, {useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// var {width} = Dimensions.get('window');
// var {height} = Dimensions.get('window');
// import * as _ from 'lodash';
// import {URL} from '../Constants/Constants';
// import Video from 'react-native-video';
// import {GREY} from '../Constants/Colors';
// import Lottie from 'lottie-react-native';
// import assets from '../..';

// const MyImage = ({style, sourceObj, onPress}) => {
//   const [imageError, setImageError] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const renderMedia = () => {
//     if (sourceObj.media.includes('.mp4')) {
//       return (
//         <View style={{borderWidth: 0.2, borderColor: 'black'}}>
//           <Video
//             source={{uri: URL.concat(sourceObj.media)}}
//             paused={false}
//             muted={true}
//             repeat={true}
//             resizeMode="stretch"
//             style={{
//               ...style,
//             }}
//             onLoad={() => setLoading(false)}
//           />
//         </View>
//       );
//     } else {
//       return (
//         <Image
//           style={style}
//           source={{uri: URL.concat(sourceObj.media)}}
//           onError={() => {
//             setLoading(false);
//             setImageError(true);
//           }}
//           onLoadEnd={() => setLoading(false)}
//         />
//       );
//     }
//   };

//   return (
//     <TouchableOpacity onPress={onPress}>
//       {imageError || !sourceObj.media ? (
//         <Image
//           source={require('../Assets/homebg.png')}
//           style={style}
//           onLoadEnd={() => setLoading(false)}
//         />
//       ) : (
//         renderMedia()
//       )}
//       {loading && (
//         // <ActivityIndicator
//         //   style={styles.activityIndicator}
//         //   animating={loading}
//         // />
//         <View style={styles.activityIndicator}>
//           <Lottie source={require('../../LottieLoader.json')} autoPlay loop />
//         </View>
//       )}
//     </TouchableOpacity>
//   );
// };

// const InstaGrid = ({
//   setViewModal,
//   setObjectPassInModal,
//   objectPassInModal,
//   data,
//   columns,
//   onEndReachedThreshold,
//   onEndReached,
//   loading = false,
//   onItemClick,
// }) => {
//   const groupEveryNthRow = 3;
//   const {mainContainer, groupedGridContainer, gridStyle} = styles;
//   var currentRow = 0;
//   const rowsArray = _.chunk(data, columns);
//   var bigImageSide = 'right';
//   // setColumn((column = columns));

//   const renderGroupedItem = row => {
//     const smallImage1 = row[0];
//     const smallImage2 = row[1];
//     const largeImage = row[2];

//     if (bigImageSide === 'right') {
//       bigImageSide = 'left';
//       return (
//         <View style={{flexDirection: 'row'}}>
//           <View style={groupedGridContainer}>
//             <View style={gridStyle}>
//               <MyImage
//                 style={styles.imageThumbnail}
//                 sourceObj={smallImage1}
//                 onPress={() => {
//                   setViewModal(true);
//                   setObjectPassInModal((objectPassInModal = smallImage1));
//                   // onItemClick(smallImage1);
//                 }}
//               />
//             </View>
//             <View style={gridStyle}>
//               <MyImage
//                 style={styles.imageThumbnail}
//                 sourceObj={smallImage2}
//                 onPress={() => {
//                   setViewModal(true);
//                   setObjectPassInModal((objectPassInModal = smallImage2));
//                   // onItemClick(smallImage2);
//                 }}
//               />
//             </View>
//           </View>
//           <View style={gridStyle}>
//             <MyImage
//               style={styles.imageThumbnailLarge}
//               sourceObj={largeImage}
//               onPress={() => {
//                 setViewModal(true);
//                 setObjectPassInModal((objectPassInModal = largeImage));
//                 // onItemClick(largeImage);
//               }}
//             />
//           </View>
//         </View>
//       );
//     } else {
//       bigImageSide = 'right';
//       return (
//         <View style={{flexDirection: 'row'}}>
//           <View style={gridStyle}>
//             <MyImage
//               style={styles.imageThumbnailLarge}
//               sourceObj={largeImage}
//               onPress={() => {
//                 setViewModal(true);
//                 setObjectPassInModal((objectPassInModal = largeImage));
//               }}
//             />
//           </View>
//           <View style={groupedGridContainer}>
//             <View style={gridStyle}>
//               <MyImage
//                 style={styles.imageThumbnail}
//                 sourceObj={smallImage1}
//                 onPress={() => {
//                   setViewModal(true);
//                   setObjectPassInModal((objectPassInModal = smallImage1));
//                 }}
//               />
//             </View>
//             <View style={gridStyle}>
//               <MyImage
//                 style={styles.imageThumbnail}
//                 sourceObj={smallImage2}
//                 onPress={() => {
//                   setViewModal(true);
//                   setObjectPassInModal((objectPassInModal = smallImage2));
//                 }}
//               />
//             </View>
//           </View>
//         </View>
//       );
//     }
//   };

//   const renderSingleItem = item => {
//     return (
//       <View style={gridStyle}>
//         <MyImage
//           style={styles.imageThumbnail}
//           sourceObj={item}
//           onPress={() => {
//             // onItemClick(item);

//             setViewModal(true);
//             setObjectPassInModal((objectPassInModal = item));
//           }}
//         />
//       </View>
//     );
//   };

//   const renderCell = row => {
//     if (row.length >= columns && currentRow % groupEveryNthRow === 0) {
//       currentRow++;
//       return <View>{renderGroupedItem(row)}</View>;
//     }
//     currentRow++;
//     return (
//       <View style={{flexDirection: 'row'}}>
//         {row.map(item => {
//           return renderSingleItem(item);
//         })}
//       </View>
//     );
//   };

//   const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
//     const paddingToBottom = 20;
//     return (
//       layoutMeasurement.height + contentOffset.y >=
//       contentSize.height - paddingToBottom
//     );
//   };

//   const renderFooter = () => {
//     return (
//       <View style={{marginBottom: 16}}>
//         {/* <ActivityIndicator animating size="large" /> */}

//         <Lottie source={require('../../LottieLoader.json')} autoPlay loop />
//       </View>
//     );
//   };

//   return (
//     <ScrollView
//       scrollEventThrottle={onEndReachedThreshold}
//       onScroll={({nativeEvent}) => {
//         if (isCloseToBottom(nativeEvent)) {
//           onEndReached();
//         }
//       }}>
//       <View style={mainContainer}>
//         {rowsArray.map(row => {
//           return renderCell(row);
//         })}
//       </View>
//       {loading && renderFooter()}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     width: '100%',
//   },
//   groupedGridContainer: {
//     flexDirection: 'column',
//     flexWrap: 'wrap',
//   },
//   imageThumbnail: {
//     // height: 143,
//     // width: width / 3 - 0,
//     height: width / 3,
//     width: width / 3,
//     backgroundColor: GREY,
//   },
//   imageThumbnailLarge: {
//     height: width * 0.6 + 28,
//     width: width * 0.6 + 28,
//     backgroundColor: GREY,
//   },
//   gridStyle: {
//     // margin: 4,
//   },
//   activityIndicator: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//   },
// });

// export default InstaGrid;

import React, {useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {URL} from '../Constants/Constants';
import Video from 'react-native-video';
import {GREY} from '../Constants/Colors';
import Lottie from 'lottie-react-native';
import * as _ from 'lodash';

const {width} = Dimensions.get('window');

const MyImage = ({style, sourceObj, onPress}) => {
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setLoading(false);
    setImageError(true);
  }, []);

  const handleImageLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  const renderMedia = () => {
    if (sourceObj.media.includes('.mp4')) {
      return (
        <View style={{borderWidth: 0.2, borderColor: 'black'}}>
          <Video
            source={{uri: URL.concat(sourceObj.media)}}
            paused={false}
            muted={true}
            repeat={true}
            resizeMode="stretch"
            style={style}
            onLoad={handleImageLoadEnd}
          />
        </View>
      );
    } else {
      return (
        <Image
          style={style}
          source={{uri: URL.concat(sourceObj.media)}}
          onError={handleImageError}
          onLoadEnd={handleImageLoadEnd}
        />
      );
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      {imageError || !sourceObj.media ? (
        <Image
          source={require('../Assets/homebg.png')}
          style={style}
          onLoadEnd={handleImageLoadEnd}
        />
      ) : (
        renderMedia()
      )}
      {loading && (
        <View style={styles.activityIndicator}>
          <Lottie source={require('../../LottieLoader.json')} autoPlay loop />
        </View>
      )}
    </TouchableOpacity>
  );
};

const InstaGrid = ({
  setViewModal,
  setObjectPassInModal,
  objectPassInModal,
  data,
  columns,
  onEndReachedThreshold,
  onEndReached,
  loading = false,
  onItemClick,
}) => {
  const groupEveryNthRow = 3;
  const {mainContainer, groupedGridContainer, gridStyle} = styles;
  let currentRow = 0;
  const rowsArray = _.chunk(data, columns);
  let bigImageSide = 'right';

  const renderGroupedItem = useCallback(row => {
    const [smallImage1, smallImage2, largeImage] = row;

    const handlePress = item => {
      setViewModal(true);
      setObjectPassInModal(item);
    };

    if (bigImageSide === 'right') {
      bigImageSide = 'left';
      return (
        <View style={{flexDirection: 'row'}}>
          <View style={groupedGridContainer}>
            <View style={gridStyle}>
              <MyImage
                style={styles.imageThumbnail}
                sourceObj={smallImage1}
                onPress={() => handlePress(smallImage1)}
              />
            </View>
            <View style={gridStyle}>
              <MyImage
                style={styles.imageThumbnail}
                sourceObj={smallImage2}
                onPress={() => handlePress(smallImage2)}
              />
            </View>
          </View>
          <View style={gridStyle}>
            <MyImage
              style={styles.imageThumbnailLarge}
              sourceObj={largeImage}
              onPress={() => handlePress(largeImage)}
            />
          </View>
        </View>
      );
    } else {
      bigImageSide = 'right';
      return (
        <View style={{flexDirection: 'row'}}>
          <View style={gridStyle}>
            <MyImage
              style={styles.imageThumbnailLarge}
              sourceObj={largeImage}
              onPress={() => handlePress(largeImage)}
            />
          </View>
          <View style={groupedGridContainer}>
            <View style={gridStyle}>
              <MyImage
                style={styles.imageThumbnail}
                sourceObj={smallImage1}
                onPress={() => handlePress(smallImage1)}
              />
            </View>
            <View style={gridStyle}>
              <MyImage
                style={styles.imageThumbnail}
                sourceObj={smallImage2}
                onPress={() => handlePress(smallImage2)}
              />
            </View>
          </View>
        </View>
      );
    }
  }, []);

  const renderSingleItem = useCallback(item => {
    const handlePress = item => {
      setViewModal(true);
      setObjectPassInModal(item);
    };

    return (
      <View style={gridStyle}>
        <MyImage
          style={styles.imageThumbnail}
          sourceObj={item}
          onPress={() => handlePress(item)}
        />
      </View>
    );
  }, []);

  const renderCell = useCallback(
    row => {
      if (row.length >= columns && currentRow % groupEveryNthRow === 0) {
        currentRow++;
        return <View>{renderGroupedItem(row)}</View>;
      }
      currentRow++;
      return (
        <View style={{flexDirection: 'row'}}>
          {row.map(item => {
            return renderSingleItem(item);
          })}
        </View>
      );
    },
    [
      columns,
      currentRow,
      groupEveryNthRow,
      renderGroupedItem,
      renderSingleItem,
    ],
  );

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const handleScroll = ({nativeEvent}) => {
    if (isCloseToBottom(nativeEvent)) {
      onEndReached();
    }
  };

  const renderFooter = () => {
    return (
      <View style={{marginBottom: 16}}>
        <Lottie source={require('../../LottieLoader.json')} autoPlay loop />
      </View>
    );
  };

  return (
    <FlatList
      data={rowsArray}
      keyExtractor={(item, index) => `row_${index}`}
      renderItem={({item}) => renderCell(item)}
      onScroll={handleScroll}
      scrollEventThrottle={onEndReachedThreshold}
      ListFooterComponent={loading ? renderFooter : null}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
  groupedGridContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  imageThumbnail: {
    height: width / 3,
    width: width / 3,
    backgroundColor: GREY,
  },
  imageThumbnailLarge: {
    // height: width * 0.6 + 28,
    // width: width * 0.6 + 28,
    height: width / 1.5,
    width: width / 1.5,
    backgroundColor: GREY,
  },
  gridStyle: {
    // margin: 4,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default InstaGrid;
