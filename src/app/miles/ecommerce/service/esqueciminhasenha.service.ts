import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';

@Injectable({
  providedIn: 'root'
})
export class EsqueciminhasenhaService {

  constructor(
    public requisicao_service:RequisicaoService
  ) { }

  send(_email:string){
    return this.requisicao_service.get('website.esqueciminhasenha.send',{
      email:_email
    });
  }
}
