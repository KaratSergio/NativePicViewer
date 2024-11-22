import { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, RefreshControl } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchImages } from '../../store/services/feedService';
import { selectFeedState } from '../../store/selectors/feedSelectors';

import FeedCard from '../../components/FeedCard/FeedCard';
import { useTheme } from '../../theme/themeContext';

const FeedScreen = () => {
  const dispatch = useAppDispatch();
  const { images, isLoading, error, page } = useAppSelector(selectFeedState);
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchImages(1));
    setRefreshing(false);
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading) {
      dispatch(fetchImages(page + 1));
    }
  }, [dispatch, isLoading, page]);

  const renderItem = useCallback(({ item }) => <FeedCard item={item} />, []);

  const keyExtractor = useCallback(
    (item: { id: string }) => item.id.toString(),
    []
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }),
    []
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 5,
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
      }}
    >
      {isLoading && !refreshing && (
        <Text style={{ color: theme === 'light' ? '#333' : '#ccc' }}>
          Loading...
        </Text>
      )}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

export default FeedScreen;
