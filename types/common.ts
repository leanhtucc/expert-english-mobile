export interface CommonResponse<T = any> {
  status: number;
  success: boolean;
  message: string;
  data?: T;
}
