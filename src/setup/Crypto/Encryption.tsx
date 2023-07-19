import CryptoJS from 'crypto-js'

const keyValue:any = process.env.REACT_APP_encryptionKey
const privateKeyValue:any = process.env.REACT_APP_encryptionPrivateKey

export function Encode(ourText:string) {
    try {
      const _key = CryptoJS.enc.Utf8.parse(keyValue);
      const privatekey = CryptoJS.enc.Utf8.parse(privateKeyValue);
      const encryptedData = CryptoJS.DES.encrypt(ourText, _key, { iv: privatekey }).toString();
  
      return encryptedData;
    } catch (ex:any) {
      return ex.message;
    }
}