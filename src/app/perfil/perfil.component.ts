import { UsuarioService } from 'src/services/usuarios/usuario.service';
import { Component } from '@angular/core';
import { Usuario } from 'src/interfaces/usuarios/usuario.model';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  usuario!: Usuario;


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((usuario: Usuario) => {
      console.log('usuario:', usuario);
      this.usuario = usuario;
    });
  }


}
