import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { FlashcardItem } from './useFlashcard';

interface FlashcardCardProps {
  card: FlashcardItem;
  isFlipped: boolean;
  onFlip: () => void;
  onPlayAudio?: () => void;
  imageUrl?: string;
}

export const FlashcardCard: React.FC<FlashcardCardProps> = ({
  card,
  isFlipped,
  onFlip,
  onPlayAudio,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onFlip} style={{ width: '100%' }}>
      <View
        style={{
          minHeight: 400,
          justifyContent: 'center',
          backgroundColor: '#fff',
          padding: 28,
          borderRadius: 32,
          shadowColor: '#C70F2B',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.18,
          shadowRadius: 32,
          elevation: 12,
          borderWidth: 1.5,
          borderColor: '#F1F5F9',
        }}
      >
        {!isFlipped ? (
          // Front: Word
          <View style={{ alignItems: 'center' }}>
            {/* Image section */}
            {card.imageUrl && (
              <Image
                source={{ uri: card.imageUrl }}
                style={{ width: 220, height: 140, borderRadius: 20, marginBottom: 22 }}
                resizeMode="cover"
              />
            )}
            <Text
              style={{
                marginBottom: 2,
                textAlign: 'center',
                fontSize: 32,
                fontWeight: '800',
                color: '#0F172A',
                letterSpacing: 0.2,
              }}
            >
              {card.word}
            </Text>
            {card.phonetic && (
              <Text
                style={{
                  marginBottom: 18,
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#C70F2B',
                  fontWeight: '600',
                  letterSpacing: 0.1,
                }}
              >
                {card.phonetic}
              </Text>
            )}
            {onPlayAudio && (
              <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 2 }}>
                <TouchableOpacity
                  onPress={onPlayAudio}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#C70F2B',
                    borderRadius: 28,
                    paddingHorizontal: 32,
                    paddingVertical: 14,
                    minWidth: 140,
                    shadowColor: '#C70F2B',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.22,
                    shadowRadius: 12,
                    elevation: 6,
                  }}
                  activeOpacity={0.85}
                >
                  <FontAwesome
                    name="volume-up"
                    size={22}
                    color="#fff"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>Listen</Text>
                </TouchableOpacity>
              </View>
            )}
            <Text style={{ marginTop: 24, fontSize: 14, color: '#94A3B8', textAlign: 'center' }}>
              Tap to see definition
            </Text>
          </View>
        ) : (
          // Back: Vietnamese Meaning & Example (Design style)
          <View style={{ flex: 1 }}>
            {/* Vietnamese Meaning Section */}
            <Text
              style={{
                color: '#64748B',
                fontSize: 12,
                fontWeight: '700',
                textTransform: 'uppercase',
                marginBottom: 4,
                letterSpacing: 0.5,
              }}
            >
              VIETNAMESE MEANING
            </Text>
            <Text style={{ color: '#C70F2B', fontWeight: '700', fontSize: 20, marginBottom: 2 }}>
              {card.translation || 'Mô hình ' + card.word}
            </Text>
            <Text style={{ color: '#334155', fontSize: 16, marginBottom: 18 }}>
              {card.definition}
            </Text>

            {/* Usage Example Section */}
            <Text
              style={{
                color: '#64748B',
                fontSize: 12,
                fontWeight: '700',
                textTransform: 'uppercase',
                marginBottom: 4,
                letterSpacing: 0.5,
              }}
            >
              USAGE EXAMPLE
            </Text>
            {card.example && (
              <View
                style={{
                  backgroundColor: '#F1F5F9',
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: '#334155', fontSize: 16 }}>
                  {/* Highlight từ khóa nếu có */}
                  {card.example.split(card.word).map((part, idx, arr) =>
                    idx < arr.length - 1 ? (
                      <React.Fragment key={idx}>
                        {part}
                        <Text style={{ color: '#C70F2B', fontWeight: '700' }}>{card.word}</Text>
                      </React.Fragment>
                    ) : (
                      part
                    )
                  )}
                </Text>
              </View>
            )}

            <Text style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: '#94A3B8' }}>
              Tap to flip back
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
