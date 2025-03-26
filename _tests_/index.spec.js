import { deepClone } from '@/utils/index.js'

describe('deepClone 深拷贝函数', () => {
  // 测试基本数据类型
  test('应正确克隆基本类型', () => {
    expect(deepClone(42)).toBe(42)
    expect(deepClone('hello')).toBe('hello')
    expect(deepClone(true)).toBe(true)
    expect(deepClone(null)).toBeNull()
    const undef = undefined
    expect(deepClone(undef)).toBeUndefined()
  })

  // 测试对象克隆
  test('应深拷贝普通对象', () => {
    const original = { 
      a: 1, 
      b: { 
        c: [2, { d: 3 } ] 
      }
    }
    const cloned = deepClone(original)
    
    expect(cloned).toEqual(original)
    expect(cloned).not.toBe(original)
    cloned.b.c[1].d = 4
    expect(original.b.c[1].d).toBe(3)
  })

  // 测试数组克隆
  test('应深拷贝数组', () => {
    const arr = [1, [2, { a: 3 }], new Date()]
    const cloned = deepClone(arr)
    
    expect(cloned).toEqual(arr)
    expect(cloned[1]).not.toBe(arr[1])
    cloned[1][1].a = 4
    expect(arr[1][1].a).toBe(3)
  })

  // 测试特殊对象
  test('应克隆特殊对象类型', () => {
    const date = new Date('2023-01-01')
    const regex = /test/gi
    const clonedDate = deepClone(date)
    const clonedRegex = deepClone(regex)
    
    expect(clonedDate).toEqual(date)
    expect(clonedDate).not.toBe(date)
    expect(clonedRegex.toString()).toBe('/test/gi')
  })

  // 测试循环引用
  test('应处理循环引用', () => {
    const obj = { a: 1 }
    obj.self = obj
    const cloned = deepClone(obj)
    
    expect(cloned.self).toBe(cloned)
    expect(cloned.self).not.toBe(obj)
  })

  // 测试Symbol属性
  test('应克隆Symbol属性', () => {
    const sym = Symbol('test')
    const obj = {
      [sym]: 'value',
      regular: 'property'
    }
    const cloned = deepClone(obj)
    
    expect(cloned).toEqual(obj)
    expect(Object.getOwnPropertySymbols(cloned)).toHaveLength(1)
    expect(cloned[sym]).toBe('value')
  })

  // 测试复杂结构
  test('应处理混合数据结构', () => {
    const original = {
      date: new Date(),
      regex: /pattern/,
      fn: function() {},
      arr: [{
        nested: {
          sym: Symbol('key'),
          circular: null
        }
      }]
    }
    original.arr[0].nested.circular = original
    
    const cloned = deepClone(original)
    
    expect(cloned.date).toEqual(original.date)
    expect(cloned.regex).toEqual(original.regex)
    expect(cloned.arr[0].nested.circular).toBe(cloned)
    expect(cloned.arr[0].nested.sym).toEqual(original.arr[0].nested.sym)
  })
})
