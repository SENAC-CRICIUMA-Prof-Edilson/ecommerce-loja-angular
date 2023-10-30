import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/miles/ecommerce/service/cart.service';
import { CartItemInterface } from '../../../interface/cart-item.interface';

declare var $:any;

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.css']
})
export class CartHeaderComponent implements OnInit {

  public data:Array<CartItemInterface>  = [];
  public totalitens               = 0;
  public _is_cart_header          = 'true';
  public valor_total              = '';
  public _quantidade_total_itens  = 0;
  constructor(
    public cart_service:CartService
  ) {
    this.cart_service.on_update
    .subscribe(
      (_item:any) => {
        this.set();
      }
    );
  }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.set();    
  }

  set(){
    let items = this.cart_service.getItens();
    if (items.length > 0){
      this.data = items;
    }
    this.reload();
  }

  setTotalItens()
  {
    this.data.forEach(
      (item:CartItemInterface) => {
        this.totalitens += item.quantidade * item.valor;
      }
    );
  }

  getTotalItens()
  {
    return this.cart_service.getValorFormatado(this.totalitens);
  }

  hideCart(){
    $('.dropdown-toggle').dropdown('toggle')
  }

  removeItem(item_id:number){
    this.cart_service.removeItem(item_id)
    .subscribe((items:any) => {
       let new_items = this.cart_service.removeItemLS(item_id);
       this.data = new_items;
       this.reload();
    });
  }

  msgVazioItens(){
    if (this.data.length > 0){
      $('.cart-list .alert').hide();
    }else{
      $('.cart-list .alert').show();
    }
  }

  getValorTotal(){
    return this.cart_service.getValorFormatado( this.cart_service.getTotal() );
  }

  reload(){
    this.msgVazioItens();
    this.setTotalItens();
    this.setValorTotal();
    this.setQuantidadeItens();
  }

  setValorTotal(){
    this.valor_total = this.getValorTotal();
  }

  getQuantidadeItens(){
    return this.cart_service.getQuantidadeItens();
  }

  setQuantidadeItens(){
    this._quantidade_total_itens = this.getQuantidadeItens();
  }

  fecharCarrinho(){
    $('#cart-header-dropdown').removeClass('open');
    $('#cart-header-dropdown').removeClass('close');
  }

  getValorFormatado(_valor:any){
    return this.cart_service.getValorFormatado(_valor);
  }
}