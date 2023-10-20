import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GatoDetalle } from 'src/app/models/GatoDetalle';
import { Voluntario } from 'src/app/models/Voluntario';
import { User } from 'src/app/models/user';
import { GatosService } from 'src/app/services/gatos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-gato',
  templateUrl: './form-gato.component.html',
  styleUrls: ['./form-gato.component.css']
})
export class FormGatoComponent {
  @Input() mostrarForm:boolean=false;
  @Output() mostrarFormChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() gato:GatoDetalle=new GatoDetalle();
  public metodo:string='post';

  public files:File[]=[]; //los archivos seleccionados
  @ViewChild('inputFiles', { static: false }) inputFiles!: ElementRef;
  public urls:string[]=[]; //las urls de las imagenes en post
  public urlsEdit:string[]=[]; //las urls de las imagenes en put
  public url:File | undefined;

  user=new User();

  constructor(private fb:FormBuilder, 
    private service:GatosService, 
    private router: Router,
    private ruta: ActivatedRoute) {
  }

  ngOnInit(){
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['gato'] && !changes['gato'].firstChange){
      this.metodo='put';
      this.saveForm();
    }
  }

  public gatoForm:FormGroup=this.fb.group({
    nombre:['',[Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    edadnumero:['',Validators.required],
    edadtexto:['Meses',Validators.required],
    sexo:['',[Validators.required,Validators.pattern('^[A-Za-z]+$')]],
    descripcion:['',[Validators.required]],
    color:['',[Validators.required]],
    tipoPelo:['',[Validators.required,Validators.pattern('^[A-Za-z ]+$')]],
    montoMensual:['',[Validators.min(0)]],
    files:['',]
  });

  private saveForm():void{
    //console.log(this.gato);
    let edadnumero=this.gato.edad.split(' ')[0];
    let edadtexto=this.gato.edad.split(' ')[1];
    this.gatoForm.patchValue({
      nombre: this.gato.nombre,
      edadnumero: edadnumero,
      edadtexto:edadtexto,
      sexo: this.gato.sexo,
      descripcion: this.gato.descripcion,
      color: this.gato.color,
      tipoPelo: this.gato.tipoPelo,
      montoMensual: this.gato.montoMensual,
      fotos: this.gato.fotos
    })
    this.urlsEdit = this.gato.fotos !== null ? this.gato.fotos : [];
    const inputFile=this.gatoForm.controls['files'];
    if(this.metodo=='put' && this.urlsEdit.length>0){
      inputFile.setErrors(null);
    }
  }

  onFileChange(event:any):void{
    this.files=event.target.files;
    Array.from(this.files).forEach((file:File)=>{
      const fr= new FileReader();
      fr.onload=(evento:any)=>{
        const dataUrl=evento.target.result;
        this.urls.push(dataUrl);
      };
      fr.readAsDataURL(file);
    });
    //console.log(this.inputFiles.nativeElement);
  }

  onInputChange():void{
    const inputFile=this.gatoForm.controls['files'];
    if(this.metodo=='post' || this.metodo=='put' && this.urlsEdit.length==0){
      //console.log(this.urls);
      //console.log(this.files);
      if(this.urls.length==0){
        //inputFile.setErrors({ required: true });
        inputFile.markAsTouched();
      }
      //inputFile.setValue(this.urls.length>0?this.urls[0]:'');
    }
    if(this.metodo=='put' && this.urlsEdit.length>0){
      inputFile.setErrors(null);
    }
  }

  delete(i:number):void{
    if (i >= 0 && i< this.urls.length) {
      this.urls.splice(i, 1); 
      // Crear un nuevo array sin el elemento eliminado en this.fotos
      const newFotos: File[]  = Array.from(this.files).filter((_, index) => index !== i);
      if(this.metodo=='post'){
        this.files = newFotos;
        this.onInputChange();
      }
      //this.files se actualiza ok!
      //console.log(this.files);
    }
  }

  deleteEditFotos(i:number):void{
    if(i>=0 && i<this.urlsEdit.length){
      this.urlsEdit.splice(i,1);
      this.onInputChange();
    }
    this.gato.fotos=this.urlsEdit;
    //console.log(this.urlsEdit);
  }

  enviarGato():void{
    let edad=this.gatoForm.value.edadnumero+" "+this.gatoForm.value.edadtexto;
    const gato:GatoDetalle=this.gatoForm.value;
    gato.edad=edad;
    const voluntario=new Voluntario();
    voluntario.email=this.user.email;
    gato.voluntario=voluntario;
    if(this.metodo=='post'){
      //this.crearGato(gato);
    }else if(this.metodo=='put'){
      gato.fotos=this.urlsEdit;
      this.editarGato(gato);
    }
  }

  crearGato(gato:GatoDetalle):void{
    console.log(this.files);
    this.service.nuevoGato(gato,this.files)
    .subscribe({
      next:(response)=>{
        const nuevo:GatoDetalle=response.data;
        this.success(nuevo);
      },
      error:(e)=>{
        console.error("Error al cargar el gatito", e);
        this.error(e);
      }
    })
  }

  editarGato(gato:GatoDetalle):void{
    const id= this.ruta.snapshot.params['id'];
    this.service.edicionGato(gato,this.files,id)
    .subscribe({
      next:(response)=>{
        const actu:GatoDetalle=response.data;
        this.success(actu);
    },
    error:(e)=>{
      console.error("Error al cargar el gatito", e);
      this.error(e);
    }
  })
  }

  cancelar():void{
    this.mostrarForm=false;
    this.mostrarFormChange.emit(this.mostrarForm);
    if(this.metodo=='put'){
      this.router.navigateByUrl('/backoffice/misgatos');
    }
  }

  success(gato:GatoDetalle):void{
    Swal.fire({
      title: `${gato.nombre} fue cargada/o con éxito!`,
      icon: 'success',
      html: `Puedes cargar su ficha ahora
             o cargarla luego desde el botón editar`,
      showDenyButton:true,
      denyButtonText:'Volver',
      denyButtonColor:'#aaa',
      confirmButtonText:'Ir a ficha'
    }).then((res)=>{
      if(res.isConfirmed){
        this.router.navigateByUrl(`/backoffice/misgatos/${gato.id}/ficha`);
      }else if (res.isDenied) {
        this.router.navigateByUrl('/backoffice/misgatos');
      }
    })
  }

  error(e:any):void{
    Swal.fire({
      icon:'error',
      title:'Error al cargar el gato',
      text:e.data
    })
  }

}
