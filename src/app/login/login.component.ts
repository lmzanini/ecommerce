import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  senha: string = '';
  mensagem: string = '';
  tipoMensagem: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit() {
    this.authService.login(this.email, this.senha)
      .subscribe(
        (response: any) => {
          // Aqui você pode implementar a lógica para lidar com a resposta da API
          this.tipoMensagem = 'success';
          this.mensagem = 'Login realizado com sucesso.';
          this.router.navigate(['/home']); // Redireciona para a página home
        },
        (error: any) => {
          // Aqui você pode implementar a lógica para lidar com erros na chamada da API
          this.tipoMensagem = 'danger';
          this.mensagem = 'Não foi possível fazer login. Verifique suas credenciais e tente novamente.';
        }
      );
  }

}
