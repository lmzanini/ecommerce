import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarUsuarioAdminComponent } from './atualizar-usuario-admin.component';

describe('AtualizarUsuarioAdminComponent', () => {
  let component: AtualizarUsuarioAdminComponent;
  let fixture: ComponentFixture<AtualizarUsuarioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarUsuarioAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarUsuarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
