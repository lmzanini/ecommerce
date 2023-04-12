import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarUsuarioEnderecoComponent } from './cadastrar-usuario-endereco.component';

describe('CadastrarUsuarioEnderecoComponent', () => {
  let component: CadastrarUsuarioEnderecoComponent;
  let fixture: ComponentFixture<CadastrarUsuarioEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarUsuarioEnderecoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarUsuarioEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
