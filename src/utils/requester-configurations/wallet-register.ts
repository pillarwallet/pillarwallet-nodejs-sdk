import {HttpEndpoints} from "../../lib/constants/httpEndpoints";

export default {
    url: HttpEndpoints.BASE + HttpEndpoints.WALLET_REGISTER,
    method: 'POST',
    headers: {
        'X-API-Signature': ''
    },
    body: null,
    json: true,
};