import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import gsap from "gsap"

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
  idVault?: string
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {    
    this.idVault = this.route.snapshot.paramMap.get('id') || ""
  }

  goToVault(){
    if(sessionStorage.getItem('idtokensuccess') != undefined && sessionStorage.getItem('idtokensuccess') != null)
        this.router.navigate([`vault/${this.idVault}`])
    else 
        this.router.navigate(['login'])
  }
  onShowDetailInsert(){
    let detailmodal = document.getElementById("detail-vault-save")

    gsap.fromTo(detailmodal,{x:'-100%', display:'none'},{x:'0%', display:'block'})
  }
}
