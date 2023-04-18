import { ProdutoService } from './../../services/produto/produto.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Produto } from '../../interfaces/produto/produto.model';

@Component({
  selector: 'app-lista-produto-admin',
  templateUrl: './lista-produto-admin.component.html',
  styleUrls: ['./lista-produto-admin.component.css']
})
export class ListaProdutoAdminComponent {

  constructor(private produtoService: ProdutoService, private router: Router) {

  }
  produtos!: Produto[];

  totalProdutos: number = 0;
  totalPages: number = 0;
  maxPages = 5; // exibe no máximo 5 páginas na paginação

  // declara uma variável para armazenar o número da página atual
  currentPage = 1;

  // declara uma variável para indicar se a página está carregando
  isLoading = false;

  getProdutos() {
    this.isLoading = true;
    this.produtoService.listarProdutos(this.currentPage).subscribe(response => {
      this.produtos = response.produtos;
      this.totalPages = response.totalPages;
      console.log(this.totalPages);

      this.totalProdutos = response.totalProdutos;
      this.isLoading = false;
      console.log(response)
    });
  }

  deletarProduto(id: number): void {
    this.produtoService.deletarProduto(id).subscribe(
      () => {
        console.log('Produto deletado com sucesso!');
        this.getProdutos();
      },
      error => {
        console.error('Erro ao deletar o produto: ', error);
        // Faça algo caso ocorra um erro ao deletar o produto, como exibir uma mensagem de erro
      }
    );
  }


  verProduto(id: number): void {
    this.produtoService.obterProduto(id).subscribe((data) => {
      console.log(data);
      // Redirecionar para outro componente com as informações do produto
      this.router.navigate(['/admin-produto-id'], { state: { produto: data } });
    });
  }


ngOnInit(): void {
  this.getProdutos();
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

navegarParaProdutoSelecionado(id: number): void {
  this.router.navigate(['admin-produto-id/', id]);
  console.log(id)
}
}
