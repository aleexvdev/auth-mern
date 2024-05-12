export const formatErrors = (errors: any[]) => {
  return errors.reduce((acc: Record<string, string>, error: any) => {
    acc[error.path] = error.msg;
    return acc;
  }, {});
};