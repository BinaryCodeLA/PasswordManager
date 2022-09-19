import { Component, Input, OnInit } from '@angular/core';
import gsap from "gsap"
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() public mail: string = '';
  @Input() public password: string = '';

  @Input() public mailsign: string = '';
  @Input() public passwordsign: string = '';
  @Input() public passwordsign2: string = '';


  constructor(private Slogin: LoginService, private toast: NgToastService) { }

  ngOnInit(): void {
    let loginsection = document.getElementById('logincontainer')
    gsap.fromTo(loginsection, {opacity:0}, {opacity: 1, duration: 1.5})
  }
  onchange(mails: string, type: string = 'login'){
    if(type == 'login')
      this.mail = mails
    if (type == 'sign')
      this.mailsign = mails
  }
  onchangepw(pws: string, type: string = 'login'){
    if(type == 'login')
       this.password = pws
    if (type == 'sign')
        this.passwordsign = pws
  }
  onchangepw2(pws: string){   
        this.passwordsign2 = pws
  }
  showModal(id: string) {   
      let loginmodal = document.getElementById(id)
      gsap.fromTo(loginmodal,{x:'-100%', display:'none'},{x:'0%', display:'block'})
  }
  hideModal(id: string, type: string = 'login'){
    let loginmodal = document.getElementById(id)
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    
    if(type == 'login'){
        if(!expression.test(this.mail)){
          this.showMessage("Incorrect Email", "warnning")
          return
        }
        let LoginResult =  this.Slogin.login(this.mail,this.password)
        if(!LoginResult)
          return
          
        gsap.fromTo(loginmodal,{x:'0%', display:'block'},{x:'-100%', display:'none', onComplete:()=>{
         
        }})
      }
        

    if(type == 'sign'){
      if(this.passwordsign != this.passwordsign2){
        this.showMessage("Passwords do not match", "warnning")
        return
      }
      if(!expression.test(this.mailsign)){
        this.showMessage("Incorrect Email", "warnning")
        return
      }

      this.Slogin.signup(this.mailsign, this.passwordsign).then((result)=>{
        gsap.fromTo(loginmodal,{x:'0%', display:'block'},{x:'-100%', display:'none', onComplete:()=>{  
          this.showMessage("Signup Succesfully", "sucess") 
          this.showModal('loginmodal')    
        }})
      }).catch((error)=>{
        console.log("error signup: ", error)
        this.showMessage("Something was wrong, please try again", "warning")
      })
    }      
      
  }
  showMessage(message: string, type: string){
    if(type == 'sucess')
      this.toast.success({detail:"User",summary:message,position:'bl', sticky:false,  duration:2000})

    if(type == 'warnning')
    this.toast.warning({detail:"Validation",summary:message,position:'bl', sticky:false,  duration:2000})

  }
}
