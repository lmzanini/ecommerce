import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Produto } from 'src/interfaces/produto/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'https://api-riquirri.onrender.com/produtos';

  constructor(private http: HttpClient) { }

  cadastrarProduto(produtoFormData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, produtoFormData).pipe(
      tap(() => {
        console.log('Produto cadastrado com sucesso!');
      }),
      catchError(error => {
        console.error('Erro ao cadastrar o produto:', error);
        return throwError(error);
      })
    );
  }


  listarProdutos(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listar?page=${page}`);
  }

  obterProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/listar/${id}`);
  }

  atualizarProduto(id: number, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/atualizar/${id}`;
    return this.http.put(url, formData).pipe(
      tap(() => {
        console.log(`Produto atualizado com sucesso: ${id}`);
      }),
      catchError((error) => {
        console.error(`Erro ao atualizar o produto: ${id}`, error);
        return throwError(error);
      })
    );
  }


  deletarProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletar/${id}`);
  }

}
