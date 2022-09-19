import { Injectable } from '@angular/core';
import * as data from '../provide_folder/encryptdata.json' 
import { SecurityhashService } from '../securityhash/securityhash.service';
import {v4 as uuid} from "uuid"
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  listData = (data as any).default
  listEncryptData: StorageDTO[] = []
  listDecryptUser!: UserDTO
  DataItem: StorageDTO | undefined
  FireStoreValues: any
  items!:  AngularFirestoreCollection<any>
  SnapItems: any
  SnapItemsValidation: any
  constructor(private securityhash: SecurityhashService, private firestore: AngularFirestore) {
  
   }
   AddCredentials(cred:any ) {
   
    return new Promise( (resolve, reject)=>{
     
     const docId = uuid()
     let Provider =  this.securityhash.encrypt(cred.Provider) 
    let Account =   this.securityhash.encrypt(cred.Account)    
    let Category =  this.securityhash.encrypt(cred.Category)   
    let UAccount =  this.securityhash.encrypt(cred.UAccount)
    let PAccount =  this.securityhash.encrypt(cred.PAccount) 

      this.firestore.collection('creds-list').doc(docId).set({
        Id: docId,
        Provider: Provider,
        Account: Account,
        UAccount: UAccount,
        PAccount: PAccount,
        Category: Category,
        Icon: cred.Icon,
        UserId: cred.UserId
      }).then((x)=>{        
        resolve(true)
      }).catch((err)=>{
        console.log("error firebase: ", err)
        reject(false)
      })
     
    })
    
  }
 
 GetList(userId: string) {
 return new Promise((resolve,reject)=>{
  this.getAllData(userId).then((data)=>{
    if(this.SnapItems != undefined)
       this.SnapItems.unsubscribe()
    resolve(data)
  }).catch((error)=>{
    console.log("error: ", error)
    reject([])
  })
  
 })
 
}
  getAllData(userId: string) {  
   return new Promise((resolve, reject)=>{
  this.getUserValidate(userId).then((result)=>{    
    if(!result){
      this.SnapItemsValidation.unsubscribe()
      resolve(false)
      return
    }
    this.items = this.firestore.collection('creds-list', ref=> ref.where("UserId", "==", userId))
    this.SnapItems = this.items.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data()
          const Id = data.Id
          const UserId = data.UserId
          const Provider = data.Provider
          const Account = data.Account
          const UAccount = data.UAccount
          const PAccount = data.PAccount
          const Category = data.Category
          const Icon = data.Icon
          return {Id,UserId, Provider, Account, UAccount, PAccount, Category, Icon}
        })
        )
    ).subscribe( data => {
      if(data.length > 0){
      data.forEach( (element:any) => {
        let Provider =  this.securityhash.decrypt(element.Provider)
        let Account =   this.securityhash.decrypt(element.Account) 
        let Category =  this.securityhash.decrypt(element.Category) 
        //  let UAccount = this.securityhash.decrypt(element.UAccount)
        //  let PAccount = this.securityhash.decrypt(element.PAccount) 
        let icon = IconData.find(x=>x.id == element.Icon)?.icon || "fa fa-user-circle"
        this.listEncryptData.push({
          Id: element.Id,
          Provider: Provider,
          Account: Account,
          UAccount: element.UAccount,
          PAccount: element.PAccount,
          Category: Category,
          Icon:icon,
          UserId: element.UserId
        })
      });
    }
      resolve(this.listEncryptData);
    })
  }).catch((error)=>{
    console.log("error: ", error)
    this.SnapItemsValidation.unsubscribe()
    resolve(false)
    return
  })
  
   
    
   })


  }

   ShowData(value: string){
    return  this.securityhash.decrypt(value)
  }

  AddUser(user:any ) {
   
    return new Promise( (resolve, reject)=>{
     
     const docId = uuid()
     let UserMail =  this.securityhash.encrypt(user.Mail) 
    let Password =   this.securityhash.encrypt(user.Password)     

      this.firestore.collection('users-list').doc(docId).set({
        Id: docId,
        UserMail: UserMail,
        Password: Password
      }).then((x)=>{        
        resolve(true)
      }).catch((err)=>{
        console.log("error firebase: ", err)
        reject(false)
      })
     
    })
    
  }

  getUser(user: any) {  
    return new Promise((resolve, reject)=>{
      let mail = this.securityhash.encrypt(user.mail)
     this.items = this.firestore.collection('users-list', ref=> ref.where("UserMail", "==",mail))
     this.SnapItems = this.items.snapshotChanges().pipe(
       map(actions => 
         actions.map(a => {
           const data = a.payload.doc.data()
           const UserMail = data.UserMail
           const Password = data.Password
           const UserId = data.Id           
           return {UserId, UserMail, Password}
         })
         )
     ).subscribe( data => {
      console.log("data user: ", data)
      if(data.length > 0){
      let Id = data[0].UserId
      let Password = data[0].Password
      let UserMail = data[0].UserMail
      let isPWvalidated = this.PasswordValidate(Password, this.securityhash.encrypt(user.password))      
      
        resolve({
          Id, Password, UserMail, isPWvalidated
        });
      }else [
        reject(false)
      ]
     })
   

    })
 
 
   }

PasswordValidate(pw1: string, pw2: string):boolean{
  if(pw1 == pw2) return true
  else return false
}

getUserValidate(Id: string) {  
  return new Promise((resolve, reject)=>{   
   this.items = this.firestore.collection('users-list', ref=> ref.where("Id", "==",Id))
   this.SnapItemsValidation = this.items.snapshotChanges().pipe(
     map(actions => 
       actions.map(a => {
         const data = a.payload.doc.data()
         const UserId = data.Id        
         return {UserId}
       })
       )
   ).subscribe( data => {    
    if(data.length > 0){
    if(data[0].UserId === sessionStorage.getItem('idtokensuccess'))    
      resolve(true);
    else  
      resolve(false)
    }else {
      resolve(false)
    }
   })
 

  })

 }

}




export interface StorageDTO {
  Id: string,
  UserId:string,
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

export interface UserDTO {
  Id: string,
  UserMail: string,
  Password: string
}