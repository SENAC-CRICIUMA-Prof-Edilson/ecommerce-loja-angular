import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/miles/service/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public menu:Array<any> = [
    {label:'Meus Dados', path:'dados', icon:'fa fa-user'},
    {label:'Meu Endereço', path:'endereco', icon:'fas fa-location-dot'},
    {label:'Meus Pedidos', path:'pedido', icon:'fas fa-gift'},
    {label:'Alterar Senha', path:'alterarsenha', icon:'fas fa-key'}
  ];
  constructor(
    public local_storage:LocalStorageService
  ) {}

  ngOnInit(): void {
  }

}
