/*
Copyright (C) 2019 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
// tslint:disable: object-shorthand-properties-first
// check node environment
const env = process.env.NODE_ENV;

const keys = require('../../utils/generateKeyPair');
import { PillarSdk } from '../../..';
import nock = require('nock');

describe('Asset Default', () => {
  // Key pairs
  const privateKey = keys.privateKey.toString();

  // Generate random username
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  let walletId: string;
  let pSdk: PillarSdk;

  // Responses
  const responseData = [
    {
      isPreferred: false,
      socialMedia: [],
      icos: [],
      address: '0x1585936b53834b021f68CC13eEeFdEc2EfC8e724',
      decimals: 18,
      description:
        'Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference.',
      name: 'Ethereum',
      symbol: 'ETH',
      wallpaperUrl: 'asset/images/tokens/wallpaper/ethBg.png',
      iconUrl: 'asset/images/tokens/icons/ethColor.png',
      patternUrl: 'asset/images/patternIcons/ethColor.png',
      iconMonoUrl: 'asset/images/tokens/icons/eth.png',
      email: null,
      telegram: null,
      twitter: 'https://twitter.com/ethereum',
      website: 'https://ethereum.org/',
      whitepaper: null,
      isDefault: true,
      id: '5c133ad5996646af3fa844ff',
    },
    {
      isPreferred: true,
      socialMedia: [],
      icos: [],
      address: '0xe3818504c1b32bf1557b16c238b2e01fd3149c17',
      decimals: 18,
      description:
        'Pillar is developing a decentralised solution for digital asset and personal data management.',
      name: 'Pillar',
      symbol: 'PLR',
      wallpaperUrl: 'asset/images/tokens/wallpaper/plrBg.png',
      iconUrl: 'asset/images/tokens/icons/plrColor.png',
      patternUrl: 'asset/images/patternIcons/plrColor.png',
      iconMonoUrl: 'asset/images/tokens/icons/plr.png',
      email: 'info@pillarproject.io',
      telegram: 'https://t.me/pillarofficial',
      twitter: 'https://twitter.com/PillarWallet',
      website: 'https://pillarproject.io/',
      whitepaper: 'https://pillarproject.io/documents/Pillar-Gray-Paper.pdf',
      isDefault: true,
      id: '5c133ad6996646af3fa84bbb',
    },
  ];

  const errInvalidWalletId = {
    message: 'Could not find a Wallet ID to search by.',
  };

  const errInternal = {
    message: 'Internal Server Error',
  };

  beforeAll(async () => {
    pSdk = new PillarSdk({});
    pSdk.configuration.setUsername('username');

    const walletRegister = {
      privateKey,
      fcmToken: '987qwe',
      username,
    };

    if (env === 'test') {
      const mockApi = nock('https://localhost:8080');
      mockApi
        .post('/register/keys')
        .reply(200, {
          expiresAt: '2015-03-21T05:41:32Z',
          nonce: 'AxCDF23232',
        })
        .post('/register/auth')
        .reply(200, {
          authorizationCode: 'Authorization code',
          expiresAt: '2011-06-14T04:12:36Z',
        })
        .post('/register/access')
        .reply(200, {
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
          walletId: 'walletId',
        })
        .get('/asset/defaults?walletId=walletId')
        .reply(200, responseData)
        .get('/asset/defaults?walletId=')
        .reply(400, errInvalidWalletId)
        .get('/asset/defaults?walletId=walletId')
        .reply(500, errInternal);
    }

    try {
      const response = await pSdk.wallet.registerAuthServer(walletRegister);
      walletId = response.data.walletId;
    } catch (e) {
      throw e;
    }
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  it('expects to return array containing assets and status 200', async () => {
    const inputParams = {
      walletId,
    };

    const responseDefaults = await pSdk.asset.defaults(inputParams);
    expect(responseDefaults.status).toBe(200);
    expect(responseDefaults.data).toEqual(expect.any(Array));
  });

  it('should return 400 due invalid params', async () => {
    const inputParams = {
      walletId: '',
    };

    try {
      await pSdk.asset.defaults(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errInvalidWalletId.message);
    }
  });

  if (env === 'test') {
    it('should return 500 due internal server error', async () => {
      const inputParams = {
        walletId,
      };

      try {
        await pSdk.asset.defaults(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }
});
