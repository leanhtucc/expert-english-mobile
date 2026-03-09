# Vocabulary Learning Module

A comprehensive, scalable vocabulary learning system for the ExpertEnglish language learning app.

## 📁 Architecture Overview

```
vocabulary/
├── components/              # Shared reusable components
│   ├── ProgressBar.tsx
│   ├── OptionButton.tsx
│   ├── PrimaryButton.tsx
│   ├── SecondaryButton.tsx
│   ├── ScreenHeader.tsx
│   ├── StatCard.tsx
│   ├── VocabularyCard.tsx
│   └── index.ts
│
├── flashcard/              # Vocabulary flashcards (listen + speak)
│   ├── FlashcardScreen.tsx
│   ├── FlashcardCard.tsx
│   ├── FlashcardControls.tsx
│   ├── useFlashcard.ts
│   └── index.ts
│
├── fill-blank/            # Fill in the blank quiz
│   ├── FillBlankScreen.tsx
│   ├── QuestionCard.tsx
│   ├── AnswerInput.tsx
│   ├── useFillBlank.ts
│   └── index.ts
│
├── image-quiz/            # Image-based vocabulary quiz
│   ├── ImageQuizScreen.tsx
│   ├── ImageQuestion.tsx
│   ├── OptionButton.tsx
│   ├── useImageQuiz.ts
│   └── index.ts
│
├── multiple-choice/       # Word meaning multiple choice
│   ├── MultipleChoiceScreen.tsx
│   ├── QuestionCard.tsx
│   ├── OptionItem.tsx
│   ├── useMultipleChoice.ts
│   └── index.ts
│
├── match-terms/           # Match terms with definitions
│   ├── MatchTermsScreen.tsx
│   ├── TermItem.tsx
│   ├── DropZone.tsx
│   ├── useMatchTerms.ts
│   └── index.ts
│
├── review-session/        # Review & master mistakes
│   ├── ReviewSessionScreen.tsx
│   ├── MistakeCard.tsx
│   ├── OptionItem.tsx
│   └── index.ts
│
├── recording/             # Recording & pronunciation feedback
│   ├── RecordingScreen.tsx
│   ├── MicrophoneButton.tsx
│   ├── WaveAnimation.tsx
│   ├── useRecording.ts
│   └── index.ts
│
├── result/                # Lesson summary / result screen
│   ├── LessonSummaryScreen.tsx
│   ├── ResultStatCard.tsx
│   └── index.ts
│
├── vocabularyLearning.tsx # Main learning container
├── vocabularyResult.tsx   # Result wrapper
└── index.ts              # Main exports
```

## 🎯 Design Principles

### 1. **Separation of Concerns**

- **Screens**: Handle layout and composition only
- **Hooks**: Contain all business logic and state management
- **Components**: Reusable, stateless UI elements

### 2. **File Size Limit**

- All files kept under 200 lines
- Complex logic split into multiple files
- Hooks extract state management from screens

### 3. **Reusability**

- Shared components in `/components` folder
- Each module exports clean interfaces
- Components designed for composition

### 4. **Type Safety**

- Full TypeScript coverage
- Explicit interfaces for all props
- Type exports for external usage

## 🚀 Quick Start

### Import a Screen

```tsx
import { FlashcardItem, FlashcardScreen } from '@/screens/vocabulary';

// Prepare data
const flashcards: FlashcardItem[] = [
  {
    id: '1',
    word: 'Transformer',
    phonetic: '/trænsˈfɔːrmər/',
    definition: 'A deep learning model architecture...',
    example: 'The Transformer architecture revolutionized NLP.',
    translation: 'Bộ biến đổi',
    audioUrl: 'https://...',
  },
];

// Use in your component
<FlashcardScreen
  flashcards={flashcards}
  onComplete={() => console.log('Lesson complete!')}
  onBack={() => navigation.goBack()}
  onClose={() => navigation.navigate('Home')}
/>;
```

### Use Shared Components

