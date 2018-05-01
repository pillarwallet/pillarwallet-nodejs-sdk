import {HttpEndpoints} from "../../lib/constants/httpEndpoints";

export default {
    url: HttpEndpoints.BASE + HttpEndpoints.ASSET_SEARCH,
    method: 'GET',
    headers: {
        'X-API-Signature': ''
    },
    qs: {},
};