import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../service/dashboard.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DashboardDadosComponent implements OnInit {
  public cliente:any = {
    id:0,
    nome:'',
    tipo:0,
    documento:'',
    email:'',
    telefone:''
  };
  constructor(
    public dashboard_service:DashboardService,
    private message_service: MessageService
  ) { }

  ngOnInit(): void {
    this.carregar();
  }

  carregar(){
    this.dashboard_service.carregarDadosCliente()
    .subscribe((_res:any) => {
      this.cliente = _res.data;
    });
  }

  alterar(){
    this.dashboard_service.alterarDadosCliente(this.cliente)
    .subscribe((_res:any)=>{
      if (_res.status == 'success'){
        this.message_service.add({key:'dashboard-dados',severity:'success', summary:'Tudo Certo!', detail:'Seus dados foram alterados com sucesso.'});
      }
      this.carregar();
    });
  }
}