import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';

@Injectable({
  providedIn: 'root'
})
export class RedessociaisService {

  constructor(
    public requisicao_service:RequisicaoService
  ) { }

  listar(){
    return this.requisicao_service.get('website.redessociais.list');
  }
}