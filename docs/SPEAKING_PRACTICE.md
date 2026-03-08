# AI Voice Speaking Practice Flow

Complete implementation of a production-grade AI voice conversation feature for language learning.

## 📁 File Structure

```
screens/speakingSession/
├── PracticeSetupScreen.tsx         # Initial setup screen with mode selector
├── SpeakingConversationScreen.tsx  # Main chat conversation screen
├── AIFeedbackScreen.tsx            # Feedback and scoring screen
└── index.tsx                       # Exports

components/speaking/
├── ScoreBadge.tsx                  # Score display (pronunciation/grammar)
├── ProgressBar.tsx                 # Animated progress indicator
├── HelpfulPhraseCard.tsx           # Suggested phrase card
├── AIInsightCard.tsx               # AI feedback insights
├── HighlightedTextDisplay.tsx      # Text with correct/incorrect highlights
├── ModeSelector.tsx                # Practice mode segmented control
├── ScenarioCard.tsx                # Scenario preview card
├── ChatBubbleAI.tsx                # AI message bubble
├── ChatBubbleUser.tsx              # User message bubble
├── ChatThread.tsx                  # Scrollable chat container
├── TypingIndicator.tsx             # Animated typing dots
├── VoiceRecorderOverlay.tsx        # Voice recording modal
├── WaveformAnimation.tsx           # Audio waveform visualization
└── index.ts                        # Exports

hooks/
├── useVoiceRecorder.ts             # Voice recording logic with Expo AV
└── useSpeakingPractice.ts          # Speaking session state management

types/
└── speaking.types.ts               # TypeScript interfaces
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install expo-av react-native-reanimated
# or
yarn add expo-av react-native-reanimated
```

### 2. Navigate to Practice Setup

```tsx
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

// Launch speaking practice
navigation.navigate('PracticeSetup');
```

## 📱 User Flow

```
PracticeSetupScreen
    ↓
  Select Mode (Dual Explorer / English Master / Translation Hero)
    ↓
  Start Speaking
    ↓
SpeakingConversationScreen
    ↓
  Tap Microphone → VoiceRecorderOverlay
    ↓
  Record Speech (3-5 seconds)
    ↓
  Speech-to-Text → User Message
    ↓
  AI Response (streaming simulation)
    ↓
  View Feedback → AIFeedbackScreen
    ↓
  Retry or Continue to Next Question
```

## 🎨 Features

### ✅ Animated Components

- **Waveform Animation**: Real-time audio visualization
- **Chat Bubbles**: Fade-in with spring animations
- **Typing Indicator**: Pulsing dots
- **Progress Bar**: Smooth width transitions
- **Microphone Button**: Pulse effect during recording

### ✅ Voice Recording

- Expo AV integration
- Auto-stop after 5 seconds
- Speech-to-text simulation
- Processing state management

### ✅ Practice Modes

1. **Dual Explorer**: Practice both languages with translations
2. **English Master**: Focus on English fluency
3. **Translation Hero**: Master translation skills

### ✅ AI Feedback

- Pronunciation score (0-100%)
- Grammar score (0-100%)
- Highlighted text (green = correct, red = incorrect)
- Helpful phrase suggestions
- AI insights with explanations

## 🛠️ Customization

### Mock Data

Update mock data in:

- `hooks/useSpeakingPractice.ts` - Lesson steps and questions
- `screens/speakingSession/AIFeedbackScreen.tsx` - Feedback data
- `screens/speakingSession/PracticeSetupScreen.tsx` - Scenario preview

### Styling

All components use **NativeWind (Tailwind CSS)**. Customize colors in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#ef4444', // Red accent
      // Add your brand colors
    }
  }
}
```

### API Integration

Replace simulated responses in:

1. **Voice Recording** (`hooks/useVoiceRecorder.ts`):

```tsx
// Replace this simulation
resolve('This is a simulated transcription of your speech.');

// With real API call
const text = await speechToTextAPI(audioUri);
resolve(text);
```

2. **AI Response** (`hooks/useSpeakingPractice.ts`):

```tsx
// Replace timeout simulation
setTimeout(() => {
  addAIMessage(currentStep.question, currentStep.translation, 85);
  setIsTyping(false);
}, 2000);

// With API call
const response = await aiChatAPI(userInput);
addAIMessage(response.text, response.translation, response.score);
setIsTyping(false);
```

3. **Feedback** (`screens/speakingSession/AIFeedbackScreen.tsx`):

```tsx
// Fetch real feedback from API
const feedback = await getFeedbackAPI(userAnswer);
```

## 📦 Component API

### VoiceRecorderOverlay

```tsx
<VoiceRecorderOverlay
  visible={true}
  recordingState="idle" | "recording" | "processing"
  onClose={() => {}}
  onStartRecording={async () => {}}
  onStopRecording={async () => {}}
/>
```

### ChatThread

```tsx
<ChatThread
  messages={[
    {
      id: '1',
      role: 'ai',
      text: 'Hello!',
      translation: 'Xin chào!',
      timestamp: Date.now(),
    },
  ]}
  isTyping={false}
/>
```

### ScoreBadge

```tsx
<ScoreBadge label="Pronunciation" score={92} type="pronunciation" />
```

## 🔧 Configuration

### Navigation Types

The navigation is fully typed in `navigation/index.tsx`:

```tsx
export type RootStackParamList = {
  // ...
  PracticeSetup: undefined;
  SpeakingConversation: {
    mode: 'dual-explorer' | 'english-master' | 'translation-hero';
  };
  AIFeedback: {
    userAnswer: string;
    mode: string;
  };
};
```

### Permissions

Audio recording requires permissions:

**iOS** - Add to `app.json`:

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSMicrophoneUsageDescription": "This app needs access to your microphone for voice practice."
      }
    }
  }
}
```

**Android** - Add to `app.json`:

```json
{
  "expo": {
    "android": {
      "permissions": ["RECORD_AUDIO"]
    }
  }
}
```

## 🧪 Testing

Launch from any screen:

```tsx
import { Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';

function MyScreen() {
  const navigation = useNavigation();

  return (
    <Button title="Start Speaking Practice" onPress={() => navigation.navigate('PracticeSetup')} />
  );
}
```

## 📝 Notes

- All components are under 200 lines
- Clean separation of concerns (components/hooks/screens)
- Fully typed with TypeScript
- Uses React Native Reanimated for smooth animations
- NativeWind for styling
- Ready for production with minor API integration

## 🚨 Known Issues

- `expo-av` must be installed: `npm install expo-av`
- Reanimated shared values in dependency arrays (safe to ignore warnings)
- Mock data needs to be replaced with real API calls

## 📚 Next Steps

1. Install `expo-av` if not already installed
2. Configure audio permissions in `app.json`
3. Replace mock data with API endpoints
4. Customize colors and branding
5. Add analytics tracking
6. Test on physical devices for audio recording

---

**Built with ❤️ using React Native, TypeScript, and NativeWind**
