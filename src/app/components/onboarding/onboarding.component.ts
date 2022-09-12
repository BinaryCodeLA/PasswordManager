import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import gsap from "gsap"


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
  title: string = 'vpassword'
  constructor(private router: Router) { }

  ngOnInit(): void {
    let logo = document.getElementById("logomain")
    gsap.fromTo(logo,{duration:0.5, scale:1, opacity:0, delay:0.3},{scale:1.3,opacity:1,duration:1.5})
    setTimeout(()=>{
      if(sessionStorage.getItem('idtokensuccess') != null && sessionStorage.getItem('idtokensuccess') != undefined){
        let id = sessionStorage.getItem('idtokensuccess')
        this.router.navigate([`vault/${id}`])
      }else
        this.router.navigate(["login"])
    },5000)
  }

}
