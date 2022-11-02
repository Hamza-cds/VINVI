import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {Text, TextInput, Image, View} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './Navigation/StackNavigation';
// import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from '../Store/store';
import messaging from '@react-native-firebase/messaging';
import NotificationPopup from './Components/NotificationPopup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
const App = props => {
  const popupRef = useRef(null);

  useEffect(() => {
    checkPermission();
    createNotificationListeners();
    if (Text.defaultProps) {
      Text.defaultProps.allowFontScaling = false;
    } else {
      Text.defaultProps = {};
      Text.defaultProps.allowFontScaling = false;
    }

    // Override Text scaling in input fields
    if (TextInput.defaultProps) {
      TextInput.defaultProps.allowFontScaling = false;
    } else {
      TextInput.defaultProps = {};
      TextInput.defaultProps.allowFontScaling = false;
    }
  }, []);

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getFirebaseToken();
    } else {
      requestPermission();
    }
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      // User has authorised
      getFirebaseToken();
    } catch (error) {
      // User has rejected permissions
    }
  };

  const getFirebaseToken = async () => {
    const fcmToken = await messaging().getToken();
    AsyncStorage.setItem('fcmToken', fcmToken);
    console.log('fcmToken', fcmToken);
    if (fcmToken) {
      // user has a device token
      messaging()
        .registerDeviceForRemoteMessages()
        .then(() => {
          messaging()
            .getAPNSToken()
            .then(token => {
              console.log('apns token', token);
            });
        });
    }
  };

  const createNotificationListeners = async () => {
    messaging().onMessage(async remoteMessage => {
      // store.dispatch(updateNotification(remoteMessage));
      console.log('remoteMessageeeee', remoteMessage.notification);
      let object = {
        appIconSource: require('./Assets/vinvilogo.png'),
        appTitle: 'vinvi',
        timeText: moment(new Date()).format('h:mm a'),
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        slideOutTime: 5000,
      };
      console.log('object', object);
      popupRef.current?.show(object);
    });

    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('Message handled in the background!', remoteMessage);
    // });

    messaging().onNotificationOpenedApp(notificationOpen => {
      console.log('notificationOpen', notificationOpen);
    });

    // If your app is in Foreground
    // firebase.notifications().onNotification((notification) => {
    //   console.log("notification app file", notification);
    //   const localNotification = new firebase.notifications.Notification({
    //     show_in_foreground: true,
    //   }).setNotificationId(notification.notificationId).setTitle(notification.title).setBody(notification.body)
    //   firebase.notifications().displayNotification(localNotification).catch(err => console.error(err));
    // });

    // //If your app is in background
    // firebase.notifications().onNotificationOpened((notificationOpen) => {
    //   const { title, body } = notificationOpen.notification;
    //   // Alert.alert(title, body)
    // });

    // // If your app is closed
    // const notificationOpen = await firebase.notifications().getInitialNotification();
    // if (notificationOpen) {
    //   // console.log('getInitialNotification:');
    // }

    // //For data only payload in foreground
    // firebase.messaging().onMessage(async remoteMessage => {
    //   console.log("remoteMessage", remoteMessage)
    //   //process data message
    // });
  };

  const renderCustomPopup = ({
    appIconSource,
    appTitle,
    timeText,
    title,
    body,
  }) => {
    console.log('title', title);
    return (
      <View style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={appIconSource}
            style={{width: 50, height: 50, borderRadius: 100}}
          />
          <View style={{marginStart: 10, flex: 1}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{title}</Text>
            <Text
              numberOfLines={2}
              style={{fontSize: 13, fontWeight: 'normal'}}>
              {body}
            </Text>
            <Text
              style={{fontSize: 11, fontWeight: 'normal', textAlign: 'right'}}>
              {timeText}
            </Text>
          </View>
        </View>
        {/* <Button title='My button' onPress={() => console.log('Popup button onPress!')} /> */}
      </View>
    );
  };

  return (
    <>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
      <NotificationPopup
        ref={popupRef}
        renderPopupContent={renderCustomPopup}
        shouldChildHandleResponderStart={true}
        shouldChildHandleResponderMove={true}
      />
    </>
  );
};

export default App;
