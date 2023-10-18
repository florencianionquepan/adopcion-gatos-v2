import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import Swal from 'sweetalert2';
import { Registro, Usuario } from 'src/app/models/Registro';
import { passwordMatchValidator } from 'src/app/backoffice/validators/validators';
import { Router } from '@angular/router';
import { PersonaFormComponent } from 'src/app/shared/components/persona-form/persona-form.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  vistaActual:number=1;
  @ViewChild(PersonaFormComponent) personaFormComponent!: PersonaFormComponent;

  registerForm=new FormGroup({
    personaData: new FormControl({
      nombre:'',
      apellido:'',
      fechaDeNacimiento:new Date(),
      dni:'',
      provincia:'',
      localidad:'',
      direccion:'',
      telefono:'',
    }),
    email:new FormControl('',[Validators.required,Validators.email]),
    contraseña:new FormControl('',Validators.required),
    contraseñaConfirmada:new FormControl('',Validators.required)
  },
  {validators:[passwordMatchValidator]}
  );

  constructor(private service:RegisterService,
    private router:Router) {
  }

  ngOnInit(){

  }

  continuar():void{
    const personaData=this.registerForm.get('personaData');
    console.log(personaData);
    if(personaData?.invalid){
      this.personaFormComponent.marcarCamposComoTouched();
      Swal.fire({ title: 'Por favor, complete los campos.' });
      return;
    }
    this.vistaActual=2;
  }

  anteriorVista():void{
    this.vistaActual=1;
  }

  register():void{
    const formData=this.registerForm.value;
    if(formData && formData.personaData){
      const {
          nombre,
          apellido,
          fechaDeNacimiento,
          dni,
          provincia,
          localidad,
          direccion,
          telefono,
      } = formData.personaData;
      const email = formData.email;
      const contraseña = formData.contraseña;
      const contraseñaConfirmada = formData.contraseñaConfirmada;
      const usuario = new Usuario(email!, contraseña!, contraseñaConfirmada!);
      const registro=new Registro(dni,nombre,apellido,telefono,fechaDeNacimiento,direccion,
                                  localidad+","+provincia,usuario);
    console.log(registro);
    this.service.register(registro).subscribe({
      next:(response)=>{
        //console.log(response);
        if(response.success){
          Swal.fire({
            title:"Registro exitoso",
            text:`Debe validar su email para iniciar sesion`,
            icon:'success',
            timer:1500
          });
          }
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        }
      ,error:(e)=>{
        let errorDetail='';
        if(e.detalle){
          errorDetail = Object.keys(e.detalle).map((key) => {
            return `${key}: ${e.detalle[key]}`;
          }).join('\n')
        };
        Swal.fire({'title':e.mensaje,
                  'text':errorDetail});
      }
    })
    }
  }

}
