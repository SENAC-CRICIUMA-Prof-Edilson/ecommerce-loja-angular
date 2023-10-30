import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { RequisicaoService } from './requisicao.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    public requisicao_service:RequisicaoService,
    public local_storage:LocalStorageService
  ) {}

  carregarDadosCliente(){
    return this.requisicao_service.get('ecommerce.customer.get',{
      _id:this.local_storage.get('_user_id')
    });
  }
  alterarDadosCliente(data:any){
    return this.requisicao_service.get('ecommerce.customer.alter',{
      _data:JSON.stringify(data)
    });
  }

  carregarEnderecoCliente(){
    return this.requisicao_service.get('ecommerce.customer.address',{
      _op:'get',
      _id:this.local_storage.get('_user_id')
    });
  }
 
  alterarSenha(pwd:any){
    return this.requisicao_service.get('ecommerce.customer.password',{
      _op:'change',
      _customer_id:this.local_storage.get('_user_id'),
      _pwd:pwd
    });
  }
}