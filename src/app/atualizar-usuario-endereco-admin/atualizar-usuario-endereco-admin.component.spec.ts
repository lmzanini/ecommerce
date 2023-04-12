import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarUsuarioEnderecoAdminComponent } from './atualizar-usuario-endereco-admin.component';

describe('AtualizarUsuarioEnderecoAdminComponent', () => {
  let component: AtualizarUsuarioEnderecoAdminComponent;
  let fixture: ComponentFixture<AtualizarUsuarioEnderecoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarUsuarioEnderecoAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarUsuarioEnderecoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
