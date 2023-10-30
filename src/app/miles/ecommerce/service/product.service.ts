import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    public requisicao:RequisicaoService
  ) { }

  all(){
    return this.requisicao.get('ecommerce.produto.loja');
  }

  home(){
    return this.requisicao.get('ecommerce.produto.home');
  }  

  categoria(categoria_id:number){
    return this.requisicao.get('ecommerce.produto.categoria',{
      _value:categoria_id
    });
  }

  get(_id:number){
    return this.requisicao.get('ecommerce.produto.get',{
      id:_id
    });

  }
}

