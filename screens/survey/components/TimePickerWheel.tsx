import React, { useCallback, useRef } from 'react';
import { FlatList, Text, View } from 'react-native';

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 3;
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

interface TimePickerWheelProps {
  values: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const TimePickerWheel: React.FC<TimePickerWheelProps> = ({
  values,
  selectedIndex,
  onSelect,
}) => {
  const listRef = useRef<FlatList>(null);
  // Pad with empty strings so the first/last real item can center in the wheel
  const paddedData = ['', ...values, ''];

  const handleScrollEnd = useCallback(
    (e: any) => {
      const offset = e.nativeEvent.contentOffset.y;
      const rawIndex = Math.round(offset / ITEM_HEIGHT);
      onSelect(Math.min(Math.max(rawIndex, 0), values.length - 1));
    },
    [onSelect, values.length]
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }),
    []
  );

  return (
    <View style={{ height: CONTAINER_HEIGHT, overflow: 'hidden', width: 64 }}>
      {/* Highlight band for selected item */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: ITEM_HEIGHT,
          left: 0,
          right: 0,
          height: ITEM_HEIGHT,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#e5e7eb',
        }}
      />
      <FlatList
        ref={listRef}
        data={paddedData}
        keyExtractor={(_, i) => String(i)}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        initialScrollIndex={selectedIndex}
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({ item, index }) => {
          const actualIndex = index - 1;
          const isSelected = actualIndex === selectedIndex;
          return (
            <View style={{ height: ITEM_HEIGHT, alignItems: 'center', justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: isSelected ? 20 : 15,
                  fontWeight: isSelected ? '700' : '400',
                  color: isSelected ? '#C8102E' : '#9ca3af',
                }}
              >
                {item}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};
