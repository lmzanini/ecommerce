import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-produto-id',
  templateUrl: './produto-id.component.html',
  styleUrls: ['./produto-id.component.css']
})
export class ProdutoIdComponent implements OnInit {

  produto: any;
  imagemAtual!: string;

  // Armazena o caminho da imagem principal
  imagemPrincipal!: string;

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.produto = history.state.produto;
    console.log(this.produto);

    // Define a imagem principal como a primeira imagem do array de imagens
    this.imagemPrincipal = this.produto.imagens[0];
  }

  // Define a imagem principal como a imagem clicada na miniatura
  selecionarImagem(imagem: string): void {
    this.imagemPrincipal = imagem;
  }

  atualizaImagem(imagem: string) {
    this.imagemAtual = imagem;
  }

  voltar(): void {
    this.location.back();
  }
}
