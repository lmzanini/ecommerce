import { Component } from '@angular/core';
import { Usuario } from 'src/interfaces/usuarios/usuario.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {
  tipoMensagem: string = '';
  mensagem: string = '';
  usuario: Usuario = {} as Usuario;

  mensagemErro!: string;

  submitted = false;

  cadastroForm = new FormGroup({
    nome_completo: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required]),
    telefone: new FormControl(''),
    cpf: new FormControl(''),
    pergunta_secreta: new FormControl('', [Validators.required]),
    resposta_secreta: new FormControl(''),
  });

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log(this.cadastroForm.value);
    this.http.post('http://localhost:3000/usuarios/cadastro', this.cadastroForm.value)
      .subscribe(
        (response) => {
          this.tipoMensagem = "success";
          this.mensagem = "Usuário atualizado com sucesso.";
          this.router.navigate(["/login"]);
        },
        (error) => {
          console.log(error);
          if (error.status === 400) {
            this.tipoMensagem = "danger";
            this.mensagem = error.error.mensagem;
          } else {
            this.tipoMensagem = "danger";
            this.mensagem = error.error.mensagem;
          }
        }
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  removeFormatacaoCpf(cpf: string): string {
    return cpf.replace(/\D+/g, '');
  }
  isInvalid(field: string): boolean {
    return this.submitted && this.cadastroForm.get(field)?.invalid || false;
  }

}
