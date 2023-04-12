import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdutoIdComponent } from './admin-produto-id.component';

describe('AdminProdutoIdComponent', () => {
  let component: AdminProdutoIdComponent;
  let fixture: ComponentFixture<AdminProdutoIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProdutoIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProdutoIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
