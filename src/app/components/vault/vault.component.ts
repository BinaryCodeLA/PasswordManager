import { Component, Input, OnInit } from '@angular/core';
import gsap from "gsap"
import { NgToastService } from 'ng-angular-popup';
import { ClipboardService } from 'ngx-clipboard';
import { StorageDTO, StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.css']
})
export class VaultComponent implements OnInit {
  @Input() public searchpw: string = ''
  inputpwtype : string = 'password'
  inputUsertype : string = 'password'
  FilterData :StorageDTO[] = []
  DataListVault: StorageDTO[] = []
  uniqueCats : string[] = []
  TitleAccount: string = ""
  Account: string = ""
  UAccount: string = ""
  PAccount: string = ""
  IconAccount: string = ""
  IdAccount : Number = 0


  constructor(private _clipboardService: ClipboardService, 
              private storage: StorageService,
              private toast: NgToastService) { }

  ngOnInit(): void {
    let loginsection = document.getElementById('vaultcontainer')
    gsap.fromTo(loginsection, {opacity:0}, {opacity: 1, duration: 1.5})
    
    let toolbar = document.getElementsByTagName('app-tooltip')
    gsap.to(toolbar,{display:'block'})


   this.DataListVault = this.storage.getAllData()
   this.FilterData = this.DataListVault
   this.UniqueCategory()
  }
  onchange(search: string){
    if(search == "")
    this.DataListVault = this.FilterData.filter(x=> x.Id > 0)
    else
      this.DataListVault = this.FilterData.filter((x)=>String(x.Provider.toUpperCase()).includes(search.toLocaleUpperCase()))
  }
  onFilter(filter:string){
    if(filter != 'All')
       this.DataListVault = this.FilterData.filter(x=> x.Category == filter)
    else  
       this.DataListVault = this.FilterData.filter(x=> x.Id > 0)
  }

  onShowDetail(id: Number){
    let detailmodal = document.getElementById("detail-vault")
 
    let CurrentData = this.DataListVault.find(x=>x.Id == id) || undefined
    this.TitleAccount = CurrentData?.Provider || ""
    this.Account = CurrentData?.Account || ""
    this.UAccount = CurrentData?.UAccount || ""
    this.PAccount = CurrentData?.PAccount || ""
    this.IconAccount = CurrentData?.Icon || ""
    this.IdAccount = CurrentData?.Id || 0

    gsap.fromTo(detailmodal,{x:'-100%', display:'none'},{x:'0%', display:'block'})
  }
  onHideDetail(){
    let detailmodal = document.getElementById("detail-vault")
    this.PAccount = this.DataListVault.find(x=>x.Id == this.IdAccount)?.PAccount || ""
    gsap.fromTo(detailmodal,{x:'0%', display:'block'},{x:'-100%', display:'none'})
  }

  ShowPw(id1: string, id2: string) {
    let clickopeneye = document.getElementById(id1)
    let clickcloseye = document.getElementById(id2)
    
    if (this.inputpwtype == "text") {          
      gsap.to(clickcloseye, {
        display: 'none', onComplete: () => {   
          this.PAccount = this.DataListVault.find(x=>x.Id == this.IdAccount)?.PAccount || ""      
          this.inputpwtype = "password"
          gsap.to(clickopeneye, { display: "block" })
        }
      })
    } else { 
      this.PAccount = this.storage.ShowData(this.PAccount)  
      gsap.to(clickopeneye, {
        display: 'none', onComplete: () => {
          this.inputpwtype = "text"
          gsap.to(clickcloseye, { display: "block" })
        }
      })
    }
  }
  ShowUser(id1: string, id2: string) {
    let clickopeneye = document.getElementById(id1)
    let clickcloseye = document.getElementById(id2)
    if (this.inputUsertype == "text") {
      gsap.to(clickcloseye, {
        display: 'none', onComplete: () => {
          this.UAccount = this.DataListVault.find(x=>x.Id == this.IdAccount)?.UAccount || "" 
          this.inputUsertype = "password"
          gsap.to(clickopeneye, { display: "block" })
        }
      })
    } else {
      this.UAccount = this.storage.ShowData(this.UAccount) 
      gsap.to(clickopeneye, {
        display: 'none', onComplete: () => {
          this.inputUsertype = "text"
          gsap.to(clickcloseye, { display: "block" })
        }
      })
    }
  }
  OnCopy(value: string, type: string){
     let textResult = ""    
     let encryptedText = ""

     if(type == 'user')
       encryptedText = this.DataListVault.find(x=>x.Id == this.IdAccount)?.UAccount || ""
     if(type == 'pw')
       encryptedText = this.DataListVault.find(x=>x.Id == this.IdAccount)?.PAccount || ""

      let text = document.getElementById(value) as HTMLInputElement | null;

      if(encryptedText == text?.value){
        textResult = this.storage.ShowData(text?.value)  
      }else{
        textResult = text?.value || ""
      }
      this._clipboardService.copy(textResult)
      this.openSuccess()
  }

  openSuccess(){
    this.toast.success({detail:"Copy",summary:"Copied to clipboard",position:'bl', sticky:false,  duration:2000})
  }

  UniqueCategory(){
    for (let index = 0; index < this.DataListVault.length; index++) {
      const element = this.DataListVault[index];
      const isDuplicated = this.uniqueCats.includes(element.Category)
      if(!isDuplicated)
        this.uniqueCats.push(element.Category)      
    }
  }

}
