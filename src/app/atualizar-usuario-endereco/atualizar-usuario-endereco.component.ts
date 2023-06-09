import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from 'src/interfaces/endereco/endereco.model';
import { Usuario } from 'src/interfaces/usuarios/usuario.model';
import { AuthService } from 'src/services/auth.service';
import { UsuarioService } from 'src/services/usuarios/usuario.service';

@Component({
  selector: 'app-atualizar-usuario-endereco',
  templateUrl: './atualizar-usuario-endereco.component.html',
  styleUrls: ['./atualizar-usuario-endereco.component.css']
})
export class AtualizarUsuarioEnderecoComponent {
  mensagem: string = "";
  tipoMensagem: string = "";
  usuario!: Usuario;
  endereco!: Endereco;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}



  ngOnInit() {
    const idEndereco = +(this.route.snapshot.paramMap.get("id") || 0);
    this.usuarioService.buscarEndereco(idEndereco).subscribe(
      (enderecos: Endereco[]) => {
        if (enderecos.length > 0) {
          this.endereco = enderecos[0];
          console.log(this.endereco);
        } else {
          console.error("Endereço não encontrado");
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  atualizarEndereco() {
    this.usuarioService.atualizarEndereco(this.endereco.id_endereco_atual || 0, this.endereco).subscribe(
      (response: any) => {
        this.tipoMensagem = 'success';
        this.mensagem = 'Endereço atualizado com sucesso.';
        // this.router.navigate(['/categoria']);
      },
      (error: any) => {
        this.tipoMensagem = 'danger';
        this.mensagem = 'Houve algum erro ao tentar atualizar o endereço, verifique as informações passadas.';
      }
    );
  }


}
