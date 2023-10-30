import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    public requisicao_service:RequisicaoService
  ) { }

  loadUf(){
    return this.requisicao_service.get('ecommerce.address.uf');
  }

  saveAddress(_data:any){
    return this.requisicao_service.get('ecommerce.address.save',_data);
  }
}
