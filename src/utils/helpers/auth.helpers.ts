export const USER_KEY = "_@CHEBER_PARTNER";

const windowIsExists = () =>
  typeof window !== "undefined" && window.localStorage;

export const getUserFromStorage = () => {
  if (windowIsExists()) {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const removeUserFromStorage = () => {
  if (windowIsExists()) {
    localStorage.removeItem(USER_KEY);
  }
};

export const saveUserToStorage = (data: any) => {
  if (windowIsExists()) localStorage.setItem(USER_KEY, JSON.stringify(data));
};
