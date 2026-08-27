import {
    generateKeyPair,
    exportPKCS8,
    exportSPKI,
} from "jose";

const { publicKey, privateKey } = await generateKeyPair("EdDSA", {
    extractable: true,
    modulusLength:4096
});

const privateKeyPem = await exportPKCS8(privateKey);
const publicKeyPem = await exportSPKI(publicKey);

console.log("PRIVATE KEY:");
console.log(privateKeyPem.toString());

console.log("PUBLIC KEY:");
console.log(publicKeyPem);



// import { SignJWT, importPKCS8 } from "jose";

// const privateKey = await importPKCS8(
//     process.env.JWT_PRIVATE_KEY!,
//     "EdDSA"
// );

// const token = await new SignJWT({
//     sessionId: "123456",
// })
//     .setProtectedHeader({
//         alg: "EdDSA",
//         typ: "JWT",
//     })
//     .setIssuedAt()
//     .setExpirationTime("30m")
//     .sign(privateKey);

// console.log(token);


// import { importSPKI, jwtVerify } from "jose";

// const publicKey = await importSPKI(
//     process.env.JWT_PUBLIC_KEY!,
//     "EdDSA"
// );

// try {
//     const { payload, protectedHeader } = await jwtVerify(
//         token,
//         publicKey
//     );

//     console.log("Valid JWT");
//     console.log(payload);
//     console.log(protectedHeader);

// } catch (error) {
//     console.log("Invalid JWT");
// }