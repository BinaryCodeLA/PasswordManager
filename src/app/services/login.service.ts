import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {v4 as uuid} from "uuid"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }

 public login(mail:string, pw: string) {
    let id = uuid()
    if(mail == "BinaryCode" && pw=="Securityfirst2022"){
        sessionStorage.setItem('idtokensuccess',id.toString())
        this.router.navigate([`vault/${id}`])
    }
    else
      this.router.navigate(["login"])
  }
}
