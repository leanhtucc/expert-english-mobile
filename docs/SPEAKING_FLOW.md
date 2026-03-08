# AI Voice Speaking Practice - Luồng Chi Tiết

## 📋 Tổng Quan

Hệ thống AI Voice Speaking Practice cho phép học viên luyện nói tiếng Anh với AI thông qua giọng nói, nhận phản hồi chi tiết về phát âm và ngữ pháp.

---

## 🔄 Sơ Đồ Luồng Chính

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER STARTS                              │
│                  (Tap "Start Speaking Practice")                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│               SCREEN 1: PracticeSetupScreen                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  • Select Practice Mode (3 options)                       │  │
│  │    - Dual Explorer                                        │  │
│  │    - English Master                                       │  │
│  │    - Translation Hero                                     │  │
│  │                                                            │  │
│  │  • View Scenario Preview                                  │  │
│  │    - Role: PROJECT MANAGER                                │  │
│  │    - Sample question                                      │  │
│  │    - Progress indicator (85%)                             │  │
│  │    - Example answer                                       │  │
│  │                                                            │  │
│  │  • Tap "Start Speaking" Button                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│          SCREEN 2: SpeakingConversationScreen                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Header:                                                   │  │
│  │  • Scenario title: "Security Protocol Scenario"           │  │
│  │  • Progress: "Step 1 of 3"                                │  │
│  │  • Progress bars (visual dots)                            │  │
│  │                                                            │  │
│  │  Chat Thread (Scrollable):                                │  │
│  │  • No messages initially                                  │  │
│  │  • Messages appear after recording                        │  │
│  │                                                            │  │
│  │  Bottom Actions:                                           │  │
│  │  • [View Feedback] button (shows if messages exist)      │  │
│  │  • [🎙️] Microphone button (red, circular)                 │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ User taps Microphone
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  VoiceRecorderOverlay (Modal)                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  STATE 1: IDLE                                            │  │
│  │  • Large microphone button (red)                          │  │
│  │  • Waveform bars (static)                                 │  │
│  │  • Text: "Tap to start speaking"                          │  │
│  │                                                            │  │
│  │  ──────────────── User taps mic ────────────────          │  │
│  │                                                            │  │
│  │  STATE 2: RECORDING (0-5 seconds)                         │  │
│  │  • Microphone turns darker red                            │  │
│  │  • Waveform bars animate (20 bars bouncing)              │  │
│  │  • Pulse circles around mic                               │  │
│  │  • Text: "Recording... Tap to stop"                       │  │
│  │  • Red dot indicator: "● Recording"                       │  │
│  │                                                            │  │
│  │  ──────────── Auto-stop after 5s OR tap ─────────────    │  │
│  │                                                            │  │
│  │  STATE 3: PROCESSING                                      │  │
│  │  • Waveform stops                                         │  │
│  │  • Text: "Processing your speech..."                      │  │
│  │  • Button disabled                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Speech-to-text completes (1.5s)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│          Back to SpeakingConversationScreen                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Modal closes automatically                               │  │
│  │                                                            │  │
│  │  NEW User Message appears:                                │  │
│  │  ┌──────────────────────────────────────────────┐        │  │
│  │  │ [Avatar] "This is a simulated transcription   │        │  │
│  │  │          of your speech."                     │ [U]    │  │
│  │  └──────────────────────────────────────────────┘        │  │
│  │  (Red bubble, right-aligned, fade-in animation)           │  │
│  │                                                            │  │
│  │  ──────────────────────────────────────────────          │  │
│  │                                                            │  │
│  │  Typing Indicator appears:                                │  │
│  │  [AI Avatar] ● ● ● (3 dots pulsing)                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ AI thinks (2 seconds)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│          SpeakingConversationScreen (Updated)                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Typing indicator disappears                              │  │
│  │                                                            │  │
│  │  NEW AI Message appears:                                  │  │
│  │  ┌──────────────────────────────────────────────┐        │  │
│  │  │ [AI] "Could you walk me through the Q3        │        │  │
│  │  │       financial projections for the           │        │  │
│  │  │       manufacturing sector?"                  │        │  │
│  │  │                                                │        │  │
│  │  │       (Vietnamese translation)                │        │  │
│  │  │                                                │        │  │
│  │  │       [Progress bar: 85%]                     │        │  │
│  │  └──────────────────────────────────────────────┘        │  │
│  │  (Gray bubble, left-aligned, fade-in animation)           │  │
│  │                                                            │  │
│  │  Bottom:                                                   │  │
│  │  • [View Feedback] button NOW VISIBLE                     │  │
│  │  • [🎙️] Microphone (can record again)                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ User taps "View Feedback"
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│               SCREEN 3: AIFeedbackScreen                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Header:                                                   │  │
│  │  • [←] Back button                                        │  │
│  │  • Title: "Speaking Practice"                             │  │
│  │                                                            │  │
│  │  ────────────────────────────────────────────────         │  │
│  │                                                            │  │
│  │  Section 1: SCENARIO INFO (Red card)                      │  │
│  │  • "SECURITY PROTOCOL SCENARIO"                           │  │
│  │  • "Step 4 of 5"                                          │  │
│  │                                                            │  │
│  │  ────────────────────────────────────────────────         │  │
│  │                                                            │  │
│  │  Section 2: HELPFUL PHRASE (Pink card with "!" icon)     │  │
│  │  "Try using: 'Yesterday, I went to the store             │  │
│  │   to buy very good.'"                                     │  │
│  │                                                            │  │
│  │  ────────────────────────────────────────────────         │  │
│  │                                                            │  │
│  │  Section 3: YOUR ANSWER (White card)                      │  │
│  │  Highlighted text:                                         │  │
│  │  • GREEN words = correct                                  │  │
│  │  • RED words = incorrect                                  │  │
│  │                                                            │  │
│  │  Example:                                                  │  │
│  │  "Yesterday, I was go to the store and is buy..."        │  │
│  │   └─────┘  └──────┘                  └─┘                  │  │
│  │   GREEN      RED                     RED                  │  │
│  │                                                            │  │
│  │  ────────────────────────────────────────────────         │  │
│  │                                                            │  │
│  │  Section 4: AI INSIGHT (Blue card with "AI" icon)        │  │
│  │  "Great effort! You used the present tense when           │  │
│  │   talking about 'Yesterday'. In English, past events      │  │
│  │   require the Past Simple tense..."                       │  │
│  │                                                            │  │
│  │  ────────────────────────────────────────────────         │  │
│  │                                                            │  │
│  │  Section 5: REAL-TIME FEEDBACK (White card)              │  │
│  │                                                            │  │
│  │       ┌──────────┐         ┌──────────┐                  │  │
│  │       │   92%    │         │   85%    │                  │  │
│  │       │  GREEN   │         │  YELLOW  │                  │  │
│  │       └──────────┘         └──────────┘                  │  │
│  │     Pronunciation          Grammar                        │  │
│  │                                                            │  │
│  │  Score Colors:                                            │  │
│  │  • 85-100%: Green (Excellent)                            │  │
│  │  • 70-84%:  Yellow (Good)                                │  │
│  │  • 0-69%:   Red (Needs improvement)                      │  │
│  │                                                            │  │
│  │  ════════════════════════════════════════════════         │  │
│  │                                                            │  │
│  │  Bottom Actions:                                          │  │
│  │  ┌──────────────┐  ┌──────────────────────┐             │  │
│  │  │    Retry     │  │   Continue →         │             │  │
│  │  │   (Outline)  │  │   (Red, Filled)      │             │  │
│  │  └──────────────┘  └──────────────────────┘             │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
         [Retry Button]            [Continue Button]
                │                         │
                │                         │
                ▼                         ▼
    Go back to                    Go back to
    Conversation Screen           Conversation Screen
    (try recording again)         (next question/step)
                                 (currentStep++)
