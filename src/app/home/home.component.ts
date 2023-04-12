import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  produtos!: any[];
  produtosDestaque!: any[];
  produtosOferta!: any[];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getProdutoDestaque();
    this.getProdutoOferta();

  }
  // ngOnInit() {
  //   this.http.get<any>(`http://localhost:3000/produtos/listarAtivos`).subscribe((data) => {
  //     this.produtos = data.produtos;
  //     this.produtosDestaque = this.produtos.filter((p) => p.destaque === 1);
  //     this.produtosOferta = this.produtos.filter((p) => p.oferta === 1);
  //     console.log(this.produtosDestaque);
  //     console.log(this.produtosOferta);
  //   });

  // }

    getProdutoOferta(){
      this.http.get<any>(`http://localhost:3000/produtos/listarOferta`).subscribe((data) =>{
        this.produtosOferta = data.produtos
      })
    }

    getProdutoDestaque(){
      this.http.get<any>(`http://localhost:3000/produtos/listarDestaque`).subscribe((data) =>{
        this.produtosDestaque = data.produtos
      })
    }

  getProdutoPorId(id: number): void {
    this.http.get(`http://localhost:3000/produtos/listar/${id}`).subscribe((data) => {
      console.log(data);
      // Redirecionar para outro componente com as informações do produto
      this.router.navigate(['/produto-id'], { state: { produto: data } });
    });
}



}

