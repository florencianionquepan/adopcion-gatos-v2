import { Component, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { GeorefService } from '../../services/georef.service';
import { fechaNacimientoValidator, matchValues } from 'src/app/backoffice/validators/validators';
import { Persona } from 'src/app/models/Persona';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: PersonaFormComponent,
    multi:true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PersonaFormComponent),
    multi: true
  }]
})
export class PersonaFormComponent implements ControlValueAccessor{
  provincias:{id:number, nombre:string}[]=[];
  localidades:{id:number, nombre:string}[]=[];
  personaForm=this.fb.group({
    nombre:['',[Validators.required]],
    apellido:['',[Validators.required]],
    fechaDeNacimiento:['',[Validators.required,fechaNacimientoValidator]],
    dni:['',[Validators.required,Validators.pattern('^[0-9]{8}$')]],
    provincia:['',[Validators.required]],
    localidad:['',[Validators.required]],
    direccion:['',[Validators.required]],
    telefono:['',[Validators.required,Validators.pattern('^[0-9]+$'), Validators.minLength(9)]],
  })

	private onChanged: Function = (persona:Persona) => {};
	private onTouch: Function = (persona:Persona) => {};

  constructor(private geoser:GeorefService, private fb:FormBuilder){
      this.personaForm.valueChanges.pipe(debounceTime(100)).subscribe(()=>{
        this.onChanged(this.personaForm.value);
        this.onTouch(this.personaForm.value);
      });
  }

  writeValue(obj: Persona): void {
    //console.log("write value:"+obj);
    this.personaForm.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChanged=fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch=fn;
  }

  setDisabledState?(isDisabled: boolean): void {

  }

  marcarCamposComoTouched() {
    this.personaForm.markAllAsTouched();
  }

  
  ngOnInit(){
    this.obtenerProv();
     this.personaForm.get('provincia')?.valueChanges.subscribe(
      (v)=>{
        const localidad=this.personaForm.get('localidad');
        if(localidad){
          if(v) {
            localidad.enable();
          }else{
          localidad.setValue('');
          localidad.disable();
          }
        }
      }
    )
  }

  obtenerProv(){
    this.geoser.obtenerProvincias().subscribe(
      (prov:any[])=>{
        this.provincias=prov;
        this.personaForm.get('provincia')?.setValidators([Validators.required, matchValues(this.provincias)]);
      }
    )
  }

  onProvinciaChange() {
    const selectedProvinciaValue = this.personaForm.get('provincia')?.value;
    const selectedProvincia = this.provincias.find(prov => prov.nombre === selectedProvinciaValue);
    if (selectedProvincia) {
        const provId = selectedProvincia.id;
        this.obtenerLocalidades(provId);
    } 
  }

  obtenerLocalidades(id:number){
    this.geoser.obtenerLocalidadesByProvinciaId(id).subscribe(
      (loc)=>{
        this.localidades=loc;
      }
    )
  }

  validate(_control: AbstractControl): ValidationErrors | null {
		return this.personaForm.valid ? null : { invalidRatingName: true };
	}
}
