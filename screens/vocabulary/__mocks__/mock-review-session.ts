import { MistakeItem } from '../review-session/ReviewSessionScreen';

export const mockMistakes: MistakeItem[] = [
  {
    id: '1',
    word: 'Transformer',
    correctAnswer: 'A model architecture using self-attention mechanisms',
    yourAnswer: 'A hardware component for electrical circuits',
    explanation:
      'In AI and NLP, a Transformer is a neural network architecture that relies on self-attention mechanisms to process sequential data efficiently.',
  },
  {
    id: '2',
    word: 'Overfitting',
    correctAnswer: 'When a model learns training data too well and performs poorly on new data',
    yourAnswer: 'When a model is too large for the dataset',
    explanation:
      'Overfitting occurs when a model captures noise and details in the training data to the extent that it negatively impacts performance on new data.',
  },
  {
    id: '3',
    word: 'Epoch',
    correctAnswer: 'One complete pass through the entire training dataset',
    yourAnswer: 'A single training example',
    explanation:
      'An epoch represents one full cycle where the training algorithm has seen all training examples once.',
  },
  {
    id: '4',
    word: 'Learning Rate',
    correctAnswer: 'The step size used when updating model weights',
    yourAnswer: 'The speed at which the model processes data',
    explanation:
      'The learning rate is a hyperparameter that controls how much to adjust the model weights with respect to the loss gradient.',
  },
];
