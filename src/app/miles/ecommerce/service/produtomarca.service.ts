import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutomarcaService {

  constructor(
    public requisicao:RequisicaoService
  ) { }

  all(){
    // return this.requisicao.get({
    //   token:'9c372ce9eeaa680bc3c6a0252c711643',
    //   service:'ecommerce.produto.loja'
    // });
  }
}
