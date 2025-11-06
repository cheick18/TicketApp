export interface apiUserResponse<T = unknown> {
  success?: boolean;
  message?: string;
  token?: string;
  user?: T;
}
