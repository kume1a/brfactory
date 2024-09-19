export const getLocalStorage = (): Storage | undefined => {
  if (typeof window !== 'undefined') {
    return window.localStorage;
  }
};
