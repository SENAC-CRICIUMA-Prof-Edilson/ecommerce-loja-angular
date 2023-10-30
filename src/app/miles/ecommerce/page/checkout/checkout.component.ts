import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/miles/service/local-storage.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public steps: any;
  public subtotal:string  = 'R$ 0,00';
  public frete:string     = 'R$ 0,00';
  public total:string     = 'R$ 0,00';
  public current_step     = 0;
  constructor(
    public cart_service:CartService,
    public router:Router,
    public localstorage_service:LocalStorageService,
    public activated_route:ActivatedRoute
  ) {
    this.cart_service.on_update
    .subscribe(()=> this.init());
  }

  ngOnInit(): void {
    this.init();
    this.redirectStep();
  }

  init(){
    this.steps = [
      {label: 'Resumo', path:'resumo'},
      {label: 'Autenticação', path:'autenticacao'},
      {label: 'Endereço', path:'endereco'},
      {label: 'Entrega', path:'entrega'},
      {label: 'Pagamento', path:'pagamento'}
    ];
    this.refresh();
  }
  
  refresh(){
    this.setTotais();
  }
  setTotais(){
    this.subtotal = this.cart_service.getValorFormatado(this.cart_service.getSubTotal());
    this.frete    = this.cart_service.getValorFormatado(this.cart_service.getValorFrete());
    this.total    = this.cart_service.getValorFormatado(this.cart_service.getTotal());
  }

  nextStep(){    
    if (this.current_step < (this.steps.length -1)){
      this.goStep(++this.current_step);
    }
  }
  previousStep(){
    if (this.current_step > 0){
      this.goStep(--this.current_step);
    }
  }
  goStep(_index:number){
    this.current_step = _index;
    this.router.navigateByUrl('/checkout/' + this.steps[ _index ].path);
  }

  realinharStep(_path:string){
    let current_step:number = 0;
    switch(_path){
      case 'autenticacao': current_step = 1; break;
      case 'endereco': current_step = 2; break;
      case 'entrega': current_step = 3; break;
      case 'pagamento': current_step = 4; break;
      case 'resumo': 
      default:
        current_step = 0;
    }
    this.current_step = current_step;
  }
  redirectStep(){
    let route_confif:any = this.activated_route.snapshot.children[0].routeConfig;
    this.realinharStep(route_confif.path);
    if (
      this.current_step > 1 &&
      (route_confif.path == 'endereco' || route_confif.path == 'entrega' || route_confif.path == 'pagamento') &&
      !this.localstorage_service.get('_is_auth') 
    ){
      this.goStep(1);
    }    
  }
}