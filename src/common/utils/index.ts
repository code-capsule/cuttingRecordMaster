/**
 * @description 检测是否 http https 链接
 */
export const isHttpOrHttps = (url: string): boolean => {
  if (!url) return false;
  const patten = /^https?:\/\/.+/;
  return patten.test(url);
};
