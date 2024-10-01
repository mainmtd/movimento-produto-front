import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Adicione isso
import { CommonModule } from '@angular/common';

interface Produto {
  codProduto: string;
  desProduto: string;
  cosifs: { codCosif: string; codClassificacao: string }[];
}

interface Movimento {
  datMes: number;
  datAno: number;
  codProduto: string;
  codCosif: string;
  descricao: string;
  dataMovimento: string;
  descricaoProduto:string;
  numLancamento:number;
  codUsuario: string;
  valor: number;
}

@Component({
  selector: 'app-movimento-produto',
  standalone: true, // Certifique-se de que isso esteja definido como true
  templateUrl: './movimento-produto.component.html',
  styleUrls: ['./movimento-produto.component.scss'],
  imports: [FormsModule, CommonModule], // Adicione o FormsModule aqui
})
export class MovimentoProdutoComponent implements OnInit {
  produtos: Produto[] = [];
  cosifs: { codCosif: string; codClassificacao: string }[] = [];
  selectedProduto: string = '';
  movimento: Movimento = {
    datMes: new Date().getMonth(),
    datAno: new Date().getFullYear(),
    codProduto: '',
    codCosif: '',
    descricao: '',
    descricaoProduto: '',
    numLancamento: -1,
    dataMovimento: new Date().toISOString(),
    codUsuario: 'TESTE',
    valor: 0,
  };
  movimentos: Movimento[] = [];
  formEnabled: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProdutos();
    this.loadMovimentos();
  }

  loadProdutos() {
    this.http.get<Produto[]>('http://localhost:8080/api/produto').subscribe((data) => {
      this.produtos = data;
    });
  }

  loadMovimentos() {
    this.http.get<Movimento[]>('http://localhost:8080/api/movimento').subscribe((data) => {
      this.movimentos = data;
    });
  }

  onProdutoChange() {
    const produtoSelecionado = this.produtos.find(prod => prod.codProduto === this.selectedProduto);
    
    if (produtoSelecionado) {
      this.cosifs = produtoSelecionado.cosifs; // Atualiza a lista de cosifs com base no produto selecionado
      this.movimento.codCosif = ''; // Reseta o codCosif
    } else {
      this.cosifs = []; // Se nenhum produto for selecionado, limpa a lista de cosifs
    }
  }
  formatarLancamento(numLancamento: number): string {
    return numLancamento.toString().padStart(3, '0');
  }

  toggleForm() {
    this.formEnabled = !this.formEnabled;
    if (!this.formEnabled) {
      this.clearForm();
    }
  }

  clearForm() {
    this.resetForm(); 
    this.formEnabled = false;
  }

  createMovimento() {
    const movimentoComProduto = {
      ...this.movimento,
      codProduto: this.selectedProduto, // Adiciona o codProduto ao movimento
    };
  
    this.http.post('http://localhost:8080/api/movimento', movimentoComProduto, { responseType: 'text' })
      .subscribe(
        (response) => {
          console.log('Movimento criado com sucesso:', response);
          this.loadMovimentos();
          this.clearForm(); // Limpa o formulário após inclusão
        },
        (error) => {
          console.error('Erro ao criar movimento:', error);
        }
      );
  }

  resetForm() {
    this.movimento = {
      datMes: new Date().getMonth() + 1, // Ajuste aqui para iniciar em 1
      datAno: new Date().getFullYear(),
      codProduto: '',
      codCosif: '',
      descricao: '',
      descricaoProduto: '',
      numLancamento: -1,
      dataMovimento: new Date().toISOString(),
      codUsuario: 'TESTE',
      valor: 0,
    };
    this.selectedProduto = '';
    this.cosifs = [];
  }
}
