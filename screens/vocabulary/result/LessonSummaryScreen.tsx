import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export interface LessonSummaryData {
  totalWords: number;
  accuracy: number;
  timeSpent: string;
  masteredWords?: number;
  streak?: number;
  weakWords?: number;
}

interface LessonSummaryScreenProps {
  data: LessonSummaryData;
  onRestart?: () => void;
  onReviewWeak?: () => void;
  onClose?: () => void;
}

export const LessonSummaryScreen: React.FC<LessonSummaryScreenProps> = ({
  data,
  onRestart,
  onReviewWeak,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff' }}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingTop: 44,
          paddingBottom: insets.bottom,
        }}
      >
        {/* Header */}
        <View
          style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}
        >
          <TouchableOpacity onPress={onClose} style={{ padding: 8 }}>
            <MaterialIcons name="close" size={28} color="#222" />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center', marginRight: 30 }}>
            <Text style={{ fontWeight: '600', fontSize: 16, color: '#222' }}>Session Summary</Text>
          </View>
        </View>

        {/* Mascot/Character */}
        <View style={{ marginBottom: 24 }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 24,
              backgroundColor: '#F3F6FB',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Replace with image if needed */}
            <Text style={{ fontSize: 64 }}>😊</Text>
          </View>
        </View>

        {/* Title */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: '#222',
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          Great job finishing the flashcards!
        </Text>
        {/* Subtitle */}
        <Text style={{ fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 24 }}>
          Time to review and lock these words into your memory.
        </Text>

        {/* Stats Row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 32,
          }}
        >
          {/* Words */}
          <View style={{ alignItems: 'center', flex: 1 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: '#F3F6FB',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 24, color: '#E11D48' }}>🎓</Text>
            </View>
            <Text style={{ fontWeight: '700', fontSize: 18, color: '#222' }}>
              {data.totalWords}
            </Text>
            <Text style={{ fontSize: 13, color: '#6B7280' }}>Words</Text>
          </View>
          {/* Accuracy */}
          <View style={{ alignItems: 'center', flex: 1 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: '#F3F6FB',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 24, color: '#E11D48' }}>⭐</Text>
            </View>
            <Text style={{ fontWeight: '700', fontSize: 18, color: '#222' }}>{data.accuracy}%</Text>
            <Text style={{ fontSize: 13, color: '#6B7280' }}>Accuracy</Text>
          </View>
          {/* Time */}
          <View style={{ alignItems: 'center', flex: 1 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: '#F3F6FB',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 24, color: '#E11D48' }}>⏱️</Text>
            </View>
            <Text style={{ fontWeight: '700', fontSize: 18, color: '#222' }}>{data.timeSpent}</Text>
            <Text style={{ fontSize: 13, color: '#6B7280' }}>Time</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={{ width: '100%' }}>
          {/* Restart Button */}
          <Pressable
            onPress={onRestart}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F3F6FB',
              borderRadius: 16,
              paddingVertical: 18,
              paddingHorizontal: 18,
              marginBottom: 16,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
                borderWidth: 1,
                borderColor: '#E5E7EB',
              }}
            >
              <Text style={{ fontSize: 20, color: '#E11D48' }}>↻</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', fontSize: 16, color: '#222' }}>
                Restart Flashcards
              </Text>
              <Text style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
                Go through the full deck again
              </Text>
            </View>
          </Pressable>

          {/* Review Weak Words Button */}
          <Pressable
            onPress={onReviewWeak}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#E11D48',
              borderRadius: 16,
              paddingVertical: 18,
              paddingHorizontal: 18,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Text style={{ fontSize: 20, color: '#E11D48' }}>📝</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', fontSize: 16, color: '#fff' }}>
                Review Weak Words
              </Text>
              <Text style={{ fontSize: 13, color: '#fff', marginTop: 2 }}>
                Focus on the {data.weakWords ?? 3} unknown words
              </Text>
            </View>
            <Text style={{ fontSize: 22, color: '#fff', marginLeft: 8 }}>{'>'}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
