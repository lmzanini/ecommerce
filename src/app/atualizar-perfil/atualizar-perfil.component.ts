import { AuthService } from "src/services/auth.service";
import { Component } from "@angular/core";
import { Usuario } from "src/interfaces/usuarios/usuario.model";
import { UsuarioService } from "src/services/usuarios/usuario.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-atualizar-perfil",
  templateUrl: "./atualizar-perfil.component.html",
  styleUrls: ["./atualizar-perfil.component.css"],
})
export class AtualizarPerfilComponent {
  usuario!: Usuario;
  mensagem: string = '';
  tipoMensagem: string = '';

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
        // Aqui você pode fazer o que quiser com o objeto "usuario",
        // como preencher formulários ou exibir informações na tela.
      },
      (error) => {
        console.error(error);
      }
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  atualizarUsuario(): void {
    // cria uma cópia do objeto sem a propriedade "id_usuarios"
    const usuario = { ...this.usuario };
    delete usuario.id_usuarios;
    delete usuario.id_usuarios_endereco;
    delete usuario.cep;
    delete usuario.pais;
    delete usuario.estado;
    delete usuario.cidade;
    delete usuario.bairro;
    delete usuario.tipo_logradouro;
    delete usuario.logradouro;
    delete usuario.numero;
    delete usuario.complemento;
    delete usuario.ponto_referencia;
    // chama a função para atualizar o usuário
    this.usuarioService
      .atualizarCliente(
        this.usuario.id_usuarios ? this.usuario.id_usuarios : 0,
        usuario
      )
      .subscribe(
        (response) => {
          this.tipoMensagem = 'success';
        this.mensagem = 'Perfil atualizado com sucesso.';
        this.router.navigate(['/perfil']);
        },
        (error) => {
          this.tipoMensagem = 'danger';
          this.mensagem = 'Houve algum erro ao tentar atualizar o perfil, verifique as informações passadas.';
        }
      );
  }
}
