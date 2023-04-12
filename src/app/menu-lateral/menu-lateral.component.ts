import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {

  constructor( private router: Router) {}

  navegarParaEnderecoSelecionado(id: number): void {
    this.router.navigate(['atualizar/endereco/usuario/admin/', id]);
    console.log(id)
  }
}
