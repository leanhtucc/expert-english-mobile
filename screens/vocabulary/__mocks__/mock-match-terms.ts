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
  {
    id: '5',
    term: 'Learning Rate',
    definition: 'The step size used when updating model weights during training',
  },
  {
    id: '6',
    term: 'Loss Function',
    definition: 'A function that measures how well the model predictions match the actual values',
  },
  {
    id: '7',
    term: 'Activation Function',
    definition: 'A mathematical function that determines the output of a neural network node',
  },
  {
    id: '8',
    term: 'Backpropagation',
    definition: 'The algorithm for calculating gradients used to update neural network weights',
  },
];
