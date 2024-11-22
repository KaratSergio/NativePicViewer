import { View, Text, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import { InputFieldProps } from './types';
import { useTheme } from '../../theme/themeContext';

const InputField = ({
  label,
  name,
  control,
  error,
  inputStyle,
  ...props
}: InputFieldProps) => {
  const { theme } = useTheme();

  const dynamicStyles = {
    color: theme === 'light' ? 'rgb(51, 51, 51)' : 'rgb(255, 255, 255)',
    backgroundColor:
      theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(31, 42, 31)',
    placeholderTextColor:
      theme === 'light' ? 'rgb(136, 136, 136)' : 'rgb(187, 187, 187)',
  };

  return (
    <View className="mb-3 mx-8">
      <Text>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            {...props}
            className="h-10 p-2 rounded-md"
            onChangeText={onChange}
            value={value}
            style={[dynamicStyles, inputStyle]}
            placeholderTextColor={dynamicStyles.placeholderTextColor}
          />
        )}
      />
      {error && <Text className="text-red-500 text-xs">{error}</Text>}
    </View>
  );
};

export default InputField;
