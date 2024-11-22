import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedScreen from '../screens/Feed/FeedScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { useTheme } from '../theme/themeContext';

const Tab = createMaterialTopTabNavigator();

const MainNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: 16,
          backgroundColor: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
          borderWidth: 0,
          elevation: 0,
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme === 'light' ? 'darkgreen' : 'orange',
          height: 3,
        },
        tabBarLabelStyle: {
          textDecorationLine: 'none',
        },
        tabBarActiveTintColor: theme === 'light' ? 'darkgreen' : 'orange',
        tabBarInactiveTintColor: theme === 'light' ? 'gray' : '#ccc',
      }}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
