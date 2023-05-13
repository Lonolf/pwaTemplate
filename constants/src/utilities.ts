export function convertObjectToArray(values: any) {
  return Object.keys(values).map((key: any) => values[key])
}

export const getErrorMessage = (e: any) => {
  const message =
    e.response?.data?.stackTrace?.response?.stackTrace ||
    e.response?.data?.stackTrace ||
    e.response?.data?.message ||
    e.response?.stackTrace ||
    e.response?.data ||
    e.message ||
    ''
  return message
}
