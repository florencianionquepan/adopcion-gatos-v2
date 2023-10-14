import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fechaNacimientoValidator, passwordMatchValidator } from '../../validators/validators';
import { User } from 'src/app/models/user';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from 'src/app/models/Persona';

@Component({
  selector: 'app-mi-perfil-page',
  templateUrl: './mi-perfil-page.component.html',
  styleUrls: ['./mi-perfil-page.component.css']
})
export class MiPerfilPageComponent {
  user:User=new User();
  persona:Persona=new Persona();

  constructor(private fb:FormBuilder, private service:PersonaService){
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }
  }

  ngOnInit(){
    this.service.obtenerDatos(this.user.email).subscribe(
      data=>{
        //console.log(data);
        this.persona=data;
        this.saveForm();
        console.log(this.perfilForm);
      }
    )
  }

  public perfilForm:FormGroup=this.fb.group({
    nombre:['',[Validators.required]],
    apellido:['',[Validators.required]],
    fechaDeNacimiento:['',[Validators.required,fechaNacimientoValidator]],
    dni:['',[Validators.required,Validators.pattern('^[0-9]{8}$')]],
    provincia:['',[Validators.required]],
    localidad:['',[Validators.required]],
    direccion:['',[Validators.required]],
    telefono:['',[Validators.required]],
  });

  private saveForm():void{
    let localidad=this.persona.localidad.split(',');
    this.perfilForm.patchValue({
      nombre: this.persona.nombre,
      apellido: this.persona.apellido,
      fechaDeNacimiento: this.persona.fechaNac,
      dni: this.persona.dni,
      localidad: localidad[0],
      provincia: localidad[1],
      telefono: this.persona.tel,
      direccion: this.persona.dire,
    })
  }

  actualizar(){
    console.log(this.perfilForm);
  }

}
