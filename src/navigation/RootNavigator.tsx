import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import MainNavigator from './MainNavigator';

import { useAppSelector } from '../hooks/reduxHooks';
import { selectIsAuthenticated } from '@/store/selectors/authSelectors';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
