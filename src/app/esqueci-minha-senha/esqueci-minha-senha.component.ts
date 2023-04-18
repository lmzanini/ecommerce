import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioService } from "src/services/usuarios/usuario.service";
import { Location } from '@angular/common';

@Component({
  selector: "app-esqueci-minha-senha",
  templateUrl: "./esqueci-minha-senha.component.html",
  styleUrls: ["./esqueci-minha-senha.component.css"],
})
export class EsqueciMinhaSenhaComponent {
  email = "";
  pergunta_secreta = "";
  resposta_secreta = "";
  novaSenha = "";

  tipoMensagem: string = "";
  mensagem: string = "";

  constructor(private usuarioService: UsuarioService, private router: Router, private location: Location) {}

  ngOnInit(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  trocarSenha() {
    this.usuarioService
      .trocarSenha(
        this.email,
        this.pergunta_secreta,
        this.resposta_secreta,
        this.novaSenha
      )
      .subscribe(
        () => {
          this.tipoMensagem = "success";
          this.mensagem = "Senha alterada com sucesso.";
          this.location.back();
        },
        (error) => {
          this.tipoMensagem = "danger";
          this.mensagem =
            "Erro ao tentar trocar de senha, verifique as informações passadas";
        }
      );
  }

  voltar(): void {
    this.location.back();
  }
}
