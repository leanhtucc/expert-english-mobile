export interface GetPageRequest {
  condition?: string; // JSON string ví dụ: {"path_id":"..."}
  sort?: string; // JSON string ví dụ: {"order_index":1}
  page?: number;
  limit?: number;
}
