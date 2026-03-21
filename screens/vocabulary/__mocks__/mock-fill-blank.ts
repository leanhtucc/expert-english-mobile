import { FillBlankQuestion } from '../fill-blank/useFillBlank';

export const mockFillBlankQuestions: FillBlankQuestion[] = [
  {
    id: '1',
    sentence: 'The model uses a self-attention mechanism to process input sequences',
    blankIndex: 4,
    correctAnswer: 'self-attention',
    options: ['self-attention', 'cross-attention', 'global-attention', 'local-attention'],
    hint: 'This mechanism allows the model to attend to its own input',
  },
  {
    id: '2',
    sentence: 'During training the model minimizes the loss function to improve accuracy',
    blankIndex: 2,
    correctAnswer: 'training',
    options: ['training', 'testing', 'deployment', 'validation'],
    hint: 'This is the phase where the model learns from data',
  },
  {
    id: '3',
    sentence: 'Neural networks consist of multiple layers of interconnected neurons',
    blankIndex: 5,
    correctAnswer: 'layers',
    options: ['layers', 'nodes', 'units', 'blocks'],
    hint: 'These are stacked on top of each other in deep networks',
  },
  {
    id: '4',
    sentence: 'The dataset was split into training validation and test sets',
    blankIndex: 5,
    correctAnswer: 'validation',
    options: ['validation', 'development', 'production', 'staging'],
    hint: 'This set is used to tune hyperparameters',
  },
  {
    id: '5',
    sentence: 'Gradient descent is an optimization algorithm used to minimize loss',
    blankIndex: 3,
    correctAnswer: 'optimization',
    options: ['optimization', 'evaluation', 'initialization', 'normalization'],
    hint: 'This type of algorithm improves model performance',
  },
];
