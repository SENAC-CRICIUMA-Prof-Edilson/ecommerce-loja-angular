import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';
import { Subject } from 'rxjs';
import { ls } from 'src/environments/environment';
import { CartItemInterface } from '../interface/cart-item.interface';
import { CartInterface } from '../interface/cart.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public on_add_item:Subject<any> = new Subject<any>();
  public on_change:Subject<any> = new Subject<any>();
  public on_create:Subject<boolean> = new Subject<boolean>();
  public on_update:Subject<any> = new Subject<any>();
  public go_checkout:boolean = false;

  constructor(
    public requisicao_service:RequisicaoService,
    public router:Router
  ) {

    //this.on_create.subscribe();
  }

  // all(){
  //   return this.requisicao_service.get('ecommerce.carrinhocompras.list');
  // }

  addItem(_product:any,_quantidade:number = 1){
    return this.requisicao_service.get('ecommerce.carrinhocompras.item.add',{
      _cart_session:ls.get('_cart').sessionid,
      _product:_product.id,
      _quantity:this.getQuantidadeItem(_product.id,_quantidade),
      _price:_product.preco
    }).subscribe(
      (_res:any)=>{
        this.update();        
    });
  }

  getQuantidadeItem(_product_id:any,_quantidade:number){
    let _cart = ls.get('_cart');
    let _qtdade = 0;
    _cart.items.map(
      (_item:any) => {
        if (_item.produto.id == _product_id){
          _qtdade = _item.quantidade + _quantidade;
        }
      }
    );
    return _qtdade;
  }
  // Seta o item no LocalStorage a partir de uma requisição no WebService
  setLSItemFromWS(_item:any){
    let qtde        = parseInt(_item.qtde);
    let valor       = parseFloat(_item.valor);
    let valor_total = qtde * valor;
    let cart_item:CartItemInterface = {
      id:_item.id,
      descricao:_item.descricao,
      quantidade:qtde,
      valor:valor,
      total:valor_total,
      produto:_item.produto_obj,
      src:_item.produto_obj.imagemprincipal_src,
      formated_valor:this.getValorFormatado(_item.valor),
      formated_valortotal:this.getValorFormatado(valor_total)          
    };
    this.setLSItem(cart_item);
  }

  setLSItem(_item:any){
    if (!this.isExists()){
      console.warn('Carrinho de compras não foi criado!');
      return;
    }

    let _carrinho = this.current();
    _carrinho.items.push(_item);
    this.setLS(_carrinho);
    //this.on_add_item.next(_item);
  }

  createLS(){
    let _carrinho:CartInterface = {
      valorfrete:0,
      cliente:0,
      sessionid:'',
      items:[]
    };
    this.setLS(_carrinho);
    //this.on_create.next(true);
  }

  setLS(_carrinho:any){
    ls.set('_cart',_carrinho);
    this.on_update.next(_carrinho);
  }

  current(){
    return ls.get('_cart');
  }

  getItens(){
    if (!this.isExists()){
      console.warn('Carrinho de Compras não encontrado na sessão.');
      return [];
    };
    return this.current().items;
  }

  getSubTotal(){
    let subtotal:number = 0;
    this.getItens().forEach((_element:any)=>{
      subtotal += _element.valor * _element.quantidade;
    });
    return subtotal;
  }

  getValorFrete(){
    let valor_frete = 0;
    if (this.current().valorfrete == undefined){
      valor_frete = 0;
    }else{
      valor_frete = this.current().valorfrete;
    }
    return valor_frete;
  }

  getTotal(){
    let valor_subtotal  = this.getSubTotal();
    let valor_frete     = this.getValorFrete();

    return valor_subtotal + valor_frete;
  }

  getValorFormatado(valor:number = 0){
    return valor.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })
  }

  isExists(){
    let is_exists = this.current() == null ? false : true;
    // this.load().subscribe(
    //   (_res:any) => {
    //     if (!is_exists){
    //       this.createLS();
    //     }
    //     this.setLS(_res.data);
    //   }
    // );
    return is_exists;
  }

  // createCartLS(){
  //   if (!this.isExists()){
  //     //this.setLS(_carrinhocompras);
  //   }
  // }

  getQuantidadeItens(){
    let quantidade_itens:number = 0;
    this.getItens().forEach(
      (item:CartItemInterface) => {
        quantidade_itens += item.quantidade;
      }
    );
    return quantidade_itens;
  }

  removeItem(item_id:number){
    return this.requisicao_service.get('ecommerce.carrinhocompras.item.del',{
      _value:item_id
    });    
  }

  removeItemLS(item_id:number){    
    let _cart:CartInterface                   = this.current();
    let _cart_items:Array<CartItemInterface>  = _cart.items;
    let _new_cart_items:Array<CartItemInterface> = [];
    this.clearItemsLS();
    _cart_items.forEach((item:CartItemInterface)=>{
      if (item.id != item_id){
        _new_cart_items.push(item);
      }        
    });
    _cart.items = _new_cart_items;
    this.setLS(_cart);
    return _new_cart_items;
  }

  clearItemsLS(){
    let _cart:CartInterface = this.current();
    _cart.items.splice(0,_cart.items.length);
    this.setLS(_cart);
  }

  load(){
    return this.requisicao_service.get('ecommerce.carrinhocompras.create',
      ls.get('_cart')
    );
  }

  update(){
    if (this.isExists()){
      this.load().subscribe(
        (_res:any) => {
          this.setLS(_res.data);
          this.setLSItems(_res.data.items);          
          this.on_update.next(_res.data);
          if (this.go_checkout){
            this.router.navigate(['/checkout']);
          }
        }
      );
    }else{
      this.createLS();
    }
  }

  setLSItems(_items:any){
    this.clearItemsLS();
    _items.forEach(
      (_item:any) => {
        this.setLSItemFromWS(_item);
      }
    );
  }

  addItemGoCheckout(_product:any,_quantity:number = 1){
    this.go_checkout = true;
    this.addItem(_product,_quantity);
  }

  addCliente(_cliente:number){
    let _carrinho = this.current();
    _carrinho.cliente = _cliente;
    this.setLS(_carrinho);
    this.update();
  }
}