```

---

## 🔧 Chi Tiết Kỹ Thuật Từng Screen

### **SCREEN 1: PracticeSetupScreen**

**File:** `screens/speakingSession/PracticeSetupScreen.tsx`

**State Management:**

```typescript
const [selectedMode, setSelectedMode] = useState<PracticeMode>('dual-explorer');
```

**Components Used:**

- `ModeSelector` - Segmented control với 3 modes
- `ScenarioCard` - Card hiển thị preview scenario

**Navigation Flow:**

```typescript
handleStartSpeaking() {
  navigation.navigate('SpeakingConversation', { mode: selectedMode });
}
```

**Props Passed to Next Screen:**

- `mode`: PracticeMode ('dual-explorer' | 'english-master' | 'translation-hero')

---

### **SCREEN 2: SpeakingConversationScreen**

**File:** `screens/speakingSession/SpeakingConversationScreen.tsx`

**Hooks Used:**

```typescript
const { session, isTyping, addUserMessage, simulateAIResponse } = useSpeakingPractice(mode);
const { recordingState, startRecording, stopRecording, reset } = useVoiceRecorder();
```

**State Management:**

```typescript
const [showRecorder, setShowRecorder] = useState(false);

// Session state from hook
session = {
  id: string;
  mode: PracticeMode;
  scenario: string;
  currentStep: number;
  totalSteps: number;
  messages: ChatMessage[];
  steps: LessonStep[];
}
```

**User Actions:**

1. **Tap Microphone Button** →

   ```typescript
   handleOpenRecorder() {
     setShowRecorder(true);
   }
   ```

2. **Start Recording** →

   ```typescript
   handleStartRecording() {
     await startRecording(); // Uses Expo AV
     // Auto-stops after 5 seconds
   }
   ```

3. **Stop Recording** →

   ```typescript
   handleStopRecording() {
     const transcription = await stopRecording();
     addUserMessage(transcription);
     setShowRecorder(false);
     simulateAIResponse(transcription);
   }
   ```

4. **View Feedback** →

   ```typescript
   handleViewFeedback() {
     navigation.navigate('AIFeedback', {
       userAnswer: lastMessage.text,
       mode: session.mode
     });
   }
   ```

**Components Used:**

- `ChatThread` - Scrollable messages container
- `VoiceRecorderOverlay` - Modal for recording
- Progress bars in header

---

### **COMPONENT: VoiceRecorderOverlay**

**File:** `screens/speakingSession/components/VoiceRecorderOverlay.tsx`

**Props:**

```typescript
interface VoiceRecorderOverlayProps {
  visible: boolean;
  recordingState: 'idle' | 'recording' | 'processing';
  onClose: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
}
```

**Recording States:**

| State          | UI Changes                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **idle**       | • Static waveform<br>• Red microphone button<br>• Text: "Tap to start speaking"                                                               |
| **recording**  | • Animated waveform (20 bars bouncing)<br>• Darker red button<br>• Pulse circles<br>• Red dot indicator<br>• Text: "Recording... Tap to stop" |
| **processing** | • Static waveform<br>• Button disabled<br>• Text: "Processing your speech..."                                                                 |

**Animations:**

- **Waveform**: 20 bars with `scaleY` animation (React Native Reanimated)
- **Pulse**: 2 circles expanding with opacity fade
- **Microphone**: Scale spring animation on tap

---

### **SCREEN 3: AIFeedbackScreen**

**File:** `screens/speakingSession/AIFeedbackScreen.tsx`

**Data Structure:**

```typescript
const mockFeedback = {
  helpfulPhrase: string;
  highlightedAnswer: HighlightedText[];
  insight: string;
  pronunciationScore: number;  // 0-100
  grammarScore: number;        // 0-100
}

