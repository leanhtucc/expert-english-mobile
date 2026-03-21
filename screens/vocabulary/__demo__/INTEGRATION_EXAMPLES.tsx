// /**
//  * Quick Integration Guide for Vocabulary Demo
//  *
//  * Copy and paste these code snippets to quickly test the vocabulary UI
//  */

// // ========================================
// // METHOD 1: Standalone App Testing
// // ========================================

// // In your App.tsx or root component:
// import React from 'react';
// import { DemoNavigator } from './screens/vocabulary/__demo__';

// // ========================================
// // METHOD 2: Add to Navigation Stack
// // ========================================

// // In your navigation/index.tsx or navigation setup file:
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // ========================================
// // METHOD 3: Add Debug Button to Settings
// // ========================================

// // In your settings or profile screen:
// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { Pressable, Text, View } from 'react-native';

// // ========================================
// // METHOD 4: Test Individual Screens
// // ========================================

// // Test just the flashcard screen:
// import { DemoFlashcardScreen } from './screens/vocabulary/__demo__';

// // Test just the multiple choice screen:
// import { DemoMultipleChoiceScreen } from './screens/vocabulary/__demo__';

// // ========================================
// // METHOD 5: Use Mock Data Directly
// // ========================================

// // Import mock data into your own components:
// import React from 'react';
// import { mockFlashcards } from './screens/vocabulary/__mocks__';
// import { FlashcardScreen } from './screens/vocabulary/flashcard';

// export default function App() {
//   return <DemoNavigator />;
// }

// const Stack = createNativeStackNavigator();

// export function AppNavigator() {
//   return (
//     <Stack.Navigator>
//       {/* Your existing screens */}
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//       />

//       {/* Add Demo Screen */}
//       <Stack.Screen
//         name="VocabularyDemo"
//         component={DemoNavigator}
//         options={{
//           title: 'Vocabulary UI Testing',
//           presentation: 'modal', // Optional: Opens as modal
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

// export function SettingsScreen() {
//   const navigation = useNavigation();

//   return (
//     <View>
//       {/* Your existing settings */}

//       {/* Add debug button (only show in development) */}
//       {__DEV__ && (
//         <Pressable
//           onPress={() => navigation.navigate('VocabularyDemo')}
//           className="bg-blue-500 p-4 rounded-lg my-4"
//         >
//           <Text className="text-white font-semibold text-center">
//             🧪 Test Vocabulary UI (Dev Only)
//           </Text>
//         </Pressable>
//       )}
//     </View>
//   );
// }

// export default function App() {
//   return <DemoFlashcardScreen />;
// }

// export default function App() {
//   return <DemoMultipleChoiceScreen />;
// }

// export function MyCustomTest() {
//   return (
//     <View>
//       <FlashcardScreen
//         cards={mockFlashcards}
//         onComplete={() => console.log('Test complete!')}
//       />
//     </View>
//   );
// }

// // ========================================
// // USAGE EXAMPLES
// // ========================================

// /**
//  * Example 1: Test all exercise types with menu
//  *
//  * 1. Import DemoNavigator in App.tsx
//  * 2. Run app
//  * 3. Select any exercise from menu
//  * 4. Use debug controls at bottom of each screen
//  */

// /**
//  * Example 2: Quick flashcard testing
//  *
//  * import { DemoFlashcardScreen } from './screens/vocabulary/__demo__';
//  * export default DemoFlashcardScreen;
//  *
//  * This gives you immediate access to test:
//  * - Card flip animations
//  * - Audio button interactions
//  * - Known/Unknown marking
//  * - Navigation between cards
//  * - Progress tracking
//  */

// /**
//  * Example 3: Test result screen with different performance levels
//  *
//  * import { DemoLessonResultScreen } from './screens/vocabulary/__demo__';
//  * export default DemoLessonResultScreen;
//  *
//  * This screen includes a debug panel to switch between:
//  * - Excellent (95%)
//  * - Good (80%)
//  * - Average (67%)
//  * - Needs Work (50%)
//  */

// /**
//  * Example 4: Access mock data for unit tests
//  *
//  * import { mockFlashcards, mockMultipleChoiceQuestions } from './screens/vocabulary/__mocks__';
//  *
//  * describe('FlashcardScreen', () => {
//  *   it('should render all cards', () => {
//  *     const { getAllByTestId } = render(
//  *       <FlashcardScreen cards={mockFlashcards} />
//  *     );
//  *     expect(getAllByTestId('flashcard')).toHaveLength(mockFlashcards.length);
//  *   });
//  * });
//  */

