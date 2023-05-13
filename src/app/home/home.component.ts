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
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getProdutoDestaque();
    this.getProdutoOferta();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getProdutoOferta(){
    this.http.get<any>(`https://api-riquirri.onrender.com/produtos/listarOferta`).subscribe((data) =>{
      this.produtosOferta = data.produtos
    })
  }

  getProdutoDestaque(){
    this.http.get<any>(`https://api-riquirri.onrender.com/produtos/listarDestaque`).subscribe((data) =>{
      this.produtosDestaque = data.produtos
    })
  }

  getProdutoPorId(id: number): void {
    this.http.get(`https://api-riquirri.onrender.com/produtos/listar/${id}`).subscribe((data) => {
      console.log(data);
      // Redirecionar para outro componente com as informações do produto
      this.router.navigate(['/produto-id'], { state: { produto: data } });
    });
  }
}