interface HighlightedText {
  text: string;
  isCorrect: boolean;  // true = green, false = red
}
```

**Components Used:**

- `HelpfulPhraseCard` - Pink card với icon "!"
- `HighlightedTextDisplay` - Text với màu xanh/đỏ
- `AIInsightCard` - Blue card với AI explanation
- `ScoreBadge` - Circular score indicators

**User Actions:**

1. **Retry Button** (outline) →

   ```typescript
   handleRetry() {
     navigation.goBack();
     // User can record again
   }
   ```

2. **Continue Button** (red filled) →

   ```typescript
   handleContinue() {
     navigation.goBack();
     // Triggers next question in conversation
   }
   ```

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER ACTION                               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              useVoiceRecorder Hook                           │
│  • startRecording()                                          │
│  • Expo AV creates Audio.Recording                           │
│  • Records for 5 seconds                                     │
│  • stopRecording()                                           │
│  • Simulated speech-to-text                                  │
│  • Returns: Promise<string>                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│            useSpeakingPractice Hook                          │
│  • addUserMessage(text)                                      │
│  • Adds to session.messages[]                                │
│  • Triggers simulateAIResponse()                             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              AI Response Simulation                          │
│  • setIsTyping(true)                                         │
│  • Wait 2 seconds                                            │
│  • addAIMessage(question, translation, score)                │
│  • setIsTyping(false)                                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              ChatThread Re-renders                           │
│  • Shows new messages                                        │
│  • User can view feedback                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Animation Details

### **Chat Bubbles Animation**

**Implementation:** `ChatBubbleAI.tsx`, `ChatBubbleUser.tsx`

```typescript
const opacity = useSharedValue(0);
const translateY = useSharedValue(20);

