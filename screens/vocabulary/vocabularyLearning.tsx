import React from 'react';

/**
 * VocabularyLearning Screen
 *
 * This is a container screen that orchestrates different vocabulary learning exercises.
 * Import and use specific exercise screens based on the lesson type.
 *
 * FOR TESTING UI WITHOUT BACKEND:
 * Import the DemoNavigator to test all exercise screens with mock data.
 */

// Import Demo Navigator for testing
import { DemoNavigator } from './__demo__';

/**
 * TEMPORARY: Using DemoNavigator for UI Testing
 *
 * This allows you to:
 * ✅ Test all 7 exercise types
 * ✅ Switch between screens easily
 * ✅ See all UI states (correct, incorrect, completed)
 * ✅ Use debug controls to toggle states
 *
 * TO USE WITH REAL DATA LATER:
 * Replace DemoNavigator with your actual lesson routing logic
 */
export const VocabularyLearning: React.FC = () => {
  return <DemoNavigator />;
};

export default VocabularyLearning;
