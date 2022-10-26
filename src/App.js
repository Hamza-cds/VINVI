import 'react-native-gesture-handler';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './Navigation/StackNavigation';
// import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from '../Store/store';

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
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
