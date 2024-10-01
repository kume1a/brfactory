export const formatLongString = (str: string, maxLen = 100): string => {
  if (!str) {
    return '';
  }

  return str.length > maxLen ? `${str.substring(0, maxLen)}...` : str;
};
