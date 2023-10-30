import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { noImage } from 'src/environments/environment';
import { ProductInterface } from '../../../interface/product.interface';
import { CartService } from '../../../service/cart.service';
declare var $:any;

@Component({
  selector: 'app-product-item-list',
  templateUrl: './product-item-list.component.html',
  styleUrls: ['./product-item-list.component.css']
})
export class ProductItemListComponent implements OnInit {
  @Input() products:Array<ProductInterface> 	= [];  

  // DISPLAY RANGE IN FRONT END
  public $range = document.querySelector('.range');
  public $value = document.querySelector('.rangeDisplay');

  public _id:any  = '';
  public _slick:any; 
  public confirm_header:string = '';
  constructor(
    public router:Router,
    public confirmation_service:ConfirmationService,
    public cart_service:CartService,  
  ) {
    this._id = 'tab-' + new Date().getTime();
  }

  ngOnInit(): void {
  }

  updateSlick(){
    let $this = $('#' + this._id);
    $this.remove()
  }

  getSrc(imagens: Array<any>):string{
    let src = '';
    imagens.forEach(imagem => {
      imagem.is_principal == 1 ? true : false;
      src = imagem.imagem_src;
    });
    return src == '' ? noImage : src;
  }

  setSlik(){
    setTimeout(() => {
      $('#' + this._id).not('.slick-initialized').slick({
        slidesToShow: 4, 
        slidesToScroll: 1,
        infinite:true
      });
    });
  }

  irDetalheProduto(produto_id:number){
    this.router.navigate(['produto/' + produto_id]);
  }

  addCart(produto:any){
    this.confirm_header = 'Carrinho de Compras';
    this.confirmation_service.confirm({
      message: 'Tem certeza que deseja adicionar este produto no carrinho de compras ?',
      accept: () => {
        this.cart_service.addItem(produto);
      }
    });
  }

   addItemCart(_product:any,_quantity:number = 1){
    this.confirm_header = 'Finalizar Pedido';
    this.confirmation_service.confirm({
      message: 'Tem certeza que deseja adicionar este produto no carrinho de compras e finalizar o pedido ?',
      accept:() => {
        this.cart_service.addItemGoCheckout(_product,_quantity);
      }
    });
  }

  scrollTop(){
    document.documentElement.scrollTop = 0;
  }
}
