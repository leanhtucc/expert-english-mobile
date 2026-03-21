# Vocabulary Module - Mock Testing Guide

This guide explains how to use the mock data and demo screens to test vocabulary UI components without backend dependencies.

## 📁 Structure

```
vocabulary/
├── __mocks__/              # Mock data files
│   ├── mock-flashcards.ts
│   ├── mock-multiple-choice.ts
│   ├── mock-image-quiz.ts
│   ├── mock-match-terms.ts
│   ├── mock-fill-blank.ts
│   ├── mock-review-session.ts
│   ├── mock-lesson-result.ts
│   └── index.ts
│
└── __demo__/               # Demo screens for testing
    ├── DemoNavigator.tsx           # Main entry point
    ├── DemoFlashcardScreen.tsx
    ├── DemoMultipleChoiceScreen.tsx
    ├── DemoImageQuizScreen.tsx
    ├── DemoMatchTermsScreen.tsx
    ├── DemoFillBlankScreen.tsx
    ├── DemoReviewSessionScreen.tsx
    ├── DemoLessonResultScreen.tsx
    └── index.ts
```

---

## 🚀 Quick Start

### Option 1: Use the Demo Navigator (Recommended)

The **DemoNavigator** provides a menu-driven interface to test all exercise types:

```tsx
import { DemoNavigator } from './screens/vocabulary/__demo__';

export default function App() {
  return <DemoNavigator />;
}
```

**Features:**

- ✅ Visual menu to select exercise types
- ✅ Built-in back navigation
- ✅ Debug controls on each screen
- ✅ No setup required

### Option 2: Test Individual Screens

Import specific demo screens directly for focused testing:

```tsx
import { DemoFlashcardScreen } from './screens/vocabulary/__demo__';

export default function App() {
  return <DemoFlashcardScreen />;
}
```

### Option 3: Use Mock Data in Your Own Components

Import mock data directly into your custom tests:

```tsx
import { mockFlashcards, mockMultipleChoiceQuestions } from './screens/vocabulary/__mocks__';

function MyCustomTest() {
  return <FlashcardScreen cards={mockFlashcards} onComplete={() => console.log('Done')} />;
}
```

---

## 📚 Available Mock Data

### 1. **Flashcards** (`mock-flashcards.ts`)

```typescript
// Contains 5 AI/ML themed flashcards
import { mockFlashcards } from './screens/vocabulary/__mocks__';

export interface FlashcardItem {
  id: string;
  word: string;
  phonetic: string;
  definition: string;
  example: string;
  translation: string;
  audioUrl: string;
}
```

**Data includes:**

- Transformer, Neural Network, Algorithm, Optimization, Dataset
- Full phonetic transcriptions
- Real-world examples
- Vietnamese translations

---

### 2. **Multiple Choice** (`mock-multiple-choice.ts`)

```typescript
// Contains 5 questions
import { mockMultipleChoiceQuestions } from './screens/vocabulary/__mocks__';

export interface MultipleChoiceQuestion {
  id: string;
  word: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
```

**Data includes:**

- AI, Machine Learning, Deep Learning, Supervised Learning, Accuracy
- 4 options per question
- Detailed explanations

---

### 3. **Image Quiz** (`mock-image-quiz.ts`)

```typescript
// Contains 5 visual questions
import { mockImageQuizQuestions } from './screens/vocabulary/__mocks__';

export interface ImageQuizQuestion {
  id: string;
  imageUrl: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}
```

**Data includes:**

- Placeholder images from picsum.photos
- Technical concepts with visual representations
- 4 options per question

---

### 4. **Match Terms** (`mock-match-terms.ts`)

```typescript
// Contains 8 term-definition pairs
import { mockMatchPairs } from './screens/vocabulary/__mocks__';

export interface MatchPair {
  id: string;
  term: string;
  definition: string;
}
```

**Data includes:**

- Overfitting, Hyperparameter, Epoch, Batch Size, Learning Rate, Loss Function, Activation Function, Backpropagation

---

### 5. **Fill in the Blank** (`mock-fill-blank.ts`)

```typescript
// Contains 5 questions
import { mockFillBlankQuestions } from './screens/vocabulary/__mocks__';

export interface FillBlankQuestion {
  id: string;
  sentence: string;
  blankIndex: number;
  correctAnswer: string;
  options: string[];
  hint: string;
}
```

