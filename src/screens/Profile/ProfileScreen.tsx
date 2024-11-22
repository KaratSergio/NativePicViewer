import { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logout } from '../../store/slices/authSlice';
import { fetchUserProfile } from '../../store/services/userService';
import { selectUserState } from '../../store/selectors/userSelectors';
import { selectEmail } from '@/store/selectors/authSelectors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../theme/themeContext';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { profile, isLoading, error } = useAppSelector(selectUserState);
  const email = useAppSelector(selectEmail);

  const { theme, toggleTheme } = useTheme();

  const colors = {
    light: {
      background: 'bg-light-background',
      button: 'bg-light-button',
      text: 'text-light-text',
      textCyan: 'text-cyan-200',
    },
    dark: {
      background: 'bg-dark-background',
      button: 'bg-dark-button',
      text: 'text-dark-text',
      textCyan: 'text-cyan-200',
    },
  };

  const currentColors = theme === 'light' ? colors.light : colors.dark;

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(logout());
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View
      className={`flex-1 justify-center items-center p-5 ${currentColors.background}`}
    >
      {profile && (
        <View className="flex flex-1 m-5">
          <View
            className={`flex flex-row py-2 px-4 items-center gap-5 rounded-md ${currentColors.button}`}
          >
            <Image
              source={{ uri: profile.avatar }}
              className="w-20 h-20 rounded-full"
            />
            <View className="flex">
              <View className="flex flex-row gap-2">
                <Text className={`${currentColors.text}`}>name:</Text>
                <View className="flex flex-row gap-2">
                  <Text className={`text-base ${currentColors.textCyan}`}>
                    {profile.first_name}
                  </Text>
                  <Text className={`text-base ${currentColors.textCyan}`}>
                    {profile.last_name}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row gap-2">
                <Text className={`${currentColors.text}`}>email:</Text>
                <Text className={`text-base ${currentColors.textCyan}`}>
                  {email}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity
        className={`${currentColors.button} p-1 rounded-lg mb-4`}
        onPress={handleLogout}
      >
        <Text className="text-white text-lg text-center w-64">Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`${currentColors.button} p-1 rounded-lg`}
        onPress={toggleTheme}
      >
        <Text className="text-white text-lg text-center w-64">
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
