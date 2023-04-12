import { ProdutoService } from "src/services/produto/produto.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "src/interfaces/produto/categoria.model";
import { Produto } from "src/interfaces/produto/produto.model";
import { FormControl, FormGroup } from "@angular/forms";
import { CategoriaService } from "src/services/produto/categoria.service";

@Component({
  selector: "app-admin-produto-id",
  templateUrl: "./admin-produto-id.component.html",
  styleUrls: ["./admin-produto-id.component.css"],
})
export class AdminProdutoIdComponent implements OnInit {
  produto!: Produto;
  produtoForm: FormGroup;

  categorias: Categoria[] = [];
  categoriasSelecionadas: Categoria[] = [];

  mensagem: string = "";
  tipoMensagem: string = "";

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.getCategorias();
    this.produtoForm = new FormGroup({
      categorias: new FormControl('')
    });
  }

  ngOnInit() {
    const idProduto = +(this.route.snapshot.paramMap.get("id") || 0);

    this.produtoService.obterProduto(idProduto).subscribe(
      (produto: Produto) => {
        this.produto = produto;
        console.log(this.produto);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  submitForm(form: any) {
    console.log("Categorias selecionadas:", this.produto.categorias);

    const formData = new FormData();
    formData.append("nome", this.produto.nome);
    formData.append("especificacao", this.produto.especificacao);
    formData.append("descricao", this.produto.descricao);
    formData.append("descricao_curta", this.produto.descricao_curta);
    formData.append("valor", this.produto.valor.toString());
    formData.append("desconto", this.produto.desconto.toString());
    formData.append("valor_atual", this.produto.valor_atual.toString());
    formData.append("quantidade", this.produto.quantidade.toString());

    formData.append("ativo", this.produto.ativo.toString());
    formData.append("destaque", this.produto.destaque.toString());
    formData.append("oferta", this.produto.oferta.toString());

    const categoriasSelecionadasIds = this.categoriasSelecionadas.map(categoria => categoria.id_categorias);
    formData.append("categorias", categoriasSelecionadasIds.join(','));

    // Adiciona cada imagem ao objeto FormData
    for (let i = 0; i < this.produto.imagens.length; i++) {
      formData.append("imagem", this.produto.imagens[i]);
    }

    this.produtoService.atualizarProduto(this.produto.id, formData).subscribe(
      response => {
        console.log(response);
        this.tipoMensagem = 'success';
        this.mensagem = 'Produto atualizado com sucesso!';
        form.reset();
        this.router.navigate(['/lista-produto-admin']);
      },
      error => {
        console.error(error);
        this.tipoMensagem = 'danger';
        this.mensagem = 'Ocorreu algum erro ao atualizar o produto. Verifique as informações do produto e tente novamente!';
      }
    );
  }


  getCategorias() {
    this.categoriaService.listarCategorias().subscribe(response => {
      this.categorias = response;

      console.log(response)
    });
  }

  onValorChange() {
    const valor = parseFloat(this.produto.valor.toString());
    const desconto = parseFloat(this.produto.desconto.toString());
    this.produto.valor_atual = valor - desconto;
  }

  imagemURL(imagem: File): string {
    const reader = new FileReader();
    reader.readAsDataURL(imagem);
    reader.onload = () => {
      return reader.result as string;
    }
    return '';
  }


  onFileSelected(event: Event) {
    const files: FileList | null = (event.target as HTMLInputElement).files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.produto.imagens.push(files[i]);
        const reader = new FileReader();
        reader.onload = () => {
          const img = document.createElement('img');
          img.src = reader.result as string;
          img.classList.add('img-thumbnail');

          const div = document.createElement('div');
          div.classList.add('col-md-4');
          div.appendChild(img);

          const removeBtn = document.createElement('button');
          removeBtn.textContent = 'Remover';
          removeBtn.classList.add('btn', 'btn-danger', 'mt-2');
          removeBtn.addEventListener('click', () => {
            this.produto.imagens = this.produto.imagens.filter(file => file !== files[i]);
            div.remove();
          });

          div.appendChild(removeBtn);

          document.getElementById('imagem-preview')?.appendChild(div);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  removerCategoriaSelecionada(categoria: any) {
    const index = this.categoriasSelecionadas.indexOf(categoria);
    if (index > -1) {
      this.categoriasSelecionadas.splice(index, 1);
    }
  }

  onChangeCategoria(event: any) {
    const categoriaId = event.target.value;
    this.produto.categorias = categoriaId;
    console.log('Categoria selecionada:', categoriaId);
  }

  onCategoriaSelected(event: Event) {
    const categoriaId = (event.target as HTMLSelectElement)?.value;
    console.log(categoriaId); // verificar se está pegando o valor correto
    const categorias = this.produtoForm.get('categorias');
    if (categorias) {
      categorias.setValue(categoriaId);
    }
  }


  adicionarCategoriaSelecionada() {
    // obtém a categoria selecionada pelo usuário
    const categoriaSelecionada = this.categorias.find(c => c.id_categorias == this.produto.categorias);

    // verifica se a categoria já existe na lista de categorias selecionadas
    if (categoriaSelecionada && !this.categoriasSelecionadas.some(c => c.id_categorias == categoriaSelecionada.id_categorias)) {
      this.categoriasSelecionadas.push(categoriaSelecionada);
      console.log(this.categoriasSelecionadas);

    }
  }

}
