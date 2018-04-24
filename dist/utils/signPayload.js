import secp256k1 from 'secp256k1';
import sha3 from 'ethereumjs-util';
export function signPayload(payload, privateKey) {
    var hash = sha3(JSON.stringify(payload));
    var sigObj = secp256k1.sign(hash, new Buffer(privateKey, "hex"));
    var signature = sigObj.signature.toString("hex");
    return signature;
}
//# sourceMappingURL=signPayload.js.map