import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLateralClienteComponent } from './menu-lateral-cliente.component';

describe('MenuLateralClienteComponent', () => {
  let component: MenuLateralClienteComponent;
  let fixture: ComponentFixture<MenuLateralClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuLateralClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuLateralClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
