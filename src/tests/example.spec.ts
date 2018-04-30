import { Wallet } from  '../lib/wallet';
let walletSdk = new Wallet('testId');

test('Basic Wallet Funtion Test', () => {
  const walletTestResult = walletSdk.testFunction();

  expect(walletTestResult).toBe('hello');
});