useEffect(() => {
  opacity.value = withTiming(1, { duration: 300 });
  translateY.value = withSpring(0, {
    damping: 15,
    stiffness: 150,
  });
}, []);
```

**Effect:** Messages fade in from 20px below with spring bounce

---

### **Typing Indicator Animation**

**Implementation:** `TypingIndicator.tsx`

```typescript
// 3 dots with staggered animation
dot1Scale: 1 → 1.3 → 1 (repeat)
dot2Scale: Delay 150ms, then animate
dot3Scale: Delay 300ms, then animate
```

**Effect:** 3 dots pulse sequentially

---

### **Waveform Animation**

**Implementation:** `WaveformAnimation.tsx`

```typescript
// 20 bars, each with random animation
scaleY: 0.3 → 1.0 → 0.3 (repeat)
duration: 300-500ms (random per bar)
```

**Effect:** Audio bars bounce at different heights

---

### **Progress Bar Animation**

**Implementation:** `ProgressBar.tsx`

```typescript
progressWidth.value = withTiming(progress, {
  duration: 800,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
});
```

**Effect:** Smooth width transition over 800ms

---

## 🔄 State Management Architecture

### **Global State (Hooks)**

```
useVoiceRecorder()
├── recordingState: 'idle' | 'recording' | 'processing'
├── recording: Audio.Recording | null
└── Methods:
    ├── startRecording()
    ├── stopRecording()
    └── reset()

useSpeakingPractice(mode)
├── session: SpeakingSession
├── isTyping: boolean
└── Methods:
    ├── addUserMessage()
    ├── addAIMessage()
    ├── simulateAIResponse()
    ├── nextQuestion()
    └── reset()
```

### **Local State (Components)**

```
PracticeSetupScreen
└── selectedMode: PracticeMode

SpeakingConversationScreen
└── showRecorder: boolean

VoiceRecorderOverlay
└── (no local state, controlled by parent)

AIFeedbackScreen
└── (no state, displays static feedback)
```

---

## 🎯 Practice Modes Explained

### **1. Dual Explorer**

- **Mục đích:** Luyện cả 2 ngôn ngữ
- **Tính năng:** Hiển thị bản dịch Vietnamese sau mỗi câu AI
- **Phù hợp cho:** Người mới bắt đầu

### **2. English Master**

- **Mục đích:** Tập trung vào tiếng Anh
- **Tính năng:** Chỉ tiếng Anh, không có bản dịch
- **Phù hợp cho:** Người học trung cấp trở lên

### **3. Translation Hero**

- **Mục đích:** Master kỹ năng dịch
- **Tính năng:** Focus vào việc dịch giữa 2 ngôn ngữ
- **Phù hợp cho:** Người muốn cải thiện khả năng dịch

---

## 📦 Message Data Flow

### **Message Structure**

```typescript
interface ChatMessage {
  id: string; // Unique ID
  role: 'ai' | 'user'; // Who sent it
  text: string; // Main content
  translation?: string; // Vietnamese translation (optional)
  audioUrl?: string; // For future: real audio file
  score?: number; // 0-100, for AI messages
  timestamp: number; // When sent
}
```

### **Message Flow Example**

```
1. User records voice
   ↓
2. Speech-to-text: "I was go to store"
   ↓
3. Create message:
   {
     id: "1710753600000",
     role: "user",
     text: "I was go to store",
     timestamp: 1710753600000
   }
   ↓
4. Add to session.messages[]
   ↓
5. Trigger AI response
   ↓
