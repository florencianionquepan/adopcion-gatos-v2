export class User{
  public id: number;
  public email: string;
  public password: string;
  public passwordC:string;
  public role : string;
  public authStatus : string;

  constructor(id?: number, email?: string, password?: string,
                passwordC?: string,role?: string,authStatus?:string){
      this.id = id || 0;
      this.email = email || '';
      this.password = password || '';
      this.passwordC = passwordC || '';
      this.role = role || '';
      this.authStatus = authStatus || '';
    }
}