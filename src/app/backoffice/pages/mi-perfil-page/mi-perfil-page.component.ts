import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from 'src/app/models/Persona';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-mi-perfil-page',
  templateUrl: './mi-perfil-page.component.html',
  styleUrls: ['./mi-perfil-page.component.css']
})
export class MiPerfilPageComponent {
  user:User=new User();
  persona:Persona=new Persona();
  esTransito:boolean=false;
  esPadrino:boolean=false;
  esVoluntario:boolean=false;

  constructor(private fb:FormBuilder, 
    private service:PersonaService,
    private authService:AuthService){
    this.user=this.authService.getUser();
    this.esPadrino=this.user.esPadrino;
    this.esTransito=this.user.esTransito;
    this.esVoluntario=this.user.roles.some(rol=>rol.nombre=='ROLE_VOLUNTARIO');
  }

  ngOnInit(){
    this.service.obtenerDatos(this.user.email).subscribe(
      data=>{
        //console.log(data);
        this.persona=data;
        this.saveForm();
      }
    )
  }

  public perfilForm =new FormGroup({
    personaData: new FormControl({
      nombre: this.persona.nombre,
      apellido: this.persona.apellido,
      fechaDeNacimiento: this.persona.fechaNac,
      dni: this.persona.dni,
      localidad: this.persona.localidad.split(',')[0],
      provincia: this.persona.localidad.split(',')[1],
      telefono: this.persona.tel,
      direccion: this.persona.dire,
    })
  });

  private saveForm():void{
    let localidad=this.persona.localidad.split(',');
     this.perfilForm.patchValue({
      personaData:({
        nombre: this.persona.nombre,
        apellido: this.persona.apellido,
        fechaDeNacimiento: this.persona.fechaNac,
        dni: this.persona.dni,
        localidad: localidad[0],
        provincia: localidad[1],
        telefono: this.persona.tel,
        direccion: this.persona.dire,
      })
    }) 
  }

  actualizar(){
    //validacion por si no hay datos sin tocarlo
    const personaData = this.perfilForm.get('personaData')?.value;
    if(personaData){
      const {nombre,apellido,fechaDeNacimiento,dni,localidad,
        provincia,telefono,direccion}=personaData;
      let localidadTotal=`${localidad},${provincia}`;
      let personaModi=new Persona(this.persona.id,dni,nombre,apellido,
        telefono,this.user.email,fechaDeNacimiento,direccion,localidadTotal);
      this.service.actualizarDatos(personaModi, this.persona.id).subscribe(
        data=>{
          Swal.fire({icon:'success',title:'Datos actualizados!'});
        }
      )
    }
  } 

}
