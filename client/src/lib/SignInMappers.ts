import { MappedResponse } from "../types/auth.type";

/* export const mapperSignIn = (objAuth: any): MappedResponse => ({
  user: {
    _id: objAuth.user._id,
    username: objAuth.user.username,
    email: objAuth.user.email,
    password: objAuth.user.password,
    role: objAuth.user.roles,
  },
  token: objAuth.token,
}); */

export const mapperSignIn = (objAuth: any): MappedResponse | undefined => {
  // Check if objAuth.user exists and is an object
  if (objAuth.user && typeof objAuth.user === 'object') {
    // Check if objAuth.user._id exists
    const userId = objAuth.user._id ? objAuth.user._id : '';

    return {
      user: {
        id: userId,
        username: objAuth.user.username || '',
        email: objAuth.user.email || '',
        password: objAuth.user.password || '',
        role: objAuth.user.roles || [],
      },
      token: objAuth.token || '',
    };
  }

  // If objAuth.user is not an object or is undefined, return undefined
  return undefined;
};