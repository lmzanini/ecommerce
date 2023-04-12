import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProdutoAdminComponent } from './lista-produto-admin.component';

describe('ListaProdutoAdminComponent', () => {
  let component: ListaProdutoAdminComponent;
  let fixture: ComponentFixture<ListaProdutoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProdutoAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProdutoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
