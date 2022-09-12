import { Injectable } from '@angular/core';
import * as data from './provide_folder/encryptdata.json' 
import { SecurityhashService } from './securityhash.service';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  listData = (data as any).default
  listEncryptData: StorageDTO[] = []
  DataItem: StorageDTO | undefined
  constructor(private securityhash: SecurityhashService) {
      
   }

  getAllData() {  
   /* this.listData.forEach((element:any) => {
      console.log("Id: ", element.id)
      let Provider = this.securityhash.encrypt(element.Provider)
      console.log("Provider: ", Provider)
      let Account =  this.securityhash.encrypt(element.Account) 
      console.log("Account: ", Account)      
      let Category = this.securityhash.encrypt(element.Category)
      console.log("Category: ", Category)      
      let UAccount = this.securityhash.encrypt(element.UAccount)
      console.log("UAccount: ", UAccount)
      let PAccount = this.securityhash.encrypt(element.PAccount) 
      console.log("PAccount: ", PAccount)
     
   })*/

    this.listData.forEach((element:any) => {
        let Provider = this.securityhash.decrypt(element.Provider)
        let Account =  this.securityhash.decrypt(element.Account)        
        let Category = this.securityhash.decrypt(element.Category)      
        // let UAccount = this.securityhash.decrypt(element.UAccount)
        // let PAccount = this.securityhash.decrypt(element.PAccount) 
        let icon = IconData.find(x=>x.id == element.idIcon)?.icon || "fa fa-user-circle"
        this.listEncryptData.push({
          Id: element.id,
          Provider: Provider,
          Account: Account,
          UAccount: element.UAccount,
          PAccount: element.PAccount,
          Category: Category,
          Icon:icon
        })
     })
  return this.listEncryptData
  }

  ShowData(value: string){
    return this.securityhash.decrypt(value)
  }

}


export interface StorageDTO {
  Id: Number,
  Provider: string,
  Account: string,
  UAccount: string,
  PAccount: string,
  Category: string,
  Icon:string
}

export const IconData = [
   {id:1, icon:"fa fa-user-circle"}
  ,{id:2, icon:"fa fa-twitter-square"}
  ,{id:3, icon:"fa fa-facebook-official"}
  ,{id:4, icon:"fa fa-github"}
  ,{id:5, icon:"fa fa-linkedin-square"}
  ,{id:6, icon:"fa fa-google"}
  ,{id:7, icon:"fa fa-github"}
  ,{id:8, icon:"fa fa-paypal"}
  ,{id:9, icon:"fa fa-cloud"}
  ,{id:10, icon:"fa fa-credit-card"}
]