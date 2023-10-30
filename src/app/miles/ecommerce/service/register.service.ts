import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    public requisicao_service:RequisicaoService
  ) { }

  verify(op:string,value:string){
    return this.requisicao_service.get('ecommerce.register.verify',{
      _op:op,
      _value:value
    });
  }

  add(dados:any){
      return this.requisicao_service.get('ecommerce.register.add',{
        _data:JSON.stringify(dados)
      });
  }
}