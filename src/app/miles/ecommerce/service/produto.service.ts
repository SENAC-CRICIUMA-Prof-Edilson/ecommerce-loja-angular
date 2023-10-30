import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    public requisicao:RequisicaoService
  ) { }

  all(){
    return this.requisicao.get('ecommerce.produto.home');
  }

  produto(produto_id:number){
    return this.requisicao.get('ecommerce.produto.get',
    {
      id:produto_id
    });    
  }
}
