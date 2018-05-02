import { HttpEndpoints } from '../../lib/constants/httpEndpoints';

export default {
  url: HttpEndpoints.BASE + HttpEndpoints.USER_INFO,
  method: 'GET',
  headers: {
    'X-API-Signature': '',
  },
  qs: {},
};
