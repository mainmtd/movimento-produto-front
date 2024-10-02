import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovimentoProdutoComponent } from './movimento-produto.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovimentoProdutoService } from './movimento-produto.service';
import { of } from 'rxjs';

describe('MovimentoProdutoComponent', () => {
  let component: MovimentoProdutoComponent;
  let fixture: ComponentFixture<MovimentoProdutoComponent>;
  let movimentoProdutoService: MovimentoProdutoService;

  beforeEach(async () => {
    const movimentoProdutoServiceStub = {
      getProdutos: () => of([{ codProduto: '1', desProduto: 'Produto 1', cosifs: [] }]),
      getMovimentos: () => of([]),
      createMovimento: () => of('Movimento criado'),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MovimentoProdutoComponent], // Certifique-se de importar HttpClientTestingModule
      providers: [
        { provide: MovimentoProdutoService, useValue: movimentoProdutoServiceStub }, // Simula o serviço
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentoProdutoComponent);
    component = fixture.componentInstance;
    movimentoProdutoService = TestBed.inject(MovimentoProdutoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load produtos on init', () => {
    component.ngOnInit();
    expect(component.produtos.length).toBe(1);
    expect(component.produtos[0].desProduto).toBe('Produto 1');
  });

  it('should create movimento and clear form', () => {
    component.selectedProduto = '1';
    component.createMovimento();
    expect(component.movimentos.length).toBe(0);
    expect(component.movimento.codProduto).toBe('');
  });

  it('should validate month and year', () => {
    component.movimento.datMes = 13; // Inválido
    component.validateMesAno();
    expect(component.movimento.datMes).toBe(12); // Deve ser ajustado para o valor máximo

    component.movimento.datAno = -1; // Inválido
    component.validateMesAno();
    expect(component.movimento.datAno).toBe(new Date().getFullYear()); // Deve ser ajustado para o ano atual
  });
});
