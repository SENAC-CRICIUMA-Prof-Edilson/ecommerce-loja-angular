import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../service/cart.service';
import { ProductService } from '../../../service/product.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public produto:any = {
    id:0,
    nome:''
  };
  
  public quantity = 1;
  public product_img_src = '';
  public imagemextra_src: Array<string> = [];
  public exists_img = false;
  constructor(
    public product_service:ProductService,
    public active_route:ActivatedRoute,
    public cart_service:CartService,
    public router:Router
  ) {}

  ngOnInit(): void {
    this.active_route.params.subscribe(
      (params:any) => {
        if (params.id != undefined){
            this.product_service.get(params.id)
            .subscribe(
              (res:any) => {
                this.produto = res.data;
                this.product_img_src = this.produto.imagens[0].imagem_src; 
              }
            );
        }
      }
    );
  }

  addCart(){
    this.cart_service.addItemGoCheckout(this.produto,this.quantity);
  }

  setImagePrincipal(src: string){
    this.product_img_src= src;
  }

}
