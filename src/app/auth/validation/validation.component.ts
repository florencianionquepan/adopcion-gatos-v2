import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent {
  public id:number;
  public token:string;

  constructor(private router:ActivatedRoute){
    this.id=this.router.snapshot.params['id'];
    this.token=this.router.snapshot.params['token'];
  }
}
