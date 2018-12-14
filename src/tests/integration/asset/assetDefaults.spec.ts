// tslint:disable: object-shorthand-properties-first
const keys = require('../../utils/generateKeyPair');
import { PillarSdk } from '../../..';

describe('Asset Default', () => {
  // Key pairs
  const publicKey = keys.publicKey.toString();
  const privateKey = keys.privateKey.toString();
  const ethAddress = keys.ethAddress.toString();
  // Generate random username
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;
  let walletId: string;
  let pSdk: PillarSdk;

  const responseData = {
    data: [
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
        iconMonoUrl: 'asset/images/tokens/icons/plr.png',
        email: 'info@pillarproject.io',
        telegram: 'https://t.me/pillarofficial',
        twitter: 'https://twitter.com/PillarWallet',
        website: 'https://pillarproject.io/',
        whitepaper: 'https://pillarproject.io/documents/Pillar-Gray-Paper.pdf',
        isDefault: true,
        id: '5c133ad6996646af3fa84bbb',
      },
    ],
  };
  beforeAll(async () => {
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      privateKey,
    });
    const walletRegister = {
      privateKey,
      fcmToken: '987qwe',
      username,
    };
    try {
      const response = await pSdk.wallet.registerAuthServer(walletRegister);
      walletId = response.data.walletId;
    } catch (e) {
      throw e;
    }
  });

  it('expects to return array containing assets and status 200', async () => {
    const inputParams = {
      walletId,
    };

    const responseDefaults = await pSdk.asset.defaults(inputParams);
    // console.log(responseDefaults);
    expect(responseDefaults.status).toBe(200);
    expect(responseDefaults.data).toEqual(expect.any(Array));
  });
});
