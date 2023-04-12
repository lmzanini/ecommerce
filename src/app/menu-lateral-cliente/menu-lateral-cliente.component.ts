import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/interfaces/usuarios/usuario.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-menu-lateral-cliente',
  templateUrl: './menu-lateral-cliente.component.html',
  styleUrls: ['./menu-lateral-cliente.component.css']
})
export class MenuLateralClienteComponent {

  usuario!: Usuario;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
        console.log(usuario.id_endereco_atual);

        // Aqui você pode fazer o que quiser com o objeto "usuario",
        // como preencher formulários ou exibir informações na tela.
      },
      (error) => {
        console.error(error);
      }
    );
  }

  navegarParaEnderecoSelecionado(): void {
    if (this.usuario.id_endereco_atual === null) {
      this.router.navigate(['/cadastrar/endereco/usuario']);
    } else {
      this.router.navigate(['/atualizar/endereco/usuario', this.usuario.id_usuarios]);
    }
  }

}
