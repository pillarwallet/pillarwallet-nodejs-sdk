import {HttpEndpoints} from "../../lib/constants/httpEndpoints";

export default {
    url: HttpEndpoints.BASE + HttpEndpoints.USER_UPDATE,
    method: 'POST',
    headers: {
        'X-API-Signature': ''
    },
    body: null,
    json: true,
};