import * as React from 'react';
import store from '../store/store';
import { Provider } from 'react-redux';
import '../../assets/global.css';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../navigation/RootNavigator';
import { ThemeProvider } from '../theme/themeContext';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
