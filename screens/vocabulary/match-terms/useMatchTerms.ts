import { useCallback, useState } from 'react';

export interface MatchPair {
  id: string;
  term: string;
  definition: string;
}

interface UseMatchTermsProps {
  pairs: MatchPair[];
  onComplete?: (accuracy: number) => void;
}

export const useMatchTerms = ({ pairs, onComplete }: UseMatchTermsProps) => {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);

  const isComplete = matchedPairs.length === pairs.length;
  const accuracy =
    pairs.length > 0 ? Math.round(((pairs.length - mistakes) / pairs.length) * 100) : 0;

  const handleSelectTerm = useCallback(
    (termId: string) => {
      if (matchedPairs.includes(termId)) return;

      setSelectedTerm(termId);

      if (selectedDefinition) {
        // Check if match is correct
        if (termId === selectedDefinition) {
          setMatchedPairs(prev => [...prev, termId]);
          setSelectedTerm(null);
          setSelectedDefinition(null);

          // Check if complete
          if (matchedPairs.length + 1 === pairs.length) {
            setTimeout(() => {
              onComplete?.(accuracy);
            }, 500);
          }
        } else {
          setMistakes(prev => prev + 1);
          setTimeout(() => {
            setSelectedTerm(null);
            setSelectedDefinition(null);
          }, 800);
        }
      }
    },
    [selectedDefinition, matchedPairs, pairs.length, accuracy, onComplete]
  );

  const handleSelectDefinition = useCallback(
    (termId: string) => {
      if (matchedPairs.includes(termId)) return;

      setSelectedDefinition(termId);

      if (selectedTerm) {
        // Check if match is correct
        if (termId === selectedTerm) {
          setMatchedPairs(prev => [...prev, termId]);
          setSelectedTerm(null);
          setSelectedDefinition(null);

          // Check if complete
          if (matchedPairs.length + 1 === pairs.length) {
            setTimeout(() => {
              onComplete?.(accuracy);
            }, 500);
          }
        } else {
          setMistakes(prev => prev + 1);
          setTimeout(() => {
            setSelectedTerm(null);
            setSelectedDefinition(null);
          }, 800);
        }
      }
    },
    [selectedTerm, matchedPairs, pairs.length, accuracy, onComplete]
  );

  const reset = useCallback(() => {
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setMatchedPairs([]);
    setMistakes(0);
  }, []);

  return {
    selectedTerm,
    selectedDefinition,
    matchedPairs,
    mistakes,
    isComplete,
    accuracy,
    progress: {
      current: matchedPairs.length,
      total: pairs.length,
    },
    handleSelectTerm,
    handleSelectDefinition,
    reset,
  };
};
