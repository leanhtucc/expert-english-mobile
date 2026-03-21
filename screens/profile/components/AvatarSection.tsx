import { Image, Text, TouchableOpacity, View } from 'react-native';

import { IconGraduation, IconVerified } from '@/components/icon';

import { AVATAR_SIZE, PRIMARY } from '../constants/profile.constants';

interface Props {
  avatar: string;
  name: string;
  email: string;
  level: string;
  onEdit?: () => void;
}

export const AvatarSection = ({ avatar, name, email, level, onEdit }: Props) => (
  <View className="mb-6 mt-5 items-center">
    <View className="relative">
      <Image
        source={{ uri: avatar }}
        className="rounded-full border-4"
        style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderColor: PRIMARY }}
      />
      <TouchableOpacity
        className="absolute bottom-0 right-0 rounded-full bg-red-600 p-1"
        onPress={onEdit}
        style={{ borderWidth: 3, borderColor: '#FFF' }}
      >
        <IconVerified width={16} height={16} />
      </TouchableOpacity>
    </View>
    <Text className="mt-2 text-xl font-bold">{name}</Text>
    <Text className="text-xs text-gray-500">{email}</Text>
    <View className="mt-2 flex-row items-center justify-center rounded-full bg-red-100 px-4 py-1.5">
      <IconGraduation width={16} height={16} color="#DC2626" />
      <Text className="ml-1.5 text-sm font-bold text-red-600">{level}</Text>
    </View>
  </View>
);
