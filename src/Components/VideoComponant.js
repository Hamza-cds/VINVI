// import React, {useState, useRef} from 'react';
// import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import Video from 'react-native-video';
// import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

// export default function VideoComponant({media}) {
//   console.log('osman', osman);

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

//   const onError = () => alert('Oh! ');

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
//     <View style={{height: 100, width: '100%'}}>
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
//           uri: media,
//         }}
//         style={styles.mediaPlayer}
//         volume={50}
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
//     height: 100,
//     width: '100%',
//   },
//   toolbar: {
//     marginTop: 30,
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 5,
//   },
//   mediaPlayer: {
//     position: 'absolute',
//     top: 50,
//     left: 0,
//     bottom: 0,
//     right: 50,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import {useState} from 'react';
import {Modal} from 'react-native-paper';
import {VLCPlayer, VlCPlayerView} from 'react-native-vlc-media-player';
// import Orientation from 'react-native-orientation';

export default function VideoComponant({viewModal, media}) {
  return (
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
          // style={[styles.video]}
          videoAspectRatio="16:9"
          source={{uri: media}}
        />
      </View>
    </Modal>
  );
}
