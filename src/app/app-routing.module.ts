import { CadastrarUsuarioEnderecoComponent } from './cadastrar-usuario-endereco/cadastrar-usuario-endereco.component';
import { AtualizarCategoriaComponent } from './atualizar-categoria/atualizar-categoria.component';
import { AdminGuard } from './../services/adminguard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PainelAdminComponent } from './painel-admin/painel-admin.component';
import { AdminProdutoComponent } from './admin-produto/admin-produto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EspecificacaoComponent } from './especificacao/especificacao.component';
import { ListaProdutoAdminComponent } from './lista-produto-admin/lista-produto-admin.component';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';
import { AdminProdutoIdComponent } from './admin-produto-atualizar/admin-produto-id.component';
import { ProdutoIdComponent } from './produto-id/produto-id.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { AtualizarUsuarioAdminComponent } from './atualizar-usuario-admin/atualizar-usuario-admin.component';
import { CadastrarUsuarioAdminComponent } from './cadastrar-usuario-admin/cadastrar-usuario-admin.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { LoginGuard } from 'src/services/loginguard';
import { AtualizarPerfilComponent } from './atualizar-perfil/atualizar-perfil.component';
import { AtualizarUsuarioEnderecoAdminComponent } from './atualizar-usuario-endereco-admin/atualizar-usuario-endereco-admin.component';
import { AtualizarUsuarioEnderecoComponent } from './atualizar-usuario-endereco/atualizar-usuario-endereco.component';
import { EsqueciMinhaSenhaComponent } from './esqueci-minha-senha/esqueci-minha-senha.component';
import { TesteComponent } from './teste/teste.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin', component: PainelAdminComponent, canActivate: [AdminGuard] },
  { path: 'admin-produto', component: AdminProdutoComponent, canActivate: [AdminGuard] },
  { path: 'categoria', component: CategoriaComponent, canActivate: [AdminGuard] },
  { path: 'categoria/atualizar/:id', component: AtualizarCategoriaComponent, canActivate: [AdminGuard] },
  { path: 'especificacao', component: EspecificacaoComponent, canActivate: [AdminGuard] },
  { path: 'lista-produto-admin', component: ListaProdutoAdminComponent, canActivate: [AdminGuard] },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'admin-produto-id/:id', component: AdminProdutoIdComponent, canActivate: [AdminGuard] },
  { path: 'produto-id', component: ProdutoIdComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'listar-usuarios', component: ListarUsuariosComponent, canActivate: [AdminGuard] },
  { path: 'usuario/atualizar/:id', component: AtualizarUsuarioAdminComponent, canActivate: [AdminGuard] },
  { path: 'atualizar/endereco/usuario/admin/:id', component: AtualizarUsuarioEnderecoAdminComponent, canActivate: [AdminGuard]},
  { path: 'cadastrar/usuario/admin', component: CadastrarUsuarioAdminComponent, canActivate: [AdminGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [LoginGuard]},
  { path: 'cadastrar', component: CadastrarComponent},
  { path: 'atualizar-perfil', component: AtualizarPerfilComponent, canActivate: [LoginGuard]},
  { path: 'atualizar/endereco/usuario/:id', component: AtualizarUsuarioEnderecoComponent, canActivate: [LoginGuard]},
  { path: 'cadastrar/endereco/usuario', component: CadastrarUsuarioEnderecoComponent, canActivate: [LoginGuard]},
  { path: 'esqueci-minha-senha', component: EsqueciMinhaSenhaComponent},
  { path: 'teste', component: TesteComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
