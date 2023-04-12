import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarUsuarioAdminComponent } from './cadastrar-usuario-admin.component';

describe('CadastrarUsuarioAdminComponent', () => {
  let component: CadastrarUsuarioAdminComponent;
  let fixture: ComponentFixture<CadastrarUsuarioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarUsuarioAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarUsuarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
