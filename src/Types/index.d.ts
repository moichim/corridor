export type ErrorPayload = {
  code: number,
  message: string,
  exception: string
}
export type ApiResponse<T> = {
  success: boolean,
  payload: T,
  error?: ErrorPayload
}


