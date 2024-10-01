import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentoProdutoComponent } from './movimento-produto.component';

describe('MovimentoProdutoComponent', () => {
  let component: MovimentoProdutoComponent;
  let fixture: ComponentFixture<MovimentoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentoProdutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimentoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
