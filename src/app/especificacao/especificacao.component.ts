import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-especificacao",
  templateUrl: "./especificacao.component.html",
  styleUrls: ["./especificacao.component.css"],
})
export class EspecificacaoComponent {
  nome: string = "";
  descricao: string = "";
  mensagem: string = '';
  tipoMensagem: string = '';

  constructor(private http: HttpClient) {}

  onSubmit(nomeEspecificacao: string, descricaoEspecificacao: string) {
    const body = { nome: nomeEspecificacao, descricao: descricaoEspecificacao };
    this.http
      .post("http://localhost:3000/especificacoes/cadastrar", body)
      .subscribe(
        (response: any) => {
          this.tipoMensagem = 'success';
          this.mensagem = 'Especificação cadastrada com sucesso.';
        },
        (error: any) => {
          this.tipoMensagem = 'danger';
          this.mensagem = 'Houve algum erro ao tentar cadastrar a especificação, verifique as informações passadas.';
        }
      );
  }
}
