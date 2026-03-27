export interface GetPageRequest {
  condition?: string; // JSON string ví dụ: {"path_id":"..."}
  sort?: string; // JSON string ví dụ: {"order_index":1}
  page?: number;
  limit?: number;
}

export interface PostSubmitLessonRequest {
  exercise_id: string;
  lesson_id: string;
  answers: Record<string, any>; // <--- Đổi thành dạng Object để linh hoạt truyền đáp án
  is_correct: boolean;
  score: number;
  time_spent_seconds: number;
}
export interface ExercisePageRequest {
  page?: number;
  limit?: number;
  select?: string;
  sort?: string;
  population?: string[];
  condition?: string; // Dùng để lọc id: {"_id": {"$in": ["id1", "id2"]}}
  filters?: string[];
}
