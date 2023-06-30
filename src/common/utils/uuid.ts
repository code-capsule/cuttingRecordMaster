/**
 * @description 生成uuid
 */
export const generateUUid = (): string => {
  return 'yxxxyxxxyxxxyxxxyxxxyxxxyxxxyxxxyxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
