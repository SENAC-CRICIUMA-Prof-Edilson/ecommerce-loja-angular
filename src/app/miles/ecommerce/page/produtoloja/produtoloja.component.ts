import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/miles/ecommerce/service/product.service';
declare var $:any;

@Component({
  selector: 'app-produtoloja',
  templateUrl: './produtoloja.component.html',
  styleUrls: ['./produtoloja.component.css']
})
export class ProdutolojaComponent implements OnInit {

  public produto:any = { id:0, nome:'' };

  public data:Array<any> = [];
  public lojaProdutos:Array<any> = [];
  
  // DISPLAY RANGE IN FRONT END
  public $range = document.querySelector('.range');
  public $value = document.querySelector('.rangeDisplay');

  constructor(
    public lojaservice:ProductService,
    //public Arouter:ActivatedRoute,
    public router:Router
  ) { }

  ngOnInit(): void {

    // this.Arouter.params.subscribe(
    //   (params:any) => {
    //     if (params.id != undefined){
    //         this.produtoloja.produto(params.id)
    //         .subscribe(
    //           (res:any) => this.produto = res[0].dados[0]
    //         );
    //     }
    //   }
    // );
    this.lojaservice.all().subscribe(
      (res:any) => {
        this.lojaProdutos = res[0].data;
        console.log(res[0].data);
        this.setSlik();
      } 
       
    );
    $('.menu-toggle > a').on('click', function (e:any) {
      e.preventDefault();
      $('#responsive-nav').toggleClass('active');
    })
  
    // Fix cart dropdown from closing
    $('.cart-dropdown').on('click', function (e:any) {
      e.stopPropagation();
    });
  
    /////////////////////////////////////////
    
  
  
    // Products Widget Slick
    $('.products-widget-slick').each(function(index:number,element:any) {
      var $this = $(element),
          $nav = $this.attr('data-nav');
  
      $this.slick({
        infinite: true,
        autoplay: true,
        speed: 300,
        dots: false,
        arrows: true,
        appendArrows: $nav ? $nav : false,
      });
    });
  
    /////////////////////////////////////////
  
    // Product imgs Slick
    $('#product-imgs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
          breakpoint: 991,
          settings: {
            vertical: false,
            arrows: false,
            dots: true,
          }
        },
      ]
    });
  
    // Product img zoom
    var zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }


  }
        

 
  irDetalheProduto(produto_id:number){
    this.router.navigate(['produto/' + produto_id]);
  }
  
  setSlik(){
    setTimeout(function(){
      // Products Slick
      $('.products-slick').each(function(index:number,element:any) {
        var $this = $(element),
        $nav = $this.attr('data-nav');

        $this.slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
          speed: 300,
          dots: false,
          arrows: true,
          appendArrows: $nav ? $nav : false,
          responsive: [{
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
        {
          breakpoint: 480,
          settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          }
        },
        ]
        });
      });
  
    });	
  }
}