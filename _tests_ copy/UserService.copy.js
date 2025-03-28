// src/utils/UserService.test.js
import { UserService } from '@/utils/UserService';

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  test('addUser should add a user and return the user object', async () => {
    const user = await userService.addUser(1, 'John Doe', 'john.doe@example.com');
    expect(user).toEqual({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
  });

  test('addUser should throw an error when adding a user with an invalid email format', async () => {
    await expect(userService.addUser(1, 'John Doe', 'invalid-email')).rejects.toThrow('Invalid email format');
  });

  test('addUser should throw an error when adding a user with an existing ID', async () => {
    await userService.addUser(1, 'John Doe', 'john.doe@example.com');
    await expect(userService.addUser(1, 'Jane Doe', 'jane.doe@example.com')).rejects.toThrow('User already exists');
  });

  test('getUser should return the correct user object when the ID exists', async () => {
    await userService.addUser(1, 'John Doe', 'john.doe@example.com');
    const user = await userService.getUser(1);
    expect(user).toEqual({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
  });

  test('getUser should throw an error when the ID does not exist', async () => {
    await expect(userService.getUser(1)).rejects.toThrow('User not found');
  });

  test('deleteUser should remove a user and return true when the ID exists', async () => {
    await userService.addUser(1, 'John Doe', 'john.doe@example.com');
    const result = await userService.deleteUser(1);
    expect(result).toBe(true);
    await expect(userService.getUser(1)).rejects.toThrow('User not found');
  });

  test('deleteUser should throw an error when the ID does not exist', async () => {
    await expect(userService.deleteUser(1)).rejects.toThrow('User not found');
  });

  test('editUser should update a user when the ID exists', async () => {
    await userService.addUser(1, 'John Doe', 'john.doe@example.com');
    const user = await userService.editUser(1, 'Jane Doe', 'jane.doe@example.com');
    expect(user).toEqual({ id: 1, name: 'Jane Doe', email: 'jane.doe@example.com' });
  });

  test('editUser should throw an error when the ID does not exist', async () => {
    // 这里需要取消注释以测试编辑功能
    /*
    await expect(userService.editUser(1, 'Jane Doe', 'jane.doe@example.com')).rejects.toThrow('User not found');
    */
  });

  test('validateEmail should return true for a valid email format', () => {
    expect(userService.validateEmail('john.doe@example.com')).toBe(true);
  });

  test('validateEmail should return false for an invalid email format', () => {
    expect(userService.validateEmail('invalid-email')).toBe(false);
  });

  it('should throw an error if id is empty', async () => {
    await expect(userService.addUser('', 'John Doe', 'john.doe@example.com')).rejects.toThrow('ID, name, and email cannot be empty');
  });

  it('should throw an error if name is empty', async () => {
    await expect(userService.addUser('1', '', 'john.doe@example.com')).rejects.toThrow('ID, name, and email cannot be empty');
  });

  it('should throw an error if email is empty', async () => {
    await expect(userService.addUser('1', 'John Doe', '')).rejects.toThrow('ID, name, and email cannot be empty');
  });

  it('should throw an error if id, name, and email are all empty', async () => {
    await expect(userService.addUser('', '', '')).rejects.toThrow('ID, name, and email cannot be empty');
  });

  it('should add a user successfully with valid id, name, and email', async () => {
    const user = await userService.addUser('1', 'John Doe', 'john.doe@example.com');
    expect(user).toEqual({ id: '1', name: 'John Doe', email: 'john.doe@example.com' });
  });



  describe('editUser', () => {
    beforeEach(() => {

      userService.users.set(1, { id: 1, name: '张三', email: 'zhangsan@example.com' });
    })
    
    it('should edit user name and email', async () => {
      const updatedUser = await userService.editUser(1, '李四', 'lisi@example.com');
      expect(updatedUser.name).toBe('李四');
      expect(updatedUser.email).toBe('lisi@example.com');
    });

    it('should only edit user name', async () => {
      const updatedUser = await userService.editUser(1, '王五');
      expect(updatedUser.name).toBe('王五');
      expect(updatedUser.email).toBe('zhangsan@example.com');
    });

    it('should only edit user email', async () => {
      const updatedUser = await userService.editUser(1, null, 'wangwu@example.com');
      expect(updatedUser.name).toBe('张三');
      expect(updatedUser.email).toBe('wangwu@example.com');
    });

    it('should not edit user if user not found', async () => {
      await expect(userService.editUser(999, '赵六', 'zhaoliu@example.com')).rejects.toThrow('User not found');
    });

    it('should not edit user with invalid email format', async () => {
      await expect(userService.editUser(1, null, 'invalid-email')).rejects.toThrow('Invalid email format');
    });
  });

});
