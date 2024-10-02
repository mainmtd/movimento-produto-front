export interface Produto {
    codProduto: string;
    desProduto: string;
    cosifs: Cosif[];
  }
  
  export interface Cosif {
    codCosif: string;
    codClassificacao: string;
  }
  
  export interface Movimento {
    datMes: number | null;
    datAno: number | null;
    codProduto: string;
    codCosif: string;
    descricao: string;
    dataMovimento: string;
    descricaoProduto: string;
    numLancamento: number;
    codUsuario: string;
    valor: number | null;
  }
  