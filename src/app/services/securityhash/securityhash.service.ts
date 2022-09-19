import { Injectable, NgModule } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SecurityhashService {
  key = CryptoJS.SHA256(environment.hahskey) // hashing the key using SHA256
  iv = CryptoJS.enc.Base64.parse(environment.vectorInit) //giving empty initialization vector
  encryptedString: any
  decrypted: any
  constructor() { }

  encrypt =  (data: string) => {
    if(typeof data == "string" ){
      data = data.slice()
      this.encryptedString =  CryptoJS.AES.encrypt(data,this.key, {
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
    } else {
      this.encryptedString =  CryptoJS.AES.encrypt(JSON.stringify(data), this.key, {
        iv:this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
    } 
    return this.encryptedString.toString()
  }

  decrypt =  (hash: string) => {
   
    if(hash.length > 0){
        this.decrypted =  CryptoJS.AES.decrypt(hash, this.key, {
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        })
    }else{
      this.decrypted = null
    }
   return this.decrypted.toString(CryptoJS.enc.Utf8)
  }
  
}
