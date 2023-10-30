import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../service/product.service';

declare var $:any;
@Component({
  selector: 'app-produto-categoria',
  templateUrl: './produto-categoria.component.html',
  styleUrls: ['./produto-categoria.component.css']
})
export class ProdutoCategoriaComponent implements OnInit {
  public products:Array<any> 	= [];
  @ViewChild('product_list_categoria') _product_list:any;
  public categoria_id:number    = 0;
  public _first                 = true;
  public categoria_desc:string  = '';
  public msg:any = [];

  constructor(
    public product_service:ProductService,
    public active_route:ActivatedRoute,
    public message_sevice:MessageService

  ) {
    this.active_route.params
    .subscribe(
      (_params:any) => {
        this.categoria_id   = _params.id;
        this.categoria_desc = _params.descricao;
        this.loadProducts();
      }
   );
  }

  ngOnInit(): void {
    //this.loadProducts();
  }
  loadProducts(){
    this.product_service.categoria(this.categoria_id).subscribe(
      (res:any) => {
        this.products = res.data;
        if (res.data.length > 0){
          this.categoria_desc = res.data[0].categoria_desc;
          this._product_list.setSlik();
          this.hideMessage();
        }else{
          this.noProducts();
        }
      }
    );
  }

  noProducts(){
    this.showMessage();
  }

  showMessage(){
    this.msg = [{
      key:'categoria',
      severity:'warn', 
      summary:'Categoria', 
      detail:'Não encontramos nenhum produto cadastrado nessa categoria.'      
    }];
  }

  hideMessage(){
    this.msg = [];
  }
}