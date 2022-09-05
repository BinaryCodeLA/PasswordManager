import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }

 public login(mail:string, pw: string) {
    let id = 1
    if(mail == "admin@admin.com" && pw=="admin")
        this.router.navigate([`vault/${id}`])
    else
      this.router.navigate(["login"])
  }
}
