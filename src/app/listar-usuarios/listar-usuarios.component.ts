import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "src/interfaces/usuarios/usuario.model";
import { UsuarioService } from "src/services/usuarios/usuario.service";

@Component({
  selector: "app-listar-usuarios",
  templateUrl: "./listar-usuarios.component.html",
  styleUrls: ["./listar-usuarios.component.css"],
})
export class ListarUsuariosComponent {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  usuarios!: Usuario[];
  // usuarioEncontrado: Usuario | any;
  totalUsers: number = 0;
  totalPages: number = 0;
  maxPages = 5; // exibe no máximo 5 páginas na paginação

  // declara uma variável para armazenar o número da página atual
  currentPage = 1;

  // declara uma variável para indicar se a página está carregando
  isLoading = false;

  buscarUsuarioPorNome(nome: string) {
    if (nome) {
      this.usuarioService.buscarUsuarioPorNome(nome).subscribe((response) => {
        console.log(response.user);
        this.usuarios = response.user;
      });
    } else {
      this.getUsuarios();
    }
  }



  getUsuarios() {
    this.isLoading = true;
    this.usuarioService
      .listarUsuarios(this.currentPage)
      .subscribe((response) => {
        this.usuarios = response.data;
        this.totalPages = response.totalPages;
        console.log(this.totalPages);

        this.totalUsers = response.totalUsers;
        this.isLoading = false;
        console.log(this.usuarios);
      });
      
  }

  deletarUsuario(id: number): void {
    this.usuarioService.deletarUsuario(id).subscribe(
      () => {
        console.log('Produto deletado com sucesso!');
        this.getUsuarios();
      },
      error => {
        console.error('Erro ao deletar o produto: ', error);
        // Faça algo caso ocorra um erro ao deletar o produto, como exibir uma mensagem de erro
      }
    );
  }

  ngOnInit(): void {
    this.getUsuarios();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getUsuarios();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUsuarios();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getUsuarios();
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

  navegarParaUsuarioSelecionado(id: number): void {
    this.router.navigate(['usuario/atualizar/', id]);
    console.log(id)
  }

  navegarParaEnderecoSelecionado(id: number): void {
    this.router.navigate(['atualizar/endereco/usuario/admin/', id]);
    console.log(id)
  }



}

