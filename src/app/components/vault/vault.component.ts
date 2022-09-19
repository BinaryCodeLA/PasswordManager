import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import gsap from "gsap"
import { NgToastService } from 'ng-angular-popup';
import { ClipboardService } from 'ngx-clipboard';
import { StorageDTO, StorageService } from 'src/app/services/storage/storage.service';


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
  IdAccount : string = ""
  userId: string = ""
  private cred!:any

  constructor(private _clipboardService: ClipboardService, 
              private storage: StorageService,
              private toast: NgToastService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let loginsection = document.getElementById('vaultcontainer')
    gsap.fromTo(loginsection, {opacity:0}, {opacity: 1, duration: 1.5})
    
    let toolbar = document.getElementsByTagName('app-tooltip')
    gsap.to(toolbar,{display:'block'})   
   this.userId = this.activatedRoute.snapshot.params['id'] 
   this. DataCred() 
  }

  DataCred(){
    this.storage.GetList(this.userId).then((data:any)=>{   
      if(data.length > 0) {
      data.forEach((element:any) => {
        this.DataListVault.push({
          Provider: element.Provider,
          Account: element.Account,
          UAccount: element.UAccount,
          PAccount: element.PAccount,
          Category: element.Category,
          Icon: element.Icon,
          UserId: element.UserId,
          Id: element.Id
        })
      })
    }
      this.FilterData = this.DataListVault
     this.UniqueCategory()
     
    })
  }

  onchange(search: string){
    if(search == "")
    this.DataListVault = this.FilterData.filter(x=> x.Id != "")
    else
      this.DataListVault = this.FilterData.filter((x)=>String(x.Provider.toUpperCase()).includes(search.toLocaleUpperCase()))
  }
  onFilter(filter:string){
    if(filter != 'All')
       this.DataListVault = this.FilterData.filter(x=> x.Category == filter)
    else  
       this.DataListVault = this.FilterData.filter(x=> x.Id != '')
  }

  onShowDetail(id: string){
    let detailmodal = document.getElementById("detail-vault")
 
    let CurrentData = this.DataListVault.find((x:any)=>x.Id == id) || undefined
    this.TitleAccount = CurrentData?.Provider || ""
    this.Account = CurrentData?.Account || ""
    this.UAccount = CurrentData?.UAccount || ""
    this.PAccount = CurrentData?.PAccount || ""
    this.IconAccount = CurrentData?.Icon || ""
    this.IdAccount = CurrentData?.Id || ""

    gsap.fromTo(detailmodal,{x:'-100%', display:'none'},{x:'0%', display:'block'})
  }
  onHideDetail(){
    let detailmodal = document.getElementById("detail-vault")
    this.PAccount = this.DataListVault.find((x:any)=>x.Id == this.IdAccount)?.PAccount || ""
    gsap.fromTo(detailmodal,{x:'0%', display:'block'},{x:'-100%', display:'none'})
  }
  onHideDetailInsert(){
    let detailmodal = document.getElementById("detail-vault-save")
    this.PAccount = this.DataListVault.find((x:any)=>x.Id == this.IdAccount)?.PAccount || ""
    gsap.fromTo(detailmodal,{x:'0%', display:'block'},{x:'-100%', display:'none'})
  }
  onShowDetailInsert(){
    let detailmodal = document.getElementById("detail-vault-save")

    gsap.fromTo(detailmodal,{x:'-100%', display:'none'},{x:'0%', display:'block'})
  }

  ShowPw(id1: string, id2: string) {
    let clickopeneye = document.getElementById(id1)
    let clickcloseye = document.getElementById(id2)
    
    if (this.inputpwtype == "text") {          
      gsap.to(clickcloseye, {
        display: 'none', onComplete: () => {   
          this.PAccount = this.DataListVault.find((x:any)=>x.Id == this.IdAccount)?.PAccount || ""      
          this.inputpwtype = "password"
          gsap.to(clickopeneye, { display: "block" })
        }
      })
    } else { 
      this.PAccount =  this.storage.ShowData(this.PAccount)  
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
    this.UAccount = this.DataListVault.find((x:any)=>x.Id == this.IdAccount)?.UAccount || "" 
    if (this.inputUsertype == "text") {
      gsap.to(clickcloseye, {
        display: 'none', onComplete: () => {
          
          this.inputUsertype = "password"
          gsap.to(clickopeneye, { display: "block" })
        }
      })
    } else {
      this.UAccount =  this.storage.ShowData(this.UAccount) 
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
       encryptedText = this.DataListVault.find((x:any)=>x.Id == this.IdAccount)?.UAccount || ""
     if(type == 'pw')
       encryptedText = this.DataListVault.find((x:any)=>x.Id == this.IdAccount)?.PAccount || ""

      let text = document.getElementById(value) as HTMLInputElement | null;

      if(encryptedText == text?.value){
        textResult =  this.storage.ShowData(text?.value)  
      }else{
        textResult = text?.value || ""
      }
      this._clipboardService.copy(textResult)
      this.openSuccess()
  }

  openSuccess(){
    this.toast.success({detail:"Copy",summary:"Copied to clipboard",position:'bl', sticky:false,  duration:2000})
  }
  openWarnning(){
    this.toast.warning({detail:"Validation",summary:"All fields are required",position:'bl', sticky:false,  duration:2000})
  }
  openSave(){
    this.toast.success({detail:"VPassword",summary:"Credentials has been saved",position:'bl', sticky:false,  duration:2000})
  }

  UniqueCategory(){
    for (let index = 0; index < this.DataListVault.length; index++) {
      const element = this.DataListVault[index];
      const isDuplicated = this.uniqueCats.includes(element.Category)
      if(!isDuplicated)
        this.uniqueCats.push(element.Category)      
    }
  }

  saveCred(){
    let provider = document.getElementById("input-provider-insert") as HTMLInputElement | null
    let account = document.getElementById("input-account-insert") as HTMLInputElement | null
    let username = document.getElementById("input-username-insert") as HTMLInputElement | null
    let pw = document.getElementById("input-pw-insert") as HTMLInputElement | null

    console.log(provider?.value, account?.value, username?.value, pw?.value)

    if((provider?.value == null || provider?.value =="") || ( account?.value == null ||  account?.value=="" ) || 
      (username?.value == null || username?.value == "" ) || (pw?.value == null || pw?.value == "")){
      this.openWarnning()
      return
    }
   
   this.cred = new Object({
    UserId: this.userId,
    Provider: provider.value,
    Account: account.value,
    UAccount: username.value,
    PAccount: pw.value,
    Category: "Others",
    Icon:"1"
   })
   this.storage.AddCredentials(this.cred).then((x)=>{
      this.openSave()
      this. DataCred() 
      
   }).catch((x)=>{
    console.log("X: ", x)
   })

  }
}
