import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovimentoProdutoService } from './movimento-produto.service';
import { Produto } from './models';

describe('MovimentoProdutoService', () => {
  let service: MovimentoProdutoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovimentoProdutoService],
    });
    service = TestBed.inject(MovimentoProdutoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch produtos', () => {
    const mockProdutos: Produto[] = [
      { codProduto: '1', desProduto: 'Produto 1', cosifs: [] },
    ];

    service.getProdutos().subscribe((produtos) => {
      expect(produtos.length).toBe(1);
      expect(produtos[0].desProduto).toBe('Produto 1');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/produto');
    expect(req.request.method).toBe('GET');
    req.flush(mockProdutos);
  });

  it('should create movimento', () => {
    const mockMovimento = {
      datMes: 1,
      datAno: 2024,
      codProduto: '1',
      codCosif: 'cosif',
      descricao: 'teste',
      dataMovimento: new Date().toISOString(),
      descricaoProduto: 'Produto 1',
      numLancamento: 1,
      codUsuario: 'TESTE',
      valor: 100,
    };

    service.createMovimento(mockMovimento).subscribe((response) => {
      expect(response).toBe('Movimento criado');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/movimento');
    expect(req.request.method).toBe('POST');
    req.flush('Movimento criado');
  });
});
