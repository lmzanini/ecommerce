import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { Usuario } from "src/interfaces/usuarios/usuario.model";
import { switchMap, map } from 'rxjs/operators';
import { UsuarioService } from 'src/services/usuarios/usuario.service';
import { Endereco } from 'src/interfaces/endereco/endereco.model';



interface LoginResponse {
  token: string;
}


@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly TOKEN_KEY = "token";
  private readonly API_URL = "http://localhost:3000/usuarios/login";


  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient,private usuarioService: UsuarioService) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  login(email: string, senha: string): Observable<LoginResponse> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const data = { email, senha };
    return this.http
      .post<LoginResponse>(this.API_URL, data, { headers })
      .pipe(
        tap((response) => {
          const token = response.token;
          this.setToken(token);
          this.isLoggedInSubject.next(true);
        })
      );
  }

  logout(): void {
    this.removeToken();
    this.isLoggedInSubject.next(false);
  }

  isAdmin(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token && this.isTokenExpired(token)) {
      this.logout();
    }

    if (token) {
      // decode the token to extract the payload
      const payload = JSON.parse(atob(token.split('.')[1]));
      // check if the payload contains the "isAdmin" claim
      if (payload && payload.admin === 1) {
        return true;
      }

    }
    return false;
  }

  getProfile(): Observable<Usuario> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      return throwError("Token não encontrado");
    }
    if (this.isTokenExpired(token)) {
      this.logout();
      return throwError("Token expirado");
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const apiUrl = 'http://localhost:3000/usuarios/me';

    if (this.isTokenExpired(token)) {
      // Renova o token
      return this.renewToken().pipe(
        switchMap(() => {
          // Faz a chamada à API com o novo token
          headers.set('Authorization', `Bearer ${localStorage.getItem(this.TOKEN_KEY)}`);
          return this.http.get<Usuario>(apiUrl, { headers });
        })
      );
    } else {
      // Token ainda é válido, faz a chamada à API normalmente
      return this.http.get<Usuario>(apiUrl, { headers });
    }
  }


  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp * 1000; // converte a data de expiração em milissegundos
    return Date.now() > expiration;
  }

  renewToken(): Observable<LoginResponse> {
    const renewUrl = 'http://localhost:3000/usuarios/renew';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(this.TOKEN_KEY)}`);
    return this.http.post<LoginResponse>(renewUrl, {}, { headers }).pipe(
      tap((response) => {
        const token = response.token;
        this.setToken(token);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  getLoggedUser(): Observable<Usuario> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      return throwError("Token não encontrado");
    }
    if (this.isTokenExpired(token)) {
      this.logout();
      return throwError("Token expirado");
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const apiUrl = 'http://localhost:3000/usuarios/me';

    if (this.isTokenExpired(token)) {
      // Renova o token
      return this.renewToken().pipe(
        switchMap(() => {
          // Faz a chamada à API com o novo token
          headers.set('Authorization', `Bearer ${localStorage.getItem(this.TOKEN_KEY)}`);
          return this.http.get<Usuario>(apiUrl, { headers });
        })
      );
    } else {
      // Token ainda é válido, faz a chamada à API normalmente
      return this.http.get<Usuario>(apiUrl, { headers });
    }
  }


  cadastrarEndereco(endereco: Endereco): Observable<any> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      return throwError("Token não encontrado");
    }
    if (this.isTokenExpired(token)) {
      this.logout();
      return throwError("Token expirado");
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const apiUrl = 'http://localhost:3000/enderecos/cadastro';

    if (this.isTokenExpired(token)) {
      // Renova o token
      return this.renewToken().pipe(
        switchMap(() => {
          // Faz a chamada à API com o novo token
          headers.set('Authorization', `Bearer ${localStorage.getItem(this.TOKEN_KEY)}`);
          return this.http.post(apiUrl, endereco, { headers });
        })
      );
    } else {
      // Token ainda é válido, faz a chamada à API normalmente
      return this.http.post(apiUrl, endereco, { headers });
    }
  }



}
