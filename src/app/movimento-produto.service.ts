import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Produto {
  codProduto: string;
  desProduto: string;
  cosifs: Cosif[];
}

interface Cosif {
  codCosif: string;
  codClassificacao: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovimentoProdutoService {
  private apiUrl = 'http://localhost:8080/api/produto';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }
}
