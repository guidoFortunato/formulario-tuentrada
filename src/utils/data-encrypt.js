import CryptoJS from "crypto-js";

export const dataEncrypt = (value) => {
return CryptoJS.AES.encrypt(JSON.stringify(value),"/dPd!f~z>rrbw#eCR2I]^<Q1Wu-%uK").toString();
}