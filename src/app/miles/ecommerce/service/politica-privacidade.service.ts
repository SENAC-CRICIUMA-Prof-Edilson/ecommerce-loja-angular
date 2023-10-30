import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';

@Injectable({
  providedIn: 'root'
})
export class PoliticaPrivacidadeService {

  constructor(
    public requisicao_service:RequisicaoService
  ) { }

  load(){
    return this.requisicao_service.get('website.politicaprivacidade.get');
  }
}