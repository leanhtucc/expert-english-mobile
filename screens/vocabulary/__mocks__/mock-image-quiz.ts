import { ImageQuizQuestion } from '../image-quiz/useImageQuiz';

export const mockImageQuizQuestions: ImageQuizQuestion[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    correctAnswer: 'Transformer Architecture',
    options: [
      'Recurrent Neural Network',
      'Convolutional Neural Network',
      'Transformer Architecture',
      'Generative Adversarial Network',
    ],
    explanation:
      'The Transformer architecture uses self-attention mechanisms to process sequential data in parallel, making it highly efficient for natural language processing tasks.',
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    correctAnswer: 'Neural Network Layers',
    options: [
      'Database Schema',
      'Neural Network Layers',
      'File System Structure',
      'Network Topology',
    ],
    explanation:
      'Neural networks consist of multiple layers of interconnected nodes (neurons) that process and transform data.',
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    correctAnswer: 'Gradient Descent',
    options: ['Binary Search', 'Bubble Sort', 'Gradient Descent', 'Quick Sort'],
    explanation:
      'Gradient Descent is an optimization algorithm used to minimize the loss function by iteratively moving in the direction of steepest descent.',
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/400/400?random=4',
    correctAnswer: 'Convolutional Layer',
    options: ['Pooling Layer', 'Convolutional Layer', 'Dense Layer', 'Dropout Layer'],
    explanation:
      'Convolutional layers apply filters to input data to detect features like edges, textures, and patterns in images.',
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/400/400?random=5',
    correctAnswer: 'Decision Tree',
    options: ['Decision Tree', 'Random Forest', 'Support Vector Machine', 'K-Means Clustering'],
    explanation:
      'A Decision Tree is a flowchart-like structure that makes decisions based on asking a series of questions about the features of the data.',
  },
];
