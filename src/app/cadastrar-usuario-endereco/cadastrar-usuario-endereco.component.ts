import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Endereco } from 'src/interfaces/endereco/endereco.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-cadastrar-usuario-endereco',
  templateUrl: './cadastrar-usuario-endereco.component.html',
  styleUrls: ['./cadastrar-usuario-endereco.component.css']
})
export class CadastrarUsuarioEnderecoComponent {

  tipoMensagem: string = '';
  mensagem: string = '';
  
  enderecoForm = new FormGroup({
    cep: new FormControl('', Validators.required),
    pais: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
    bairro: new FormControl('', Validators.required),
    logradouro: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    complemento: new FormControl(''),
    ponto_referencia: new FormControl(''),
  });

  constructor(
    private authService: AuthService
  ) {}

  cadastrarEndereco() {
    const endereco: Endereco = {
      cep: this.enderecoForm.value.cep || '',
      pais: this.enderecoForm.value.pais || '',
      estado: this.enderecoForm.value.estado || '',
      cidade: this.enderecoForm.value.cidade || '',
      bairro: this.enderecoForm.value.bairro || '',
      logradouro: this.enderecoForm.value.logradouro || '',
      numero: this.enderecoForm.value.numero || '',
      complemento: this.enderecoForm.value.complemento || '',
      ponto_referencia: this.enderecoForm.value.ponto_referencia || '',
    };
    this.authService.cadastrarEndereco(endereco).subscribe(
      response => {
        console.log('Endereço cadastrado com sucesso');
        // faça algo com a resposta
      },
      error => {
        console.log('Erro ao cadastrar endereço:', error);
        // faça algo com o erro
      }
    );
  }

}
