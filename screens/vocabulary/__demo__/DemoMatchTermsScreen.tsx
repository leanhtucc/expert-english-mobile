import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mockMatchPairs } from '../__mocks__';
import { MatchTermsScreen } from '../match-terms/MatchTermsScreen';

export const DemoMatchTermsScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <MatchTermsScreen pairs={mockMatchPairs} />
    </SafeAreaView>
  );
};
