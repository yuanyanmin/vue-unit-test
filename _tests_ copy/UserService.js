// tests/unit/UserService.test.js
import { UserService } from '@/utils/UserService.js';

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('addUser', () => {
    it('should add a new user', async () => {
      const user = await userService.addUser('1', '张三', 'zhangsan@example.com');
      expect(user).toEqual({ id: '1', name: '张三', email: 'zhangsan@example.com' });
    });

    it('should throw an error if user already exists', async () => {
      await userService.addUser('1', '张三', 'zhangsan@example.com');
      await expect(userService.addUser('1', '李四', 'lisi@example.com')).rejects.toThrow('User already exists');
    });

    it('should throw an error if any field is empty', async () => {
      await expect(userService.addUser('', '张三', 'zhangsan@example.com')).rejects.toThrow('ID, name, and email cannot be empty');
      await expect(userService.addUser('1', '', 'zhangsan@example.com')).rejects.toThrow('ID, name, and email cannot be empty');
      await expect(userService.addUser('1', '张三', '')).rejects.toThrow('ID, name, and email cannot be empty');
    });

    it('should throw an error if email is invalid', async () => {
      await expect(userService.addUser('1', '张三', 'invalid-email')).rejects.toThrow('Invalid email format');
      await expect(userService.addUser('2', '李四', 'another.invalid')).rejects.toThrow('Invalid email format');
      await expect(userService.addUser('3', '王五', '@missingusername.com')).rejects.toThrow('Invalid email format');
      await expect(userService.addUser('4', '赵六', 'missingdomain@.com')).rejects.toThrow('Invalid email format');
    });
  });

  describe('getUser', () => {
    it('should return the user if found', async () => {
      await userService.addUser('1', '张三', 'zhangsan@example.com');
      const user = await userService.getUser('1');
      expect(user).toEqual({ id: '1', name: '张三', email: 'zhangsan@example.com' });
    });

    it('should throw an error if user not found', async () => {
      await expect(userService.getUser('1')).rejects.toThrow('User not found');
    });
  });

  describe('deleteUser', () => {
    it('should delete the user if found', async () => {
      await userService.addUser('1', '张三', 'zhangsan@example.com');
      const result = await userService.deleteUser('1');
      expect(result).toBe(true);
      await expect(userService.getUser('1')).rejects.toThrow('User not found');
    });

    it('should throw an error if user not found', async () => {
      await expect(userService.deleteUser('1')).rejects.toThrow('User not found');
    });
  });

  describe('editUser', () => {
    let user;

    beforeEach(async () => {
      user = await userService.addUser('1', '张三', 'zhangsan@example.com');
    });

    it('should edit the user name', async () => {
      await userService.editUser('1', '李四', '');
      expect(user.name).toBe('李四');
    });

    it('should edit the user email', async () => {
      await userService.editUser('1', '', 'lisi@example.com');
      expect(user.email).toBe('lisi@example.com');
    });

    it('should edit both user name and email', async () => {
      await userService.editUser('1', '李四', 'lisi@example.com');
      expect(user.name).toBe('李四');
      expect(user.email).toBe('lisi@example.com');
    });

    it('should throw an error if user not found', async () => {
      await expect(userService.editUser('2', '李四', 'lisi@example.com')).rejects.toThrow('User not found');
    });

    it('should throw an error if email format is invalid', async () => {
      await expect(userService.editUser('1', '张三', 'invalid-email')).rejects.toThrow('Invalid email format');
    });
  });
});
