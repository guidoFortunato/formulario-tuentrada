import CryptoJS from "crypto-js";

export const dataDecrypt = (value)=>{
  const bytes = CryptoJS.AES.decrypt(value, "/dPd!f~z>rrbw#eCR2I]^<Q1Wu-%uK").toString(CryptoJS.enc.Utf8)
  return JSON.parse(bytes)
}