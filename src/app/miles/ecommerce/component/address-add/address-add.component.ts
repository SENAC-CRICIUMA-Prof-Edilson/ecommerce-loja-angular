import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from 'src/app/miles/service/local-storage.service';
import { AddressService } from '../../service/address.service';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.css']
})
export class AddressAddComponent implements OnInit {
  public id:number = 0;
  public estados:Array<any> = [];
  public uf:number = 24;
  public cidade:string = '';
  public bairro:string = '';
  public logradouro:string = '';
  public numero:string = '';
  public complemento = ''
  public cep:string = '';

  constructor(
    public address_service:AddressService,
    public dashboard_service:DashboardService,
    public localstorage_service:LocalStorageService,
    private message_service: MessageService
  ) { }

  ngOnInit(): void {
    this.loadUF();
    this.load();
  }
  load(){
    this.dashboard_service.carregarEnderecoCliente()
    .subscribe(
      (_res:any)=>{
        this.id           = _res.data.id;
        this.uf           = _res.data.ufid;
        this.cidade       = _res.data.cidadedesc;
        this.bairro       = _res.data.bairrodesc;
        this.logradouro   = _res.data.logradouro;
        this.numero       = _res.data.numero;
        this.complemento  = _res.data.complemento;
        this.cep          = _res.data.cep;
      }
    );
  }
  loadUF(){
    this.address_service.loadUf()
    .subscribe(
      (_res:any)=>{
        this.estados = _res.data;
      }
    );
  }
  salvar(){
    this.address_service.saveAddress({
      id:this.id,
      uf:this.uf,
      cidade:this.cidade,
      bairro:this.bairro,
      logradouro:this.logradouro,
      numero:this.numero,
      complemento:this.complemento,
      cep:this.cep
    })
    .subscribe(
      (_res:any) => {
        if (_res.status == 'success'){
          this.message_service.add({key:'dashboard-address-add',severity:'success', summary:'Tudo Certo!', detail:'Seus dados foram alterados com sucesso.'});
        }
      }
    );
  }
}