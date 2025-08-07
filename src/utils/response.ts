export const globalResponse = <T = unknown>(statusCode: number, message: string, data?: T) => {
  return {
    success: statusCode < 300,
    statusCode,
    message,
    data
  }
}
