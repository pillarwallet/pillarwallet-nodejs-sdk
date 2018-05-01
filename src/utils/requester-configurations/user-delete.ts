import {HttpEndpoints} from "../../lib/constants/httpEndpoints";

export default {
    url: HttpEndpoints.BASE + HttpEndpoints.USER_DELETE,
    method: 'DELETE',
    headers: {
        'X-API-Signature': ''
    },
    body: null,
    json: true,
};