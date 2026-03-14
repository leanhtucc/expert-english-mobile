import React, { useEffect } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

import { CustomText as Text } from '@/components/ui/CustomText';
import { useToastStore } from '@/stores/toast.store';

import { IconError, IconSuccess } from './icon';

// Import Zustand store

const { width } = Dimensions.get('window');

export default function Toast() {
  const { visible, type, message, duration, hideToast } = useToastStore(); // Lấy trạng thái từ Zustand store
  const translateY = React.useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (visible) {
      Animated.spring(translateY, {
        toValue: 60,
        useNativeDriver: true,
      }).start();

      timer = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => hideToast());
      }, duration);
    } else {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    // Gom return cleanup function về cuối (chạy cho mọi luồng code)
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [duration, hideToast, translateY, visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        type === 'success' ? styles.success : type === 'error' ? styles.error : styles.warn,
        { transform: [{ translateY }] },
      ]}
    >
      {type === 'success' ? <IconSuccess /> : type === 'error' ? <IconError /> : null}
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 0,
    left: width * 0.05,
    width: width * 0.9,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  success: {
    backgroundColor: '#E6F9F0', // Figma: green background
    borderColor: '#1FC17A', // Figma: green border
    borderWidth: 1.5,
  },
  error: {
    backgroundColor: '#FFF0F0', // Figma: red background
    borderColor: '#FF5A5F', // Figma: red border
    borderWidth: 1.5,
  },
  warn: {
    backgroundColor: '#FFF8E5', // Figma: yellow background
    borderColor: '#FFB800', // Figma: yellow border
    borderWidth: 1.5,
  },
  text: {
    color: '#222',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
});
