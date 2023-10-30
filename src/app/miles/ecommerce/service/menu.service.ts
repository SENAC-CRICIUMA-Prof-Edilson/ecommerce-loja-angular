import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    public requisicao:RequisicaoService
  ) { }

  all(){
    return this.requisicao.get('website.menu.get');
  }

  footer(){
    return this.requisicao.get('website.menu.get',{
      _op:'rodape'
    });
  }
}