import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { Categoria } from './../../interfaces/produto/categoria.model';



@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  private apiUrl = 'http://localhost:3000/categorias';

  constructor(private http: HttpClient) { }

  cadastrarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/cadastrar`, categoria).pipe(
      map((res: any) => {
        const novaCategoria: Categoria = {
          id_categorias: res.id_categorias,
          nome: categoria.nome
        };
        return novaCategoria;
      })
    );
  }

  listarCategorias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listar`);
  }

  obterCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/listar/${id}`);
  }

  atualizarCategoria(id: number, categoria: Categoria): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, categoria);
  }


  deletarCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
