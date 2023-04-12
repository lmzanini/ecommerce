import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from 'src/interfaces/endereco/endereco.model';
import { Usuario } from 'src/interfaces/usuarios/usuario.model';
import { UsuarioService } from 'src/services/usuarios/usuario.service';

@Component({
  selector: 'app-atualizar-usuario-endereco-admin',
  templateUrl: './atualizar-usuario-endereco-admin.component.html',
  styleUrls: ['./atualizar-usuario-endereco-admin.component.css']
})
export class AtualizarUsuarioEnderecoAdminComponent {
  mensagem: string = "";
  tipoMensagem: string = "";
  usuario!: Usuario;
  endereco!: Endereco;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
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
