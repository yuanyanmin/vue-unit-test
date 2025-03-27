// Banking.spec.js
const { transferFunds } = require('@/utils/Banking');

describe('transferFunds 方法', () => {
  let sourceAccount;
  let targetAccount;

  beforeEach(() => {
    sourceAccount = { balance: 100 };
    targetAccount = { balance: 0 };
  });

  test('应正确进行转账', () => {
    const result = transferFunds(sourceAccount, targetAccount, 50);
    expect(result.sourceAccount.balance).toBe(49.5); // 扣除了50 + 0.5（手续费）
    expect(result.targetAccount.balance).toBe(50);
    expect(result.fee).toBe(0.5);
    expect(result.transferredAmount).toBe(50);
  });

  test('国际转账应正确进行转账', () => {
    expect(sourceAccount.balance).toBe(100);

    const result = transferFunds(sourceAccount, targetAccount, 50, 0.01, true);
    expect(result.sourceAccount.balance).toBe(49); // 扣除了50 + 1（手续费）
    expect(result.targetAccount.balance).toBe(50);
    expect(result.fee).toBe(1);
    expect(result.transferredAmount).toBe(50);
  });

  test('转账金额为负数应抛出错误', () => {
    expect(() => transferFunds(sourceAccount, targetAccount, -50)).toThrowError('Transfer amount must be greater than zero');
  });

  test('转账金额为零应抛出错误', () => {
    expect(() => transferFunds(sourceAccount, targetAccount, 0)).toThrowError('Transfer amount must be greater than zero');
  });

  test('源账户余额不足应抛出错误', () => {
    expect(() => transferFunds(sourceAccount, targetAccount, 150)).toThrowError('Insufficient funds in source account');
  });

  test('手续费超过转账金额的10%应抛出错误', () => {
    expect(() => transferFunds(sourceAccount, targetAccount, 50, 0.2)).toThrowError('Transaction fee exceeds 10% of the transfer amount');
  });

  test('源账户信息无效应抛出错误', () => {
    expect(() => transferFunds({}, targetAccount, 50)).toThrowError('Invalid account information');
  });

  test('目标账户信息无效应抛出错误', () => {
    expect(() => transferFunds(sourceAccount, {}, 50)).toThrowError('Invalid account information');
  });

  test('源账户余额不是数字应抛出错误', () => {
    expect(() => transferFunds({ balance: 'not a number' }, targetAccount, 50)).toThrowError('Invalid account information');
  });

  test('目标账户余额不是数字应抛出错误', () => {
    expect(() => transferFunds(sourceAccount, { balance: 'not a number' }, 50)).toThrowError('Invalid account information');
  });
});
