export const getErrorMessage = (error: any) => {
  if (error.response?.data.message === 'No token provided') {
    return 'Please login to continue';
  }

  return error.response?.data.message ?? 'Something went wrong';
};
