import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { Cat } from 'src/app/models/cat';

@Component({
  selector: 'app-form-adoption',
  templateUrl: './form-adoption.component.html',
  styleUrls: ['./form-adoption.component.css']
})
export class FormAdoptionComponent implements OnInit {
  @Input() cat:Cat
  public sendForm!:FormGroup;
  submitted=false;

  constructor(private formBuider:FormBuilder){
    this.cat={id:0,nombre:"","srcFoto":[],"edad":"","sexo":"","descripcion":"","raza":"",
    "color":"","tipoPelo":"","esterilizacion":false,"desparasitacion":false,"solicitantes":[]}
  
  }

  ngOnInit(): void {
    this.sendForm=this.formBuider.group(
      {
        nombre:["",[Validators.required, Validators.minLength(4)]],
        apellido:["",[Validators.required]],
        dni:["",[Validators.required]],
        fechaNac:["",[Validators.required]],
        telefono:["", [Validators.required]],
        email:["",[Validators.required]],
        domicilio:["", [Validators.required]],
        localidad:["", [Validators.required]]
      }
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.sendForm.controls;
  }

  public sendApplication():void{
    this.submitted = true;

    if (this.sendForm.invalid) {
      return;
    }
  }

  public onReset():void{
    this.submitted = false;
    this.sendForm.reset();
  }

}
