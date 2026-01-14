import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';

import { useLessonsStore } from '@/stores';

/**
 * Example Component sử dụng Zustand Store
 */
export default function LessonsListExample() {
  const { data, isLoading, error, fetchLessons } = useLessonsStore();

  useEffect(() => {
    // Fetch lessons khi component mount
    fetchLessons();
  }, [fetchLessons]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-4 text-lg text-red-500">{error}</Text>
        <TouchableOpacity className="rounded-lg bg-blue-500 px-6 py-3" onPress={fetchLessons}>
          <Text className="font-semibold text-white">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={data || []}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="border-b border-gray-200 p-4">
            <Text className="text-lg font-bold">{item.title}</Text>
            <Text className="mt-1 text-gray-600">{item.description}</Text>
            <View className="mt-2 flex-row">
              <Text className="text-sm text-blue-500">{item.level}</Text>
              <Text className="ml-4 text-sm text-gray-500">{item.duration} min</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-8">
            <Text className="text-gray-500">No lessons found</Text>
          </View>
        }
      />
    </View>
  );
}
