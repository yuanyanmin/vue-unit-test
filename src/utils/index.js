export function deepClone(obj, hash = new WeakMap()) {
  // 处理非对象和null的情况
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj)
  }

  // 处理特殊对象类型
  let clone
  switch (true) {
    case obj instanceof Date:
      clone = new Date(obj)
      break
    case obj instanceof RegExp:
      clone = new RegExp(obj)
      break
    case Array.isArray(obj):
      clone = []
      break
    default:
      clone = Object.create(Object.getPrototypeOf(obj))
  }

  hash.set(obj, clone)

  // 递归拷贝属性
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash)
    }
  }

  // 处理Symbol属性
  const symbols = Object.getOwnPropertySymbols(obj)
  for (const sym of symbols) {
    clone[sym] = deepClone(obj[sym], hash)
  }

  return clone
}
