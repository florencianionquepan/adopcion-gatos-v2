import { Component, OnInit } from '@angular/core';
import { Cat } from 'src/app/models/cat';
import { CatServiceService } from 'src/app/services/cat-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{
  public cats:Cat[]=[];

  constructor(private gatoSvc: CatServiceService){
    this.gatoSvc.verGatos().subscribe(cats=>{
      this.cats=cats;
    })
  }
}
