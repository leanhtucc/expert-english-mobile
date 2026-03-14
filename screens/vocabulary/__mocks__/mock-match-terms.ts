import { MatchPair } from '../match-terms/useMatchTerms';

export const mockMatchPairs: MatchPair[] = [
  {
    id: '1',
    term: 'Overfitting',
    definition:
      'When a model learns training data too well, including noise, and performs poorly on new data',
  },
  {
    id: '2',
    term: 'Hyperparameter',
    definition: 'A parameter set before training that controls the learning process',
  },
  {
    id: '3',
    term: 'Epoch',
    definition: 'One complete pass through the entire training dataset',
  },
  {
    id: '4',
    term: 'Batch Size',
    definition: 'The number of training examples used in one iteration',
  },
];
