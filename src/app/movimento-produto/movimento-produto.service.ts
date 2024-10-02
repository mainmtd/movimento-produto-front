import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto, Movimento } from './models'; // Importe as interfaces

@Injectable({
  providedIn: 'root',
})
export class MovimentoProdutoService {
  private apiUrlProdutos = 'http://localhost:8080/api/produto';
  private apiUrlMovimentos = 'http://localhost:8080/api/movimento';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrlProdutos);
  }

  getMovimentos(): Observable<Movimento[]> {
    return this.http.get<Movimento[]>(this.apiUrlMovimentos);
  }

  createMovimento(movimento: Movimento): Observable<string> {
    return this.http.post<string>(this.apiUrlMovimentos, movimento, { responseType: 'text' as 'json' });
  }
}