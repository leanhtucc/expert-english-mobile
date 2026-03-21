import { MultipleChoiceQuestion } from '../multiple-choice/useMultipleChoice';

export const mockMultipleChoiceQuestions: MultipleChoiceQuestion[] = [
  {
    id: '1',
    word: 'Artificial Intelligence',
    question: 'What does "Artificial Intelligence" mean in the context of technology?',
    options: [
      'The simulation of human intelligence by machines',
      'A type of computer hardware',
      'A programming language',
      'A database management system',
    ],
    correctAnswer: 'The simulation of human intelligence by machines',
    explanation:
      'Artificial Intelligence (AI) refers to computer systems that can perform tasks that typically require human intelligence, such as learning, reasoning, and problem-solving.',
  },
  {
    id: '2',
    word: 'Machine Learning',
    question: 'What is Machine Learning?',
    options: [
      'Programming computers manually',
      'A subset of AI where systems learn from data',
      'Building physical machines',
      'Testing software applications',
    ],
    correctAnswer: 'A subset of AI where systems learn from data',
    explanation:
      'Machine Learning is a branch of AI that enables systems to learn and improve from experience without being explicitly programmed.',
  },
  {
    id: '3',
    word: 'Deep Learning',
    question: 'How is Deep Learning different from traditional Machine Learning?',
    options: [
      'It uses neural networks with multiple layers',
      'It only works with images',
      'It requires less data',
      'It is faster to train',
    ],
    correctAnswer: 'It uses neural networks with multiple layers',
    explanation:
      'Deep Learning uses artificial neural networks with multiple layers (deep networks) to learn hierarchical representations of data.',
  },
  {
    id: '4',
    word: 'Supervised Learning',
    question: 'What characterizes Supervised Learning?',
    options: [
      'Learning without any guidance',
      'Training with labeled data and known outputs',
      'Learning through trial and error',
      'Clustering similar data points',
    ],
    correctAnswer: 'Training with labeled data and known outputs',
    explanation:
      'Supervised Learning involves training a model using labeled data where the correct outputs are already known.',
  },
  {
    id: '5',
    word: 'Accuracy',
    question: 'In machine learning, what does Accuracy measure?',
    options: [
      'The speed of the model',
      'The size of the dataset',
      'The proportion of correct predictions',
      'The computational resources used',
    ],
    correctAnswer: 'The proportion of correct predictions',
    explanation:
      'Accuracy is a metric that measures the percentage of correct predictions made by a model out of all predictions.',
  },
];
