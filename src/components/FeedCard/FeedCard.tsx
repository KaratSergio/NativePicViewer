import React from 'react';
import { View, Text, Image } from 'react-native';
import { FeedCardProps } from './types';

const FeedCard = React.memo(({ item }: FeedCardProps) => (
  <View className="mb-4 flex relative bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <Text
      className="text-gray-800 z-10 rounded-md ml-2 px-1 absolute bottom-0 left-0 dark:text-gray-200 mb-2"
      style={{ backgroundColor: 'rgba(229, 231, 235, 0.55)' }}
    >
      {item.author}
    </Text>
    <Image
      source={{ uri: item.download_url }}
      className="w-full h-48 rounded-lg"
      resizeMode="cover"
    />
  </View>
));

export default FeedCard;