```tsx
import { PrimaryButton, ProgressBar, ScreenHeader } from '@/screens/vocabulary/components';

<View>
  <ScreenHeader title="My Lesson" subtitle="Learn new words" onBack={() => navigation.goBack()} />

  <ProgressBar current={5} total={10} />

  <PrimaryButton label="Continue" onPress={handleContinue} />
</View>;
```

## 📚 Module Documentation

### 1. Flashcard Module

**Purpose**: Interactive flashcards with audio playback and self-assessment

**Usage**:

```tsx
import { FlashcardScreen, FlashcardItem } from '@/screens/vocabulary';

const flashcards: FlashcardItem[] = [...];

<FlashcardScreen
  flashcards={flashcards}
  onComplete={() => navigateToResults()}
/>
```

**Features**:

- Flip animation (tap to reveal)
- Audio pronunciation
- Self-assessment (Know it / Don't know)
- Progress tracking

---

### 2. Fill-in-the-Blank Module

**Purpose**: Complete sentences with missing vocabulary words

**Usage**:

```tsx
import { FillBlankQuestion, FillBlankScreen } from '@/screens/vocabulary';

const questions: FillBlankQuestion[] = [
  {
    id: '1',
    sentence: 'The model uses a attention mechanism',
    blankIndex: 4,
    correctAnswer: 'self-attention',
    options: ['self-attention', 'cross-attention', 'global-attention'],
    hint: 'It attends to its own input',
  },
];

<FillBlankScreen questions={questions} onComplete={score => console.log('Score:', score)} />;
```

---

### 3. Image Quiz Module

**Purpose**: Identify vocabulary from visual representations

**Usage**:

```tsx
import { ImageQuizQuestion, ImageQuizScreen } from '@/screens/vocabulary';

const questions: ImageQuizQuestion[] = [
  {
    id: '1',
    imageUrl: 'https://...',
    correctAnswer: 'Transformer Architecture',
    options: ['RNN', 'CNN', 'Transformer Architecture', 'GAN'],
    explanation: 'The image shows the attention mechanism...',
  },
];

<ImageQuizScreen questions={questions} onComplete={results => console.log(results)} />;
```

---

### 4. Multiple Choice Module

**Purpose**: Test word meanings with multiple choice questions

**Usage**:

```tsx
import { MultipleChoiceQuestion, MultipleChoiceScreen } from '@/screens/vocabulary';

const questions: MultipleChoiceQuestion[] = [
  {
    id: '1',
    word: 'Transformer',
    question: 'What does "Transformer" mean in AI context?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 'A neural network architecture...',
    explanation: '...',
  },
];

<MultipleChoiceScreen questions={questions} onComplete={score => showResults(score)} />;
```

---

### 5. Match Terms Module

**Purpose**: Match vocabulary terms with their definitions

**Usage**:

```tsx
import { MatchPair, MatchTermsScreen } from '@/screens/vocabulary';

const pairs: MatchPair[] = [
  {
    id: '1',
    term: 'Attention',
    definition: 'A mechanism that focuses on relevant parts...',
  },
];

<MatchTermsScreen pairs={pairs} onComplete={accuracy => console.log('Accuracy:', accuracy)} />;
```

---

### 6. Review Session Module

**Purpose**: Review and learn from mistakes

**Usage**:

```tsx
import { MistakeItem, ReviewSessionScreen } from '@/screens/vocabulary';

const mistakes: MistakeItem[] = [
  {
    id: '1',
    word: 'Transformer',
    correctAnswer: 'Architecture for sequence modeling',
    yourAnswer: 'A hardware component',
    explanation: '...',
  },
];

<ReviewSessionScreen
  mistakes={mistakes}
  onRetakeQuiz={() => retakeQuiz()}
  onContinue={() => navigation.navigate('Next')}
/>;
```

---

### 7. Recording Module

**Purpose**: Practice pronunciation with recording and feedback

**Usage**:

```tsx
import { RecordingScreen } from '@/screens/vocabulary';

<RecordingScreen
  word="Transformer"
  phonetic="/trænsˈfɔːrmər/"
  onComplete={audioUrl => analyzePronunciation(audioUrl)}
  onSkip={() => skipToNext()}
/>;
```

**Features**:

- Record audio
- Wave animation during recording
- Duration timer
- Pause/resume functionality

---

### 8. Result/Summary Module

**Purpose**: Display lesson completion summary and stats

**Usage**:

```tsx
import { LessonSummaryData, LessonSummaryScreen } from '@/screens/vocabulary';

const data: LessonSummaryData = {
  totalWords: 15,
  accuracy: 87,
  timeSpent: '4:20',
  masteredWords: 13,
  streak: 5,
};

<LessonSummaryScreen
  data={data}
  onStartSpeaking={() => navigation.navigate('Speaking')}
  onViewVocabulary={() => navigation.navigate('VocabularyList')}
  showSpeakingButton={true}
/>;
```

## 🎨 Styling

All components use **NativeWind** (Tailwind CSS for React Native).

### Color Scheme:

- **Primary**: Red (`bg-red-600`, `text-red-600`)
- **Success**: Green (`bg-green-500`)
- **Error**: Red (`bg-red-500`)
- **Background**: Gray (`bg-gray-50`)
- **Text**: Gray variants

### Common Patterns:

```tsx
// Rounded cards
className = 'rounded-2xl bg-white p-4 shadow-sm';

// Primary button
className = 'bg-red-600 rounded-2xl py-4 px-6';

// Secondary button
className = 'bg-white border-2 border-red-600 rounded-2xl py-4';
```

## 🧩 Shared Components

### ProgressBar

```tsx
<ProgressBar current={5} total={10} />
```

### OptionButton

```tsx
<OptionButton
  label="Option A"
  isSelected={selected === 'A'}
  isCorrect={false}
  onPress={() => setSelected('A')}
/>
```

### PrimaryButton / SecondaryButton

```tsx
<PrimaryButton label="Continue" onPress={handleContinue} />
<SecondaryButton label="Skip" onPress={handleSkip} />
```

### ScreenHeader

```tsx
<ScreenHeader
  title="Lesson Title"
  subtitle="Description"
  onBack={() => goBack()}
  onClose={() => close()}
/>
```

### StatCard

```tsx
<StatCard icon={<Text>📚</Text>} value={15} label="Total Words" />
```

### VocabularyCard

```tsx
<VocabularyCard
  word="Transformer"
  phonetic="/trænsˈfɔːrmər/"
  definition="..."
  example="..."
  translation="..."
/>
```

## 📦 Integration with Navigation

```tsx
// Example with React Navigation
import { createStackNavigator } from '@react-navigation/stack';

import { FlashcardScreen, ImageQuizScreen, LessonSummaryScreen } from '@/screens/vocabulary';

const Stack = createStackNavigator();

function VocabularyNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Flashcard" component={FlashcardScreen} />
      <Stack.Screen name="ImageQuiz" component={ImageQuizScreen} />
      <Stack.Screen name="Summary" component={LessonSummaryScreen} />
    </Stack.Navigator>
  );
}
```

## 🔄 State Management

Each module uses **custom hooks** for state management:

- `useFlashcard` - Flashcard logic
- `useFillBlank` - Fill-in-blank logic
- `useImageQuiz` - Image quiz logic
- `useMultipleChoice` - Multiple choice logic
- `useMatchTerms` - Match terms logic
- `useRecording` - Recording logic

These hooks can be used standalone or integrated with global state (Redux, Zustand, etc.).

## 🧪 Testing

Each module is independently testable:

```tsx
import { act, renderHook } from '@testing-library/react-hooks';

import { useFlashcard } from '@/screens/vocabulary';

test('should flip card', () => {
  const { result } = renderHook(() =>
    useFlashcard({
      flashcards: mockData,
      onComplete: jest.fn(),
    })
  );

  act(() => {
    result.current.handleFlip();
  });

  expect(result.current.isFlipped).toBe(true);
});
```

## 🚀 Future Enhancements

- [ ] Add animations (Reanimated 3)
- [ ] Implement spaced repetition algorithm
- [ ] Add offline support
- [ ] Gamification features
- [ ] Social sharing
- [ ] Adaptive difficulty

## 📄 License

Part of the ExpertEnglish project.

---

**Built with ❤️ using React Native + TypeScript + NativeWind**
