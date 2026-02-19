import crypto from 'crypto';
import { ENC_BYTE } from '../../../../config/config.service.js';
console.log(ENC_BYTE.length);

const IV_LENGTH =16 ;
const ENCRYPTION_SECRET_KEY = Buffer.from(ENC_BYTE)
const algorithm = 'aes-256-cbc';
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);

export const encrypt = async (text) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    console.log({ENCRYPTION_SECRET_KEY,iv});
    

  const cipher = crypto.createCipheriv(algorithm, ENCRYPTION_SECRET_KEY, iv);
  let encryptedDate = cipher.update(text, 'utf8', 'hex');
  encryptedDate += cipher.final('hex');
  console.log(encryptedDate);
  
//   return encrypted;
return `${iv.toString('hex')}:${encryptedDate}`;           /// space interested
};

export const decrypt = async (encryptedDate) => {
//   const decipher = crypto.createDecipheriv(algorithm, key, iv);
const [iv, encryptedText] = encryptedDate.split(":");
const binaryLikeIv = Buffer.from(iv,'hex');
const decipher = crypto.createDecipheriv('aes-256-cbc',ENCRYPTION_SECRET_KEY,binaryLikeIv);
 console.log({decipher});
 
  let decryptedData = decipher.update(encryptedText,'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
};
const run = async () => {
  const enc = await encrypt("omar");
  console.log("Encrypted:", enc);

  const dec = await decrypt(enc);
  console.log("Decrypted:", dec);
};

run();