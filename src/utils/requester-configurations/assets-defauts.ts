import {HttpEndpoints} from "../../lib/constants/httpEndpoints";

export default {
    url: HttpEndpoints.BASE + HttpEndpoints.ASSET_DEFAULT,
    method: 'GET',
    headers: {
        'X-API-Signature': ''
    },
    qs: null,
};