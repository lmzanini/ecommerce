import { Categoria } from './../../interfaces/produto/categoria.model';
import { Component } from "@angular/core";
import { CategoriaService } from "src/services/produto/categoria.service";
import { Router } from '@angular/router';


@Component({
  selector: "app-categoria",
  templateUrl: "./categoria.component.html",
  styleUrls: ["./categoria.component.css"],
})
export class CategoriaComponent {


  constructor(private categoriaService: CategoriaService, private router: Router) {}

  nome: string = "";
  categorias!: Categoria[];
  mensagem: string = '';
  tipoMensagem: string = '';

  ngOnInit() {
    this.getCategorias();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit(nomeCategoria: string) {
    const categoria: Categoria = {nome: nomeCategoria || '' };
    this.categoriaService.cadastrarCategoria(categoria).subscribe(
      (response: any) => {
        this.tipoMensagem = 'success';
        this.mensagem = 'Categoria cadastrada com sucesso.';
        this.getCategorias(); // atualiza lista de categorias
      },
      (error: any) => {
        this.tipoMensagem = 'danger';
        this.mensagem = 'Houve algum erro ao tentar cadastrar a categoria, verifique as informações passadas.';
      }
    );
  }

  getCategorias() {
    this.categoriaService.listarCategorias().subscribe(response => {
      this.categorias = response;

      console.log(response)
    });
  }

  deletarCategoria(id: number): void {
    console.log(id)
    this.categoriaService.deletarCategoria(id).subscribe(
      () => {

        console.log('Categoria deletada com sucesso!');
        this.getCategorias();
      },
      error => {
        console.error('Erro ao deletar a categoria: ', error);
        // Faça algo caso ocorra um erro ao deletar o produto, como exibir uma mensagem de erro
      }
    );
  }


  atualizarListaCategorias(idExcluido: number): void {
    this.categorias = this.categorias.filter((categoria: any) => categoria.id_categorias !== idExcluido);
  }

  navegarParaCategoriaSelecionado(id: number): void {
    this.router.navigate(['categoria/atualizar/', id]);
    console.log(id)
  }


}
