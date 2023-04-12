import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarUsuarioEnderecoComponent } from './atualizar-usuario-endereco.component';

describe('AtualizarUsuarioEnderecoComponent', () => {
  let component: AtualizarUsuarioEnderecoComponent;
  let fixture: ComponentFixture<AtualizarUsuarioEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarUsuarioEnderecoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarUsuarioEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