**Data includes:**

- Sentences with contextual blanks
- 4 distractor options
- Helpful hints

---

### 6. **Review Session** (`mock-review-session.ts`)

```typescript
// Contains 4 mistake examples
import { mockMistakes } from './screens/vocabulary/__mocks__';

export interface MistakeItem {
  id: string;
  word: string;
  correctAnswer: string;
  yourAnswer: string;
  explanation: string;
}
```

---

### 7. **Lesson Result** (`mock-lesson-result.ts`)

```typescript
// Contains 4 performance levels
import {
  // 80% accuracy
  mockLessonResultAverage,
  mockLessonResultExcellent,
  // 95% accuracy
  mockLessonResultGood,
  // 67% accuracy
  mockLessonResultNeedsWork, // 50% accuracy
} from './screens/vocabulary/__mocks__';

export interface LessonSummaryData {
  totalWords: number;
  accuracy: number;
  timeSpent: string;
  masteredWords: number;
  streak?: number;
}
```

---

## 🧪 Testing Features

Each demo screen includes:

### 1. **State Testing**

- ✅ Default/initial state
- ✅ User interaction states
- ✅ Success/correct states
- ✅ Error/incorrect states
- ✅ Completion states

### 2. **Debug Controls**

Demo screens include debug panels at the bottom:

```tsx
<View className="bg-gray-100 px-6 pb-6 dark:bg-gray-800">
  <Text className="text-xs font-semibold">Debug Controls:</Text>
  <Pressable onPress={() => toggleState()}>
    <Text>Toggle State</Text>
  </Pressable>
</View>
```

**Available controls:**

- **Flashcard**: Toggle flip state
- **Multiple Choice**: Toggle answered state
- **Image Quiz**: Toggle answered state
- **Fill Blank**: Toggle answered state
- **Lesson Result**: Switch performance levels (Excellent/Good/Average/Needs Work)

### 3. **Navigation Testing**

- Back button functionality
- Progress tracking
- Screen transitions
- Menu navigation

---

## 🎨 UI Testing Scenarios

### Scenario 1: Test All States in Multiple Choice

```tsx
import { DemoMultipleChoiceScreen } from './screens/vocabulary/__demo__';

// 1. Initial state: No answer selected
// 2. Select answer: Option gets highlighted
// 3. Click "Check Answer": Shows correct/incorrect colors
// 4. View explanation: Blue info box appears
// 5. Click "Next": Moves to next question
```

### Scenario 2: Test Flashcard Interactions

```tsx
import { DemoFlashcardScreen } from './screens/vocabulary/__demo__';

// 1. Tap card to flip: Front → Back animation
// 2. Tap audio button: Console logs play event
// 3. Mark as "Known": Moves to next card
// 4. Navigate with Previous/Next buttons
// 5. Track progress bar updates
```

### Scenario 3: Test Match Terms Drag-Drop

```tsx
import { DemoMatchTermsScreen } from './screens/vocabulary/__demo__';

// 1. Select term: Highlights in blue
// 2. Select definition: Checks if match is correct
// 3. Correct match: Both items turn green and lock
// 4. Incorrect match: Items flash red, mistake counter increases
// 5. Complete all pairs: Shows success message
```

---

## 🔧 Customization

### Add Your Own Mock Data

Create a new mock file in `__mocks__/`:

```typescript
// __mocks__/mock-custom-exercise.ts
export interface CustomExercise {
  id: string;
  // Your fields here
}

export const mockCustomExercises: CustomExercise[] = [{ id: '1' /* ... */ }, { id: '2' /* ... */ }];
```

Export it from `__mocks__/index.ts`:

```typescript
export { mockCustomExercises } from './mock-custom-exercise';
```

### Create a Custom Demo Screen

Create a new demo screen in `__demo__/`:

```tsx
// __demo__/DemoCustomScreen.tsx
import React from 'react';
import { Text, View } from 'react-native';

import { mockCustomExercises } from '../__mocks__';

export const DemoCustomScreen: React.FC = () => {
  return (
    <View>
      <Text>Testing Custom Exercise</Text>
      {/* Your UI here */}
    </View>
  );
};
```

