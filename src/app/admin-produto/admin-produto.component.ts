import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { Categoria } from "src/interfaces/produto/categoria.model";
import { CategoriaService } from "src/services/produto/categoria.service";
import { ProdutoService } from "src/services/produto/produto.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-produto",
  templateUrl: "./admin-produto.component.html",
  styleUrls: ["./admin-produto.component.css"]
})
export class AdminProdutoComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriasSelecionadas: Categoria[] = [];

  produtoForm: FormGroup;
  id!: number;


  mensagem: string = '';
  tipoMensagem: string = '';


  produto = {
    nome: "",
    especificacao: "",
    descricao: "",
    descricao_curta: "",
    valor: 0,
    desconto: 0,
    valor_atual: 0,
    quantidade: 0,
    ativo: 0,
    destaque: 0,
    oferta: 0,
    categorias: 0,
    imagem: [] as File[]
  };

  constructor(private categoriaService: CategoriaService, private produtoService: ProdutoService, private router: Router) {
    this.getCategorias();
    this.produtoForm = new FormGroup({
      categorias: new FormControl('')
    });

  }

  ngOnInit(): void {
    this.produtoForm = new FormGroup({
      categorias: new FormControl('')
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  getCategorias() {
    this.categoriaService.listarCategorias().subscribe(response => {
      this.categorias = response;

      console.log(response)
    });
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
    for (let i = 0; i < this.produto.imagem.length; i++) {
      formData.append("imagem", this.produto.imagem[i]);
    }

    this.produtoService.cadastrarProduto(formData).subscribe(
      response => {
        console.log(response);
        this.tipoMensagem = 'success';
        this.mensagem = 'Produto cadastrado com sucesso!';
        form.reset();
        this.router.navigate(['/lista-produto-admin']);
      },
      error => {
        console.error(error);
        this.tipoMensagem = 'danger';
        this.mensagem = 'Ocorreu algum erro ao cadastrar o produto. Verifique as informações do produto e tente novamente!';
      }
    );
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
        this.produto.imagem.push(files[i]);
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
            this.produto.imagem = this.produto.imagem.filter(file => file !== files[i]);
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
