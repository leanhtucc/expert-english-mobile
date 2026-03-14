export interface CommonResponse<T = any> {
  data?: T;
  success: boolean;
}
