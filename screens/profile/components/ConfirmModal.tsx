import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  visible: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const { height } = Dimensions.get('window');

export const ConfirmModal = ({ visible, icon, title, description, onCancel, onConfirm }: Props) => {
  const insets = useSafeAreaInsets();

  const [showModal, setShowModal] = useState(visible);
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setShowModal(false));
    }
  }, [visible, slideAnim]);

  return (
    <Modal visible={showModal} transparent animationType="none" onRequestClose={onCancel}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View className="flex-1 justify-end bg-black/50">
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View
              className="w-full rounded-t-3xl bg-white px-5 pt-8 shadow-xl"
              style={{
                paddingBottom: insets.bottom + 20,
                transform: [{ translateY: slideAnim }],
              }}
            >
              {/* Icon Container */}
              <View className="mb-5 h-16 w-16 items-center justify-center rounded-[10px] bg-[#FFEBE9]">
                {icon}
              </View>

              {/* Title & Message */}
              <Text className="mb-3 text-[22px] font-bold text-[#111827]">{title}</Text>
              <Text className="mb-8 text-[15px] leading-[22px] text-[#6B7280]">{description}</Text>

              {/* Buttons */}
              <View className="w-full flex-row justify-between gap-3">
                <TouchableOpacity
                  className="flex-1 items-center justify-center rounded-lg border border-gray-400 bg-white py-3.5"
                  onPress={onCancel}
                  activeOpacity={0.7}
                >
                  <Text className="text-[16px] font-bold text-black">Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 items-center justify-center rounded-lg border border-red-200 bg-red-500 py-3.5"
                  onPress={onConfirm}
                  activeOpacity={0.7}
                >
                  <Text className="text-[16px] font-bold text-white">Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
