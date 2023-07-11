/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

import firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyA-qpVW9fF0ho7GBXpDW_Qu4brW8M51LpU',
  // authDomain: 'aida-dev-chat.firebaseapp.com',
  // databaseURL: 'https://aida-dev-chat-default-rtdb.firebaseio.com',
  projectId: 'vinvi-f7578',
  // storageBucket: 'aida-dev-chat.appspot.com',
  messagingSenderId: '118416595994',
  appId: '1:118416595994:android:3628a5d072a361d26685a3',
  // measurementId: 'G-0T59ECX61E',
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const Firebase = app;

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
    if (token.os == 'android') AsyncStorage.setItem('fcmToken', token.token);
  },
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    // process the notification
    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
    // console.log("notification index file", notification);
    if (Platform.OS == 'ios')
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    // else
    //   LocalNotification(notification);
  },
  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    // console.log("ACTION:", notification.action);
    // console.log("NOTIFICATION:", notification);
    // process the action
  },
  senderID: '118416595994',
  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,
  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const assets = {
  lottieFiles: {
    lazyLoading: require('./LottieLoader.json'),
  },
};
export default assets;
