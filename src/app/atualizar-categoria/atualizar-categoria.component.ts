import { CategoriaService } from 'src/services/produto/categoria.service';
import { Categoria } from 'src/interfaces/produto/categoria.model';
import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-atualizar-categoria',
  templateUrl: './atualizar-categoria.component.html',
  styleUrls: ['./atualizar-categoria.component.css']
})
export class AtualizarCategoriaComponent {
  mensagem: string = '';
  tipoMensagem: string = '';

  categoria!: Categoria & { nome: string };


  constructor(private categoriaService: CategoriaService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const idCategoria = +(this.route.snapshot.paramMap.get('id') || 0);

    this.categoriaService.obterCategoria(idCategoria).subscribe(
      (categoria: Categoria) => {
        this.categoria = categoria;
        console.log(this.categoria);

      },
      (error: any) => {
        console.error(error);
      }
    );

    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  atualizarCategoria() {
    this.categoriaService.atualizarCategoria(this.categoria.id_categorias || 0, this.categoria).subscribe(
      (response: any) => {
        this.tipoMensagem = 'success';
        this.mensagem = 'Categoria cadastrada com sucesso.';
        this.router.navigate(['/categoria']);
      },
      (error: any) => {
        this.tipoMensagem = 'danger';
        this.mensagem = 'Houve algum erro ao tentar cadastrar a categoria, verifique as informações passadas.';
      }
    );
  }
}
