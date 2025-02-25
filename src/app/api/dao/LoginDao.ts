import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utils } from "../Utils";
import { DefaultResponse } from "src/app/models/DefaultResponse";
import { LoginResponse } from "src/app/models/login/LoginResponse";
import { User } from "src/app/models/login/User";
import { RoleResponse } from "src/app/models/login/RoleResponse";

@Injectable()
export class LoginDao {

    usuario?: User;

    constructor(
        private http: HttpClient,
        private utils: Utils
    ) { }

    public login(username: String, password: String): Observable<LoginResponse> {
        var credentials = {
            email : username,
            password : password
        }
        return this.http.post<LoginResponse>(environment.apiUrl + 'authorization/token', credentials ,{ headers: this.utils.getHeaders() });
    }

    public validarSession(): Observable<boolean> {
        this.usuario = JSON.parse(localStorage.getItem('session')!);
        console.log(this.usuario);
        return this.http.get<DefaultResponse>(environment.apiUrl + 'authorization/validate?id='+this.usuario?.id+"&token="+this.usuario?.token , { headers: this.utils.getHeaders() }).pipe(
            map(response => response.success)
        );
    }

    public getRoles(): Observable<RoleResponse> {
        this.usuario = JSON.parse(localStorage.getItem('session')!);
        return this.http.get<RoleResponse>(environment.apiUrl + 'usuarios/role?token='+this.usuario?.token, { headers: this.utils.getHeaders() });
    }

    public getValidarRoles(expected : string): Observable<boolean> {
        this.usuario = JSON.parse(localStorage.getItem('session')!);
        return this.http.get<DefaultResponse>(environment.apiUrl + 'authorization/validar-rol?id='+this.usuario?.id+'&token='+this.usuario?.token+'&expected='+expected, { headers: this.utils.getHeaders() }).pipe(
            map(response => response.success)
        );
    }

    public logout(): Observable<DefaultResponse> {
        this.usuario = JSON.parse(localStorage.getItem('session')!);
        return this.http.post<DefaultResponse>(environment.apiUrl + 'authorization/logout?id='+this.usuario?.id ,{ headers: this.utils.getHeaders() });
    }
}