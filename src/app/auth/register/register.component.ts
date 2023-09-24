import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Registro, Usuario } from 'src/app/models/Registro';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  vistaActual:number=1;

  public registerForm:FormGroup=this.fb.group({
    nombre:['',[Validators.required]],
    apellido:['',[Validators.required]],
    fechaDeNacimiento:['',[Validators.required,this.fechaNacimientoValidator()]],
    dni:['',[Validators.required,Validators.pattern('^[0-9]{8}$')]],
    provincia:['',[Validators.required]],
    localidad:['',[Validators.required]],
    direccion:['',[Validators.required]],
    telefono:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    contraseña:['',[Validators.required]],
    contraseñaConfirmada:['',[Validators.required]],
  });

  fechaNacimientoValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fechaNacimiento = new Date(control.value);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      if (edad < 18) {
        return { edadMenorDe18: true }; 
      }
      return null; 
    };
  }

  constructor(private fb:FormBuilder, private service:RegisterService) {
  }

  continuar():void{
    const camposSeccion1=['nombre', 'apellido', 'fechaDeNacimiento',
    'dni','provincia','localidad','direccion','telefono'];
    if(this.vistaActual==1){
      for(const campo of camposSeccion1){
        this.registerForm.get(campo)?.markAsTouched();
      }
      const algunCampoInvalido = camposSeccion1.some((campo) => {
        const control = this.registerForm.get(campo);
        return control?.invalid;
      });
      if (algunCampoInvalido) {
        Swal.fire({title:'Por favor, complete los campos.'});
        return; 
      }
    }
    this.vistaActual=2;
  }

  anteriorVista():void{
    this.vistaActual=1;
  }

  register():void{

    const {
      nombre,
      apellido,
      fechaDeNacimiento,
      dni,
      provincia,
      localidad,
      direccion,
      telefono,
      email,
      contraseña,
      contraseñaConfirmada
    } = this.registerForm.value;

    const usuario = new Usuario(email, contraseña, contraseñaConfirmada);
    const registro=new Registro(dni,nombre,apellido,telefono,fechaDeNacimiento,direccion,
                                localidad+","+provincia,usuario);
    
    this.service.register(registro)
    .subscribe({
      next:(response)=>{
        //console.log(response);
        if(response.success){
          Swal.fire({
            title:"Registro exitoso",
            text:`Se ha registrado correctamente`,
            icon:'success'
          });
          }
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


  modalLink():void{
    Swal.fire({
      title: 'Ingresa el email a validar',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return this.service.sendValidation(email)
        .subscribe({
          next:(response)=>{
            if(response.success){
              Swal.fire({
                title:"Link enviado correctamente!",
                text:response.data,
                icon:'success'
              });
            }
          }
          ,error:(e)=>{
            Swal.fire({'title':e.mensaje,
            'icon':'error'});
          }
        })
      },
    })
  }

}
