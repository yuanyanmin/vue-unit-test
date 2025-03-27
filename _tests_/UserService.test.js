// _tests_/UserService.spec.js
import { UserService } from '@/utils/UserService';

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('addUser 方法', () => {
    test('应成功添加用户', async () => {
      const user = await userService.addUser(1, 'Alice', 'alice@example.com');
      expect(user).toEqual({ id: 1, name: 'Alice', email: 'alice@example.com' });
      expect(userService.users.has(1)).toBe(true);
    });

    test('添加已存在的用户应抛出错误', async () => {
      await userService.addUser(1, 'Alice', 'alice@example.com');
      await expect(userService.addUser(1, 'Alice', 'alice@example.com')).rejects.toThrowError('User already exists');
    });

    test('添加用户时缺少参数应抛出错误', async () => {
      await expect(userService.addUser(1, 'Alice')).rejects.toThrowError('ID, name, and email cannot be empty');
      await expect(userService.addUser(1, '', 'alice@example.com')).rejects.toThrowError('ID, name, and email cannot be empty');
    });
  });

  describe('getUser 方法', () => {
    test('应正确获取用户信息', async () => {
      await userService.addUser(1, 'Alice', 'alice@example.com');
      const user = await userService.getUser(1);
      expect(user).toEqual({ id: 1, name: 'Alice', email: 'alice@example.com' });
    });

    test('获取不存在的用户应抛出错误', async () => {
      await expect(userService.getUser(999)).rejects.toThrowError('User not found');
    });
  });

  describe('deleteUser 方法', () => {
    test('应正确删除用户', async () => {
      await userService.addUser(1, 'Alice', 'alice@example.com');
      const result = await userService.deleteUser(1);
      expect(result).toBe(true);
      expect(userService.users.has(1)).toBe(false);
    });

    test('删除不存在的用户应抛出错误', async () => {
      await expect(userService.deleteUser(999)).rejects.toThrowError('User not found');
    });
  });

  describe('updateUser 方法', () => {
    it('应该能编辑用户的名称', async () => {
      await userService.addUser(1, '张三', 'zhangsan@example.com');
      const result = await userService.editUser(1, '李四', '');
      expect(result.name).toBe('李四');
      expect(result.email).toBe('zhangsan@example.com'); // 邮箱保持不变
    });
  
    it('应该能编辑用户的电子邮件', async () => {
      await userService.addUser(1, '张三', 'zhangsan@example.com');

      const result = await userService.editUser(1, '', 'lisi@example.com');
      expect(result.name).toBe('张三'); // 名称保持不变
      expect(result.email).toBe('lisi@example.com');
    });
  
    it('应该能同时编辑用户的名称和电子邮件', async () => {
      await userService.addUser(1, '张三', 'zhangsan@example.com');

      const result = await userService.editUser(1, '王五', 'wangwu@example.com');
      expect(result.name).toBe('王五');
      expect(result.email).toBe('wangwu@example.com');
    });
  
    // it('如果用户不存在，应该抛出错误', async () => {
    //   await expect(userService.editUser('2', '赵六', 'zhaoliu@example.com')).rejects.toThrow('User not found');
    // });

    it('编辑不存在的用户应抛出错误', async () => {
      await expect(userService.editUser(999, '李四', 'lisi@example.com')).rejects.toThrowError('User not found');
    });
  
    it('传入 undefined 作为参数不应修改用户信息', async () => {
      await userService.addUser(1, '张三', 'zhangsan@example.com');
      const result = await userService.editUser(1, undefined, undefined);
      expect(result.name).toBe('张三');
      expect(result.email).toBe('zhangsan@example.com');
    });
  
    it('传入 null 作为参数不应修改用户信息', async () => {
      await userService.addUser(1, '张三', 'zhangsan@example.com');
      const result = await userService.editUser(1, null, null);
      expect(result.name).toBe('张三');
      expect(result.email).toBe('zhangsan@example.com');
    });
  
    it('传入空字符串作为 name 参数不应修改用户名称', async () => {
      await userService.addUser(1, '张三', 'zhangsan@example.com');
      const result = await userService.editUser(1, '', 'lisi@example.com');
      expect(result.name).toBe('张三'); // 名称保持不变
      expect(result.email).toBe('lisi@example.com');
    });
  
    it('传入空字符串作为 email 参数不应修改用户电子邮件', async () => {
      await userService.addUser(1, '张三', 'zhangsan@example.com');
      const result = await userService.editUser(1, 'lisi', '');
      expect(result.name).toBe('lisi');
      expect(result.email).toBe('zhangsan@example.com'); // 邮箱保持不变
    });
  
    it('传入所有参数为空字符串不应修改用户信息', async () => {
      await userService.addUser(1, '张三', 'zhangsan@example.com');
      const result = await userService.editUser(1, '', '');
      expect(result.name).toBe('张三'); // 名称保持不变
      expect(result.email).toBe('zhangsan@example.com'); // 邮箱保持不变
    });
  });


});
