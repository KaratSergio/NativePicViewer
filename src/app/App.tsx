import * as React from 'react';
import store, { persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import '../../assets/global.css';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../navigation/RootNavigator';
import { ThemeProvider } from '../theme/themeContext';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
