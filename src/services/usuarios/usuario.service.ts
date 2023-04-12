import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Usuario } from './../../interfaces/usuarios/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/cadastro`, usuario).pipe(
      map((res: any) => {
        const novoUsuario: Usuario = {
          id_usuarios: res.id_usuarios,
          email: usuario.email,
          telefone: usuario.telefone,
          nome_completo: usuario.nome_completo,
          cpf: usuario.cpf,
          senha: usuario.senha,
          admin: usuario.admin,
          pergunta_secreta: usuario.pergunta_secreta,
          resposta_secreta: usuario.resposta_secreta,
        };
        return novoUsuario;
      })
    );
  }

  listarUsuarios(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?page=${page}`);
  }

  listarTodosUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  obterUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  buscarUsuarioPorNome(nome: string): Observable<any> {
    const url = `${this.apiUrl}/search?nome=${nome}`;
    return this.http.get<any>(url);
  }

  atualizarUsuario(id: number, usuario: Usuario): Observable<any> {
    const url = `${this.apiUrl}/atualizarAdmin/${id}`;
    return this.http.put(url, usuario);
  }

  atualizarCliente(id: number, usuario: Usuario): Observable<any> {
    const url = `${this.apiUrl}/atualizar/${id}`;
    return this.http.patch(url, usuario);
  }


  deletarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletar/${id}`);
  }



  verificarEmail(email: string): Observable<boolean> {
    return this.listarTodosUsuarios().pipe(
      map(usuarios => !!usuarios.find(usuario => usuario.email === email))
    );
  }



  buscarEndereco(id: number): Observable<any> {
    const url = `http://localhost:3000/enderecos/buscar/${id}`;

    return this.http.get<any>(url);
  }

  atualizarEndereco(id: number, endereco: any) {
    return this.http.put(`http://localhost:3000/enderecos/atualizar/${id}`, endereco);
  }

  trocarSenha(email: string, pergunta_secreta: string, resposta_secreta: string, novaSenha: string): Observable<any> {
    const body = {
      email,
      pergunta_secreta,
      resposta_secreta,
      senhaNova: novaSenha
    };
    return this.http.put(`${this.apiUrl}/trocarSenha`, body);
  }



}
