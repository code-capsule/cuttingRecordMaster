// 获取函数第一个参数的ts类型
export type SingleParameters<T extends (param: any) => any> = T extends (
  param: infer P
) => any
  ? P
  : never

/**
 * 将 T 的所有属性设置为可选 Partial
 */
export type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T
