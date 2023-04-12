import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecificacaoComponent } from './especificacao.component';

describe('EspecificacaoComponent', () => {
  let component: EspecificacaoComponent;
  let fixture: ComponentFixture<EspecificacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecificacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
