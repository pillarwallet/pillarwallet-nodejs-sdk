// import secp256k1 from'secp256k1';
// import sha3 from 'ethereumjs-util';

// export function signPayload(payload, privateKey) {
//     const hash = sha3(JSON.stringify(payload));
//     const sigObj = secp256k1.sign(hash, new Buffer(privateKey, "hex"));

//     const signature = sigObj.signature.toString("hex");
//     return signature;
// }