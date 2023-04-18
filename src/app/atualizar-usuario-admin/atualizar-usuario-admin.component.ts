import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "src/interfaces/usuarios/usuario.model";
import { UsuarioService } from "src/services/usuarios/usuario.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { logradouro_mock } from "src/mock-data/logradouro-mock";
import { Endereco } from "src/interfaces/endereco/endereco.model";


@Component({
  selector: "app-atualizar-usuario-admin",
  templateUrl: "./atualizar-usuario-admin.component.html",
  styleUrls: ["./atualizar-usuario-admin.component.css"],
})
export class AtualizarUsuarioAdminComponent {
[x: string]: any;

  mensagem: string = "";
  tipoMensagem: string = "";
  usuario!: Usuario;

  formulario: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });


  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const idUsuario = +(this.route.snapshot.paramMap.get("id") || 0);
    this.usuarioService.obterUsuario(idUsuario).subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
        console.log(this.usuario);
      },
      (error: any) => {
        console.error(error);
      }
    );

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  atualizarUsuario() {
    this.usuarioService
  .atualizarUsuario(this.usuario.id_usuarios || 0, this.usuario)
  .subscribe(
    (response: any) => {
      console.log(this.usuario);

      this.tipoMensagem = "success";
      this.mensagem = "Usuário atualizado com sucesso.";
      this.router.navigate(["/listar-usuarios"]);
    },
    (error: any) => {
      if (error.status === 400) {
        this.tipoMensagem = "danger";
        this.mensagem =
          "Houve algum erro ao tentar atualizar o usuário, verifique as informações passadas.";
      } else {
        this.tipoMensagem = "danger";
        this.mensagem = error.error.mensagem;
      }
    }
  );

  }



  removeFormatacaoCpf(cpf: string): string {
    return cpf.replace(/\D+/g, '');
  }


}
