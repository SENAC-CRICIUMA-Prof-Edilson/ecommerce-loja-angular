import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/miles/ecommerce/service/produto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtodetalhe',
  templateUrl: './produtodetalhe.component.html',
  styleUrls: ['./produtodetalhe.component.css']
})

export class ProdutodetalheComponent implements OnInit {

  public produto:any = {
    id:0,
    nome:''
  };

  constructor(
    public homeservice:ProdutoService,
    public router:ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.router.params.subscribe(
      (params:any) => {
        if (params.id != undefined){
            this.homeservice.produto(params.id)
            .subscribe(
              (res:any) => this.produto = res.dados[0]
            );
        }
      }
    );
    // this.homeservice.all().subscribe(
    //   (res:any) => {
    //     this.homeProdutos = res[0].data;
    //     console.log(res[0].data);
    //   }
  
    // );
  }

}
