export class User{
  public id: number;
  public email: string;
  public password: string;
  public passwordC:string;
  public roles : Rol[];
  public nombre:string;
  public localidad:string;
  public authStatus : string;
  public esTransito:boolean;

  constructor(id?: number, email?: string, password?: string,
                passwordC?: string,roles?: Rol[],authStatus?:string,
                nombre?:string,localidad?:string, esTransito?:boolean){
      this.id = id || 0;
      this.email = email || '';
      this.password = password || '';
      this.passwordC = passwordC || '';
      this.roles = roles || [];
      this.authStatus = authStatus || '';
      this.nombre= nombre || '';
      this.localidad=localidad || '';
      this.esTransito=esTransito || false;
    }
}

export class Rol{
  public id:number;
  public nombre:string;

  constructor(id?:number,nombre?:string){
    this.id=id || 0;
    this.nombre=nombre || '';
  }
}