Add it to the DemoNavigator menu:

```tsx
// __demo__/DemoNavigator.tsx
const demoMenuItems: DemoMenuItem[] = [
  // ... existing items
  {
    key: 'custom',
    title: 'Custom Exercise',
    description: 'My custom test',
    icon: '🎯',
    color: 'bg-pink-500',
  },
];
```

---

## 📱 Integration with React Navigation

### Add Demo to Navigation Stack

```tsx
// navigation/index.tsx
import { DemoNavigator } from '../screens/vocabulary/__demo__';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VocabularyDemo"
        component={DemoNavigator}
        options={{ title: 'Vocabulary Testing' }}
      />
      {/* Other screens */}
    </Stack.Navigator>
  );
}
```

### Navigate to Demo from Settings

```tsx
// screens/profile/SettingsScreen.tsx
import { useNavigation } from '@react-navigation/native';

function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('VocabularyDemo')}>
      <Text>🧪 Test Vocabulary UI</Text>
    </Pressable>
  );
}
```

---

## 🐛 Debugging Tips

### 1. **Check Console Logs**

All demo screens log actions to the console:

```tsx
// Look for logs like:
console.log('Known:', currentCard.word);
console.log('Play audio:', audioUrl);
console.log('Continue');
```

### 2. **Inspect State with Debug Controls**

Use the debug panel at the bottom of each screen to manually toggle states.

### 3. **Test Dark Mode**

All screens support dark mode. Toggle system theme to test:

```tsx
// Screens automatically adapt using:
className = 'bg-white dark:bg-gray-900';
className = 'text-gray-800 dark:text-white';
```

### 4. **Verify Progress Tracking**

Watch the progress bar update as you navigate:

```tsx
const progress = ((currentIndex + 1) / totalItems) * 100;
<ProgressBar progress={progress} />;
```

---

## 🚨 Common Issues

### Issue: Images not loading in Image Quiz

**Solution:** Replace picsum.photos URLs with your own images:

```typescript
// __mocks__/mock-image-quiz.ts
{
  imageUrl: 'https://your-cdn.com/images/transformer.png',
  // ...
}
```

### Issue: Audio not playing in Flashcards

**Solution:** Implement actual audio playback:

```tsx
// flashcard/FlashcardCard.tsx
import { Audio } from 'expo-av';

const handlePlayAudio = async () => {
  const { sound } = await Audio.Sound.createAsync({ uri: card.audioUrl });
  await sound.playAsync();
};
```

### Issue: Navigation conflicts with main app

**Solution:** Use separate stack or modal:

```tsx
<Stack.Screen name="VocabularyDemo" component={DemoNavigator} options={{ presentation: 'modal' }} />
```

---

## 📊 Test Coverage

The mock data and demo screens cover:

| Feature               | Coverage                |
| --------------------- | ----------------------- |
| **Exercise Types**    | 7/7 (100%)              |
| **UI States**         | All states per exercise |
| **Dark Mode**         | Full support            |
| **Navigation**        | Complete flow           |
| **Error States**      | Incorrect answers       |
| **Success States**    | Correct answers         |
| **Progress Tracking** | All exercises           |
| **Debug Controls**    | All screens             |

---

## 🎯 Next Steps

1. **Test each screen individually** using the DemoNavigator
2. **Verify responsive layouts** on different device sizes
3. **Check dark mode** appearance
4. **Test navigation flows** between screens
5. **Replace mock data** with real backend API calls when ready

---

## 📞 Support

For questions or issues with the demo system:

1. Check console logs for errors
2. Verify mock data structure matches interfaces
3. Ensure all imports are correct
4. Test on both iOS and Android if possible

---

## 📝 Quick Reference

**Import mock data:**

```tsx
import { mockFlashcards } from './screens/vocabulary/__mocks__';
```

**Import demo screens:**

```tsx
import { DemoNavigator } from './screens/vocabulary/__demo__';
```

**Run full demo:**

```tsx
export default function App() {
  return <DemoNavigator />;
}
```

**Run single screen:**

```tsx
import { DemoFlashcardScreen } from './screens/vocabulary/__demo__';

export default function App() {
  return <DemoFlashcardScreen />;
}
```

---

**Happy Testing! 🧪✨**
