// src/UserService.js
export class UserService {
  constructor() {
    this.users = new Map(); // 模拟数据库
  }

  async addUser(id, name, email) {
    if (!id || !name || !email) {
      throw new Error('ID, name, and email cannot be empty');
    }
    if (this.users.has(id)) {
      throw new Error('User already exists');
    }
    this.users.set(id, { id, name, email });
    return this.users.get(id);
  }

  async getUser(id) {
    if (!this.users.has(id)) {
      throw new Error('User not found');
    }
    return this.users.get(id);
  }

  async deleteUser(id) {
    if (!this.users.has(id)) {
      throw new Error('User not found');
    }
    this.users.delete(id);
    return true;
  }

  async editUser(id, name, email) {
    if (!this.users.has(id)) {
      throw new Error('User not found');
    }
    if (name) {
      this.users.get(id).name = name;
    }
    if (email) {
      this.users.get(id).email = email;
    }
    return this.users.get(id);
  }
}
