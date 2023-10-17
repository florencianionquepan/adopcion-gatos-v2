export class Registro{
    public dni:string;
    public nombre:string;
    public apellido:string;
    public tel:string;
    public fechaNac:Date;
    public dire:string;
    public localidad:string;
    public usuario:Usuario;

  constructor(
    dni: string,
    nombre: string,
    apellido: string,
    tel: string,
    fechaNac: Date,
    dire: string,
    localidad: string,
    usuario:Usuario
  ) {
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.tel = tel;
    this.fechaNac = fechaNac;
    this.dire = dire;
    this.localidad = localidad;
    this.usuario=usuario
  }
    
}

export class Usuario{
  public email:string;
  public password:string;
  public passwordConfirm:string;

  constructor(email?: string,password?: string,passwordConfirm?: string){
    this.email = email || '';
    this.password = password || '';
    this.passwordConfirm = passwordConfirm || '';
  }
}