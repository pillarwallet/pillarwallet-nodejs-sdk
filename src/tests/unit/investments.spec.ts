import { PillarSdk } from '../..';

let pSdk: PillarSdk;

describe('The Investment Class: depositRequest method', () => {
  it('should fail validations if the walletID is missing', () => {
    const inputParams = {
    currency: "GBP",
    serviceProvider: "Nivaura",
    };
    expect(pSdk.investments.depositRequest(inputParams)).toThrowError("");
});
