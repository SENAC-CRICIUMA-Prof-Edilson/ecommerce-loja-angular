import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoshomeService {

  constructor(
    public requisicao:RequisicaoService
  ) { }

  all(){
  //   return this.requisicao.get({
  //     token:'9c372ce9eeaa680bc3c6a0252c711643',
  //     service:'ecommerce.produto.home'
  // });
  }

  produto(produto_id:number){
  //   return this.requisicao.get({
  //     token:'9c372ce9eeaa680bc3c6a0252c711643',
  //     service:'ecommerce.produto.get',
  //     id:produto_id
  // });    
  }
}
