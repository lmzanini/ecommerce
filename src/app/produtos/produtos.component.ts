import { Categoria } from 'src/interfaces/produto/categoria.model';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/services/produto/categoria.service';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  produtos!: any[];

  categorias!: Categoria[];

  nomeProduto: string = '';
  totalProdutos: number = 0;
  totalPages: number = 0;
  maxPages = 5; // exibe no máximo 5 páginas na paginação

  constructor(private http: HttpClient, private router: Router, private categoriaService: CategoriaService) {}

  // declara uma variável para armazenar o número da página atual
  currentPage = 1;

  // declara uma variável para indicar se a página está carregando
  isLoading = false;

  // declara uma função que atualiza a lista de produtos com base na página atual
  getProdutos() {
    this.isLoading = true;
    this.http.get<any>(`http://localhost:3000/produtos/listarAtivos?page=${this.currentPage}`).subscribe(response => {
      this.produtos = response.produtos;
      this.totalPages = response.totalPages;
      console.log(this.totalPages);
      console.log(response.produtos);

      this.totalProdutos = response.totalProdutos;

      this.isLoading = false;
    });
  }

  // chama a função getProdutos() na inicialização do componente para buscar a primeira página de produtos
  ngOnInit() {
    this.getProdutos();
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.listarCategorias().subscribe(response => {
      this.categorias = response;

      console.log(response)
    });
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getProdutos();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProdutos();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getProdutos();
  }

  isActivePage(page: number): boolean {
    return this.currentPage === page;
  }


  generatePagesArray(): number[] {
    const pages: number[] = [];
    let startPage = Math.max(1, this.currentPage - Math.floor(this.maxPages / 2));
    let endPage = Math.min(this.totalPages, startPage + this.maxPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }


  buscarProdutos() {
    this.http.get<any[]>(`http://localhost:3000/produtos/listar/nome?nome=${this.nomeProduto}`).subscribe((produtos) => {
      this.produtos = produtos;
      console.log(produtos);
    });
  }

  getProdutoPorId(id: number): void {
    this.http.get(`http://localhost:3000/produtos/listar/${id}`).subscribe((data) => {
      console.log(data);
      // Redirecionar para outro componente com as informações do produto
      this.router.navigate(['/produto-id'], { state: { produto: data } });
    });
}

getProdutosByCategoriaId(id: number, page: number) {
  this.isLoading = true;
  this.http.get<any>(`http://localhost:3000/produtos/categoria/${id}?page=${page}`).subscribe(response => {
    this.produtos = response.produtos;
    this.totalPages = response.totalPages;
    console.log(this.totalPages);
    console.log(response.produtos);

    this.totalProdutos = response.totalProdutos;

    this.isLoading = false;
  });
}

filtrarProdutos(idCategoria?: number) {
  this.getProdutosByCategoriaId(idCategoria ?? 0, 1);
}

filtrarTodos(){
  this.buscarProdutos()
}


}
