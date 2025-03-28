# **AI 辅助单元测试**

## **1. AI 在单测中的作用**
- AI 如何辅助测试？
  - 代码分析、测试生成、Mock 数据
- 为什么引入 AI？
  - 提高测试覆盖率，减少人工编写测试的时间
  - 自动生成测试用例，发现潜在漏洞
  - 识别未测试的边界情况

---

## **2. AI 辅助单测的实践案例**
- **案例 1：生成 User 类测试**
- **案例 2：生成 Vue Table 组件测试**


## **3. AI 辅助单测的挑战 & 解决方案**
- **AI 生成测试的局限性**
  - 业务上下文 AI 可能无法理解
  - 类名不唯一时 AI 可能误判
  - 使用前端UI框架，DOM查找不准确
- **如何提升 AI 生成测试的质量？**
  - Prompt 技巧：给 AI 提供更详细的上下文
  - 人工 review：结合 AI + 人工优化测试


<!-- 
Stmts: 语句覆盖率
Branch: 分支覆盖率
Funcs: 函数覆盖率
Lines: 行覆盖率
Uncovered Line #s: 未覆盖的代码行数
 -->



```
    if (!this.users.has(id)) {
      throw new Error('User not found');
    }
    if (email && !this.validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    if (name) {
      this.users.get(id).name = name;
    }
    if (email) {
      this.users.get(id).email = email;
    }
```
