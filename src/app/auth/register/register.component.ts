import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import Swal from 'sweetalert2';
import { Registro, Usuario } from 'src/app/models/Registro';
import { fechaNacimientoValidator, passwordMatchValidator } from 'src/app/backoffice/validators/validators';
import { Router } from '@angular/router';

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
    fechaDeNacimiento:['',[Validators.required,fechaNacimientoValidator]],
    dni:['',[Validators.required,Validators.pattern('^[0-9]{8}$')]],
    provincia:['',[Validators.required]],
    localidad:['',[Validators.required]],
    direccion:['',[Validators.required]],
    telefono:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    contraseña:['',[Validators.required]],
    contraseñaConfirmada:['',[Validators.required]],
  },{
    validators:[passwordMatchValidator]
  });

  constructor(private fb:FormBuilder, 
    private service:RegisterService,
    private router:Router) {
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
