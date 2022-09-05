import { Component, Input, OnInit } from '@angular/core';
import gsap from "gsap"
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() public mail: string = '';
  @Input() public password: string = '';
  constructor(private Slogin: LoginService) { }

  ngOnInit(): void {
    let loginsection = document.getElementById('logincontainer')
    gsap.fromTo(loginsection, {opacity:0}, {opacity: 1, duration: 1.5})
  }
  onchange(mails: string){
    this.mail = mails
  }
  onchangepw(pws: string){
    this.password = pws
  }
  showModal() {   
      let loginmodal = document.getElementById("loginmodal")
      gsap.fromTo(loginmodal,{x:'-100%', display:'none'},{x:'0%', display:'block'})
  }
  hideModal(){
    let loginmodal = document.getElementById("loginmodal")

      gsap.fromTo(loginmodal,{x:'0%', display:'block'},{x:'-100%', display:'none', onComplete:()=>{
        this.Slogin.login(this.mail,this.password)
      }})
      
  }
}
