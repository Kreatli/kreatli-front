export const getErrorMessage = (error: any) => {
  return error.response?.data.message ?? 'Something went wrong';
};
