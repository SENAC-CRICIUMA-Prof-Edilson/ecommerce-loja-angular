import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(
    public requisicao_service:RequisicaoService
  ) { }

  add(email:string,nome:string = ''){
    return this.requisicao_service.get('website.newsletter.add',{
      email:email,
      nome:nome
    });
  }
}