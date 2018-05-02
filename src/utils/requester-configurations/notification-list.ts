import { HttpEndpoints } from '../../lib/constants/httpEndpoints';

export default {
  url: HttpEndpoints.BASE + HttpEndpoints.NOTIFICATION_LIST,
  method: 'GET',
  headers: {
    'X-API-Signature': '',
  },
  qs: {},
};
