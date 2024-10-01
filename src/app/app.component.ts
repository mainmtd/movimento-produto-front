import { Component } from '@angular/core';
import { MovimentoProdutoComponent } from './movimento-produto/movimento-produto.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovimentoProdutoComponent],
  template: `<app-movimento-produto></app-movimento-produto>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'movimento-produto-front';
}
