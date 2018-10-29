import nock = require('nock');
import * as request from 'supertest';
import { Register } from '../../lib/register';

const postConfiguration = nock('http://localhost:8080')
.post('/register/public')
.reply(200,
  {"nonce": "3yy1uy3u13yu1y3uy3",
  "expiresAt": "01.01.2019"
  })
  describe('POST /register/public', function() {
    it('respond with json',async () => {
      const dasmnn = await request('http://localhost:8080').post('/register/public');
      console.log(dasmnn);
        })
      })
