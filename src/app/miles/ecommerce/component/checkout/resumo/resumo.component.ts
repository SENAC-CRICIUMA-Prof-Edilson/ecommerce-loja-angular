import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.css']
})
export class ResumoComponent implements OnInit {
  public cart_items:Array<any> = [];

  public totais:Array<any> = [
    {label:'Subtotal',code:'0'},
    {label:'Frete',code:'0'},
    {label:'Total',code:'0'}
  ];

  public carrinho_vazio:Array<any> = [];
  constructor(
    public cart_service:CartService,
    private messageService: MessageService
  ){
    this.cart_service.on_update
    .subscribe(() => this.ngOnInit());
  }

  ngOnInit(): void {
    this.cart_items = this.cart_service.getItens(); 
  }
  
  getItens(){
    return this.cart_service.getSubTotal();
  }
}
