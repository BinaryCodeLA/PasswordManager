import { Component, Input, OnInit } from '@angular/core';
import gsap from "gsap"


@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.css']
})
export class VaultComponent implements OnInit {
  @Input() public searchpw: string = ''
  FilterData : number = 0
  constructor() { }

  ngOnInit(): void {
    let loginsection = document.getElementById('vaultcontainer')
    gsap.fromTo(loginsection, {opacity:0}, {opacity: 1, duration: 1.5})
    
    let toolbar = document.getElementsByTagName('app-tooltip')
    gsap.to(toolbar,{display:'block'})
  }
  onchange(search: string){
    this.searchpw = search
  }
  onFilter(filter:number){
    this.FilterData = filter
  }

}
