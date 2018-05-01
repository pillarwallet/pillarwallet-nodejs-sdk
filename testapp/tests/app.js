const generateKeyPair = require('../../tests/glue/generateKeyPair');
// import {PillarSdk} from '../dist';
const { PillarSdk } = require('../../dist');

let p = new PillarSdk();

describe('wallet endpoints', () => {

    describe('/wallet/register', () => {
        it('Wallet Registration', async () => {
            const hdkey = generateKeyPair();
            const myParams = {
                eth_address: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
                fcmToken: 'cMctpybZfwk:APA91bFP_IarnIblW0UDSDGs_w7buoP2apxFIzI6YUOuib_FdSFPLe2ANR-OrFiaAvJ8v1zHyFTyRJBo4gf3EHpJSpfhToexCshEArkq6ho4gR3AqomxpgoF2JWf-tlJc8fB0Swrq0z7',
                public_key: hdkey._publicKey.toString('hex'),
            };
            await p.wallet.register(myParams,hdkey.privateKey);
        });
    });
});