// // ========================================
// // TYPESCRIPT SUPPORT
// // ========================================

// // // All mock data types are exported:
// // import type { FlashcardItem } from './screens/vocabulary/flashcard/useFlashcard';
// // import type { MultipleChoiceQuestion } from './screens/vocabulary/multiple-choice/useMultipleChoice';
// // import type { ImageQuizQuestion } from './screens/vocabulary/image-quiz/useImageQuiz';
// // import type { MatchPair } from './screens/vocabulary/match-terms/useMatchTerms';
// // import type { FillBlankQuestion } from './screens/vocabulary/fill-blank/useFillBlank';
// // import type { MistakeItem } from './screens/vocabulary/review-session/ReviewSessionScreen';
// // import type { LessonSummaryData } from './screens/vocabulary/result/LessonSummaryScreen';

// // // Use these types in your components:
// // function MyComponent({ data }: { data: FlashcardItem[] }) {
// //   // TypeScript will provide autocomplete and type checking
// // }

// // ========================================
// // CUSTOMIZATION
// // ========================================

// /**
//  * Replace mock images in Image Quiz:
//  *
//  * Edit: screens/vocabulary/__mocks__/mock-image-quiz.ts
//  *
//  * Replace picsum.photos URLs with your own:
//  * imageUrl: 'https://your-cdn.com/image1.png'
//  */

// /**
//  * Add more mock data:
//  *
//  * Edit any file in screens/vocabulary/__mocks__/
//  * Add more items to the existing arrays
//  */

// /**
//  * Change theme colors:
//  *
//  * Edit: screens/vocabulary/__demo__/DemoNavigator.tsx
//  * Modify the color property in demoMenuItems array
//  */

// // ========================================
// // TIPS & TRICKS
// // ========================================

// /**
//  * TIP 1: Use React DevTools
//  * - Install React DevTools browser extension
//  * - Inspect component props and state in real-time
//  * - Modify state values directly for testing
//  */

// /**
//  * TIP 2: Toggle Dark Mode Quickly
//  * - On iOS: Settings > Display & Brightness > Dark
//  * - On Android: Settings > Display > Dark theme
//  * - All demo screens adapt automatically
//  */

// /**
//  * TIP 3: Hot Reload for Fast Iteration
//  * - Edit any demo screen
//  * - Save file (Cmd+S / Ctrl+S)
//  * - App reloads instantly with changes
//  * - No need to restart app
//  */

// /**
//  * TIP 4: Console Logs for Debugging
//  * - All demo screens log interactions to console
//  * - Open terminal where you ran `npx expo start`
//  * - Watch for logs when interacting with UI
//  * - Example: "Known: Transformer", "Play audio: https://..."
//  */

// /**
//  * TIP 5: Test on Multiple Devices
//  * - Run on iOS simulator: Press 'i' in Expo terminal
//  * - Run on Android emulator: Press 'a' in Expo terminal
//  * - Run on physical device: Scan QR code with Expo Go app
//  */

// // ========================================
// // TROUBLESHOOTING
// // ========================================

// /**
//  * Error: "Cannot find module './screens/vocabulary/__demo__'"
//  * Solution: Make sure all files are created in the correct directory
//  *
//  * Error: "Undefined is not an object (evaluating 'navigation.navigate')"
//  * Solution: Wrap component in NavigationContainer or use within a navigator
//  *
//  * Error: "className is not a valid prop"
//  * Solution: Make sure NativeWind is set up correctly in tailwind.config.js
//  *
//  * Error: Images not loading in Image Quiz
//  * Solution: Check internet connection or replace with local images
//  */

// // // ========================================
// // // EXPO ROUTER INTEGRATION
// // // ========================================

// // // If using Expo Router, create a route file:
// // // app/vocabulary-demo.tsx

// // import { DemoNavigator } from '../screens/vocabulary/__demo__';
// // export default DemoNavigator;

// // // Then navigate to it:
// // import { router } from 'expo-router';
// // router.push('/vocabulary-demo');

// // ========================================
// // PRODUCTION READINESS
// // ========================================

// /**
//  * Before going to production:
//  *
//  * 1. Remove or hide demo screens from production builds:
//  *    {__DEV__ && <DemoButton />}
//  *
//  * 2. Replace mock data with real API calls
//  *
//  * 3. Remove or comment out console.log statements
//  *
//  * 4. Add proper error handling and loading states
//  *
//  * 5. Test on real devices with slow network
//  */

// export { };
