import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private storage: StorageService, private toast: NgToastService) { }

 public login(mail:string, pw: string) {
    let LoginResult = false;
    const User = new Object({mail: mail, password: pw})
    this.storage.getUser(User).then((result:any)=>{

      if(!result){
        this.router.navigate(['login'])
        this.showMessage("Invalid email", "warnning")
        LoginResult = false
        return
      }
      if(!result.isPWvalidated){
        this.router.navigate(['login'])
        this.showMessage("Invalid password", "warnning")
        LoginResult = false
        return 
      }
      this.showMessage("Login Successfully", "success")
      sessionStorage.setItem('idtokensuccess',result.Id.toString())
      this.router.navigate([`vault/${result.Id}`])

      this.storage.SnapItems.unsubscribe()
      LoginResult = true

    }).catch((error)=>{
      console.log('login: ', error)
      this.showMessage("Invalid email", "warnning")
      this.router.navigate(['login'])
      LoginResult = false
    })
    return LoginResult
   
  }
  public signup(mail:string, password: string){
    return new Promise((resolve, reject)=>{
      const User = new Object({
        Mail: mail,
        Password: password
      })

      this.storage.AddUser(User).then((resp)=>{
        resolve(true)
      }).catch((error)=>{
        console.log("firebase error: ", error)
        reject(false)
      })
    })
  }
  showMessage(message: string, type: string){
    if(type == 'success')
      this.toast.success({detail:"Validation",summary:message,position:'bl', sticky:false,  duration:2000})

    if(type == 'warnning')
    this.toast.warning({detail:"Validation",summary:message,position:'bl', sticky:false,  duration:2000})

  }
}
