import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
var {width} = Dimensions.get('window');
var {height} = Dimensions.get('window');
import * as _ from 'lodash';
import {URL} from '../Constants/Constants';
import Video from 'react-native-video';
import {GREY} from '../Constants/Colors';

const MyImage = ({style, sourceObj, onPress}) => {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  const renderMedia = () => {
    if (sourceObj.media.includes('.mp4')) {
      console.log('ye ja ra ha data us k pas ____________', sourceObj.media);
      return (
        <Video
          source={{uri: URL.concat(sourceObj.media)}}
          paused={false}
          muted={true}
          repeat={true}
          resizeMode="stretch"
          style={{
            ...style,
          }}
          onLoad={() => setLoading(false)}
        />
      );
    } else {
      return (
        <Image
          style={style}
          source={{uri: URL.concat(sourceObj.media)}}
          onError={() => {
            setLoading(false);
            setImageError(true);
          }}
          onLoadEnd={() => setLoading(false)}
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
          onLoadEnd={() => setLoading(false)}
        />
      ) : (
        renderMedia()
      )}
      {loading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          animating={loading}
        />
      )}
    </TouchableOpacity>
  );
};

const InstaGrid = ({
  data,
  columns,
  onEndReachedThreshold,
  onEndReached,
  loading = false,
  onItemClick,
}) => {
  const groupEveryNthRow = 3;
  const {mainContainer, groupedGridContainer, gridStyle} = styles;
  var currentRow = 0;
  const rowsArray = _.chunk(data, columns);
  var bigImageSide = 'right';

  const renderGroupedItem = row => {
    const smallImage1 = row[0];
    const smallImage2 = row[1];
    const largeImage = row[2];

    if (bigImageSide === 'right') {
      bigImageSide = 'left';
      return (
        <View style={{flexDirection: 'row'}}>
          <View style={groupedGridContainer}>
            <View style={gridStyle}>
              <MyImage
                style={styles.imageThumbnail}
                sourceObj={smallImage1}
                onPress={() => {
                  onItemClick(smallImage1);
                }}
              />
            </View>
            <View style={gridStyle}>
              <MyImage
                style={styles.imageThumbnail}
                sourceObj={smallImage2}
                onPress={() => {
                  onItemClick(smallImage2);
                }}
              />
            </View>
          </View>
          <View style={gridStyle}>
            <MyImage
              style={styles.imageThumbnailLarge}
              sourceObj={largeImage}
              onPress={() => {
                onItemClick(largeImage);
              }}
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
              onPress={() => {
                onItemClick(largeImage);
              }}
            />
          </View>
          <View style={groupedGridContainer}>
            <View style={gridStyle}>
              <MyImage
                style={styles.imageThumbnail}
                sourceObj={smallImage1}
                onPress={() => {
                  onItemClick(smallImage1);
                }}
              />
            </View>
            <View style={gridStyle}>
              <MyImage
                style={styles.imageThumbnail}
                sourceObj={smallImage2}
                onPress={() => {
                  onItemClick(smallImage2);
                }}
              />
            </View>
          </View>
        </View>
      );
    }
  };

  const renderSingleItem = item => {
    return (
      <View style={gridStyle}>
        <MyImage
          style={styles.imageThumbnail}
          sourceObj={item}
          onPress={() => {
            onItemClick(item);
          }}
        />
      </View>
    );
  };

  const renderCell = row => {
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
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const renderFooter = () => {
    return (
      <View style={{marginBottom: 16}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  return (
    <ScrollView
      scrollEventThrottle={onEndReachedThreshold}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          onEndReached();
        }
      }}>
      <View style={mainContainer}>
        {rowsArray.map(row => {
          return renderCell(row);
        })}
      </View>
      {loading && renderFooter()}
    </ScrollView>
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
    height: 140,
    width: width / 3 - 12,
    backgroundColor: GREY,
    // height: width / 3 - 12,
    // width: width / 3 - 12,
    // alignSelf: 'flex-start',
    // justifyContent: 'flex-start',
  },
  imageThumbnailLarge: {
    height: width * 0.6 + 40,
    width: width * 0.6 + 5,
    backgroundColor: GREY,
    // marginLeft: 4,
    // resizeMode: 'stretch',
    // alignSelf: 'flex-start',
    // justifyContent: 'flex-start',
  },
  gridStyle: {
    margin: 4,
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
