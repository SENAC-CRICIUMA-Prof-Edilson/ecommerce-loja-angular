import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/miles/service/local-storage.service';
import { ls } from 'src/environments/environment';
import { DashboardService } from '../../../service/dashboard.service';

export interface AddressInterface {
  endereco:string,
  bairro:string,
  cidade:string,
  cep:string
}
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddresComponent implements OnInit {

  public address:AddressInterface = {
    endereco:'',
    bairro:'',
    cidade:'',
    cep:''
  };
  public is_auth:boolean = this.localstorage_service.get('_is_auth');
  constructor(
    public dashboard_service:DashboardService,
    public localstorage_service:LocalStorageService
  ) {

  }

  ngOnInit(): void {
    if (this.is_auth){
      this.loadAddressService();
    }
  }

  loadAddressService(){
    this.dashboard_service.carregarEnderecoCliente()
    .subscribe((_res:any) => {
      this.address = {
        endereco:_res.data.logradouro,
        bairro:_res.data.bairrodesc,
        cidade:_res.data.cidadedesc,
        cep:_res.data.cep
      }       
    });
  }  
}