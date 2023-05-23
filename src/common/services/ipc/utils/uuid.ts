/** *
 *
 * 获取请求的UUID，指定长度和进制,如
 * getUuid(8, 2)   //"01001010" 8 character (base=2)
 * getUuid(8, 10) // "47473046" 8 character ID (base=10)
 * getUuid(8, 16) // "098F4D35"。 8 character ID (base=16)
 *
 */
 export function getUuid(len: number = 8, radix: number = 16) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid: string[] | number[] = [];
  var i = 0;
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    var r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}
