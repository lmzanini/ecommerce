import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importe o módulo de animações
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { CpfMaskPipe } from './cpf-mask.pipe';
import { TelefoneMaskPipe } from './telefone-mask.pipe';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PainelAdminComponent } from './painel-admin/painel-admin.component';
import { AdminProdutoComponent } from './admin-produto/admin-produto.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EspecificacaoComponent } from './especificacao/especificacao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaProdutoAdminComponent } from './lista-produto-admin/lista-produto-admin.component';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';
import { AdminProdutoIdComponent } from './admin-produto-atualizar/admin-produto-id.component';
import { ProdutoIdComponent } from './produto-id/produto-id.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { AtualizarCategoriaComponent } from './atualizar-categoria/atualizar-categoria.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { AtualizarUsuarioAdminComponent } from './atualizar-usuario-admin/atualizar-usuario-admin.component';
import { CadastrarUsuarioAdminComponent } from './cadastrar-usuario-admin/cadastrar-usuario-admin.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MenuLateralClienteComponent } from './menu-lateral-cliente/menu-lateral-cliente.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { AtualizarPerfilComponent } from './atualizar-perfil/atualizar-perfil.component';
import { AtualizarUsuarioEnderecoAdminComponent } from './atualizar-usuario-endereco-admin/atualizar-usuario-endereco-admin.component';
import { AtualizarUsuarioEnderecoComponent } from './atualizar-usuario-endereco/atualizar-usuario-endereco.component';
import { CadastrarUsuarioEnderecoComponent } from './cadastrar-usuario-endereco/cadastrar-usuario-endereco.component';
import { EsqueciMinhaSenhaComponent } from './esqueci-minha-senha/esqueci-minha-senha.component';
import { TesteComponent } from './teste/teste.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PainelAdminComponent,
    AdminProdutoComponent,
    MenuLateralComponent,
    CategoriaComponent,
    EspecificacaoComponent,
    ListaProdutoAdminComponent,
    NaoAutorizadoComponent,
    AdminProdutoIdComponent,
    ProdutoIdComponent,
    ProdutosComponent,
    AtualizarCategoriaComponent,
    ListarUsuariosComponent,
    AtualizarUsuarioAdminComponent,
    CpfMaskPipe,
    TelefoneMaskPipe,
    CadastrarUsuarioAdminComponent,
    PerfilComponent,
    MenuLateralClienteComponent,
    CadastrarComponent,
    AtualizarPerfilComponent,
    AtualizarUsuarioEnderecoAdminComponent,
    AtualizarUsuarioEnderecoComponent,
    CadastrarUsuarioEnderecoComponent,
    EsqueciMinhaSenhaComponent,
    TesteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Importe o módulo de animações aqui
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {}
