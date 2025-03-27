// banking.js

/**
 * 转账资金
 * @param {Object} sourceAccount 源账户
 * @param {Object} targetAccount 目标账户
 * @param {number} amount 转账金额
 * @param {number} feeRate 交易手续费率（例如 0.02 代表 2%）
 * @param {boolean} isInternational 是否为国际转账
 * @returns {Object} 转账后的账户信息
 */
function transferFunds(sourceAccount, targetAccount, amount, feeRate = 0.01, isInternational = false) {
  // 验证账户信息
  if (!sourceAccount || !targetAccount || typeof sourceAccount.balance !== 'number' || typeof targetAccount.balance !== 'number') {
    throw new Error('Invalid account information');
  }

  // 验证转账金额
  if (amount <= 0) {
    throw new Error('Transfer amount must be greater than zero');
  }

  // 验证源账户余额是否足够
  if (sourceAccount.balance < amount) {
    throw new Error('Insufficient funds in source account');
  }

  // 计算交易手续费
  let fee = amount * feeRate;
  if (isInternational) {
    fee *= 2; // 假设国际转账手续费是普通转账的两倍
  }

  // 确保手续费不超过转账金额的10%
  if (fee > amount * 0.1) {
    throw new Error('Transaction fee exceeds 10% of the transfer amount');
  }

  // 执行转账操作
  const totalAmount = amount + fee;

  // 扣除源账户金额
  sourceAccount.balance -= totalAmount;

  // 增加目标账户金额
  targetAccount.balance += amount;

  // 返回转账后的账户信息
  return {
    sourceAccount,
    targetAccount,
    fee,
    transferredAmount: amount,
  };
}

module.exports = { transferFunds };
