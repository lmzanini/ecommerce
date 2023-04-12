import { Component} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/interfaces/usuarios/usuario.model';
import { Categoria } from 'src/interfaces/produto/categoria.model';
import { CategoriaService } from 'src/services/produto/categoria.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  usuario!: Usuario;

  categorias!: Categoria[];

  constructor(private authService: AuthService, private router: Router, private categoriaService: CategoriaService) {
    this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      this.isAdmin = this.authService.isAdmin();

      if (this.isLoggedIn) {
        this.authService.getProfile().subscribe((usuario: Usuario) => {
          this.usuario = usuario;
        });
      }
    });
  }

  ngOnInit() {
    this.getCategorias();
  }

  goToProfile(): void {
    this.router.navigateByUrl('/perfil');
  }

  logout() {
    this.authService.logout();
  }

  getCategorias() {
    this.categoriaService.listarCategorias().subscribe(response => {
      this.categorias = response;

      console.log(response)
    });
  }



}
