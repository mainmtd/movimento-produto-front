import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovimentoProdutoService } from './movimento-produto.service';
import { Produto, Movimento } from './models';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-movimento-produto',
  standalone: true,
  templateUrl: './movimento-produto.component.html',
  styleUrls: ['./movimento-produto.component.scss'],
  imports: [FormsModule, CommonModule, NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask()]
})
export class MovimentoProdutoComponent implements OnInit {
  produtos: Produto[] = [];
  cosifs: { codCosif: string; codClassificacao: string }[] = [];
  selectedProduto: string = '';
  movimento: Movimento = {
    datMes: null,
    datAno: null,
    codProduto: '',
    codCosif: '',
    descricao: '',
    descricaoProduto: '',
    numLancamento: 0,
    dataMovimento: new Date().toISOString(),
    codUsuario: 'TESTE',
    valor: null,
  };
  movimentos: Movimento[] = [];
  formEnabled: boolean = false;
  alertMessage: string = '';
  alertType: string = '';

  constructor(private movimentoProdutoService: MovimentoProdutoService) {}

  ngOnInit() {
    this.loadProdutos();
    this.loadMovimentos();
  }

  loadProdutos() {
    this.movimentoProdutoService.getProdutos().subscribe((data: Produto[]) => {
      this.produtos = data;
    });
  }

  loadMovimentos() {
    this.movimentoProdutoService.getMovimentos().subscribe((data: Movimento[]) => {
      this.movimentos = data;
    });
  }

  createMovimento() {
    const movimentoComProduto = {
      ...this.movimento,
      codProduto: this.selectedProduto,
    };

    this.movimentoProdutoService.createMovimento(movimentoComProduto).subscribe(
      (response: string) => {
        console.log('Movimento criado com sucesso:', response);
        this.loadMovimentos();
        this.clearForm();
        this.showAlert('Movimento criado com sucesso!', 'success');
      },
      (error: any) => {
        console.error('Erro ao criar movimento:', error);
        this.showAlert('Erro ao criar movimento. Tente novamente.', 'danger');
      }
    );
  }

  showAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;

    setTimeout(() => {
      this.alertMessage = '';
      this.alertType = '';
    }, 5000);
  }

  onProdutoChange() {
    const produtoSelecionado = this.produtos.find(prod => prod.codProduto === this.selectedProduto);
    
    if (produtoSelecionado) {
      this.cosifs = produtoSelecionado.cosifs;
      this.movimento.codCosif = '';
    } else {
      this.cosifs = [];
    }
  }
  formatarLancamento(numLancamento: number): string {
    return numLancamento.toString().padStart(3, '0');
  }

  toggleForm() {
    if (!this.formEnabled) {
      this.formEnabled = true;
    }
  }

  clearForm() {
    this.resetForm(); 
    this.formEnabled = false;
  }

  resetForm() {
    this.movimento = {
      datMes: null,
      datAno: null,
      codProduto: '',
      codCosif: '',
      descricao: '',
      descricaoProduto: '',
      numLancamento: -1,
      dataMovimento: new Date().toISOString(),
      codUsuario: 'TESTE',
      valor: null,
    };
    this.selectedProduto = '';
    this.cosifs = [];
  }

  validateMesAno() {
    if (this.movimento.datMes === null || this.movimento.datMes === undefined) {
      return;
    }
    if (this.movimento.datMes < 1) {
      this.movimento.datMes = 1;
    } else if (this.movimento.datMes > 12) {
      this.movimento.datMes = 12;
    }
  
    if (this.movimento.datAno !== null && this.movimento.datAno < 0) {
      this.movimento.datAno = new Date().getFullYear();
    }
  }
  
  formatarValor() {
    if (this.movimento.valor !== null && this.movimento.valor < 0) {
      this.movimento.valor = this.movimento.valor * -1;
    }
  
    if (this.movimento.valor !== null && !isNaN(this.movimento.valor)) {
      this.movimento.valor = parseFloat(this.movimento.valor.toFixed(2));
    }
  }

  isFormValid(): boolean {
    return !!(
      this.movimento.datMes && 
      this.movimento.datMes >= 1 && this.movimento.datMes <= 12 &&
      this.movimento.datAno && 
      this.movimento.datAno > 0 &&
      this.selectedProduto &&
      this.movimento.codCosif &&
      this.movimento.valor && 
      this.movimento.valor >= 0 &&
      this.movimento.descricao
    );
  }
}
