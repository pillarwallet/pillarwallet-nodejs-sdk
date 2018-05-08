import { HttpEndpoints } from '../../lib/constants/httpEndpoints';

export default {
  url: HttpEndpoints.BASE + HttpEndpoints.WALLET_UPDATE,
  method: 'POST',
  headers: {
    'X-API-Signature': '',
  },
  body: {},
  json: true,
};
