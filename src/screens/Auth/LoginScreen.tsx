import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Alert, ViewStyle } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { login } from '../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { selectIsAuthenticated } from '@/store/selectors/authSelectors';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../navigation/types';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../schemas/validationSchema';
import InputField from '../../components/InputField/InputField';

import { useTheme } from '../../theme/themeContext';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const [emailFromStorage, setEmailFromStorage] = useState<string | null>(null);
  const { theme } = useTheme();
  
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const email = await AsyncStorage.getItem('email');
        if (token && email) {
          dispatch(login({ token, email }));
          setEmailFromStorage(email);
        }
      } catch (error) {
        console.error(
          'Error retrieving token or email from AsyncStorage:',
          error
        );
      }
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  }, [isAuthenticated, navigation]);

  const onSubmit = async (data: any) => {
    try {
      const token = 'tesT_Token';
      const email = data.email;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('email', email);
      dispatch(login({ token, email }));
      setEmailFromStorage(email);
    } catch (error) {
      Alert.alert('Login failed', 'There was an error during login');
    }
  };

  const dynamicStyles: {
    containerStyle: ViewStyle;
    buttonStyle: ViewStyle;
    placeholderTextColor: string;
  } = {
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      padding: 5,
      backgroundColor:
        theme === 'light' ? 'rgb(218, 223, 218)' : 'rgb(31, 42, 31)',
    },
    buttonStyle: {
      paddingVertical: 6,
      borderRadius: 8,
      marginTop: 16,
      backgroundColor: theme === 'light' ? 'bg-light-button' : 'bg-dark-button',
    },
    placeholderTextColor:
      theme === 'light' ? 'rgb(136, 136, 136)' : 'rgb(187, 187, 187)',
  };

  return (
    <View style={dynamicStyles.containerStyle}>
      <InputField
        label=""
        name="email"
        control={control}
        error={errors.email?.message}
        keyboardType="email-address"
        defaultValue={emailFromStorage || ''}
        placeholder="Email"
        inputStyle={{
          borderWidth: errors.email ? 1 : 0,
          borderColor: errors.email ? 'red' : 'transparent',
        }}
      />
      <InputField
        label=""
        name="password"
        control={control}
        error={errors.password?.message}
        secureTextEntry
        placeholder="Password"
        inputStyle={{
          borderWidth: errors.password ? 1 : 0,
          borderColor: errors.password ? 'red' : 'transparent',
        }}
      />
      <TouchableOpacity
        style={dynamicStyles.buttonStyle}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        <Text className="text-white text-2xl font-semibold uppercase tracking-[0.2em] text-center">
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
