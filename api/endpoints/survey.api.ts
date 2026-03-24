import { SubmitSurveyOptionRequest } from '@/types/api/survey.request';
import {
  GenerateLearningPath4WeekResponse,
  GenerateLearningPath7dayResponse,
  SurveyResponseData,
  submitSurveyResponse,
} from '@/types/api/survey.response';

import { apiClient } from '../client';

export const surveyApi = {
  getDataSurvey: () => apiClient.get<SurveyResponseData>('/survey/options'),

  submitSurvey: (data: SubmitSurveyOptionRequest) =>
    apiClient.post<submitSurveyResponse>('/survey', data),

  generateLearningPath4Week: () =>
    apiClient.post<GenerateLearningPath4WeekResponse>('/survey/generate-learning-path'),

  generateLearningPath7day: () =>
    apiClient.post<GenerateLearningPath7dayResponse>('/survey/generate-schedule-7days/async'),
};