6. Create AI message:
   {
     id: "1710753602000",
     role: "ai",
     text: "Could you walk me through...",
     translation: "Bạn có thể...",
     score: 85,
     timestamp: 1710753602000
   }
   ↓
7. Add to session.messages[]
   ↓
8. ChatThread re-renders with all messages
```

---

## 🚀 Navigation Flow Tables

### **Navigation Params**

| Screen       | Route Name             | Params                                 |
| ------------ | ---------------------- | -------------------------------------- |
| Setup        | `PracticeSetup`        | `undefined`                            |
| Conversation | `SpeakingConversation` | `{ mode: PracticeMode }`               |
| Feedback     | `AIFeedback`           | `{ userAnswer: string, mode: string }` |

### **Navigation Methods**

| Action             | Code                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| Start Practice     | `navigation.navigate('PracticeSetup')`                                   |
| Begin Conversation | `navigation.navigate('SpeakingConversation', { mode: 'dual-explorer' })` |
| View Feedback      | `navigation.navigate('AIFeedback', { userAnswer: '...', mode: '...' })`  |
| Go Back            | `navigation.goBack()`                                                    |

---

## ⚡ Performance Considerations

### **Optimizations Applied**

1. **useCallback** cho các functions trong hooks
2. **React.memo** có thể add cho các components (chưa có)
3. **Animated.View** thay vì regular View cho animations
4. **FlatList** có thể dùng cho chat thread nếu messages nhiều

### **Potential Issues**

- ❗ Expo AV recording có thể lag trên Android low-end devices
- ❗ Nhiều animated bars (20 bars) có thể ảnh hưởng performance
- ❗ Large chat history cần pagination

---

## 🔮 Future Enhancements

### **API Integration Points**

| Current (Mock)           | Future (Real API)              |
| ------------------------ | ------------------------------ |
| Simulated speech-to-text | Google Speech API / Whisper AI |
| Timeout AI response      | OpenAI GPT-4 / Claude          |
| Mock feedback data       | Real AI analysis backend       |

### **Planned Features**

- [ ] Save conversation history
- [ ] Replay recorded audio
- [ ] Share feedback with teacher
- [ ] Daily streak tracking
- [ ] Achievement system
- [ ] Compare with native speaker
- [ ] Offline mode
- [ ] Multiple AI personas

---

## 📞 Quick Reference

### **To Launch the Flow**

```tsx
// Option 2: Use launcher component
import { SpeakingPracticeLauncher } from '@/screens/speakingSession';

// Option 1: Direct navigation
navigation.navigate('PracticeSetup');

<SpeakingPracticeLauncher />;
```

### **File Locations**

```
screens/speakingSession/
├── components/          ← All reusable components
├── PracticeSetupScreen.tsx
├── SpeakingConversationScreen.tsx
└── AIFeedbackScreen.tsx

hooks/
├── useVoiceRecorder.ts
└── useSpeakingPractice.ts

types/
└── speaking.types.ts
```

### **Key Technologies**

- **React Native**: Mobile framework
- **TypeScript**: Type safety
- **React Navigation**: Screen navigation
- **NativeWind**: Tailwind CSS for RN
- **Expo AV**: Audio recording
- **React Native Reanimated**: Smooth animations

---

## ✅ Testing Checklist

### **Manual Testing Steps**

1. ✅ Navigate to PracticeSetup
2. ✅ Switch between 3 modes
3. ✅ Tap "Start Speaking"
4. ✅ Conversation screen loads
5. ✅ Tap microphone button
6. ✅ Modal opens
7. ✅ Tap to start recording
8. ✅ See waveform animation
9. ✅ Auto-stop after 5s OR tap to stop
10. ✅ Modal closes
11. ✅ User message appears
12. ✅ Typing indicator shows
13. ✅ AI message appears
14. ✅ Tap "View Feedback"
15. ✅ Feedback screen shows scores
16. ✅ Tap "Retry" → back to conversation
17. ✅ Tap "Continue" → back to conversation

---

**📝 Note:** File này mô tả luồng hoạt động chi tiết của AI Voice Speaking Practice Feature. Tất cả các screens, components, hooks và animations đã được implement đầy đủ và sẵn sàng sử dụng.
