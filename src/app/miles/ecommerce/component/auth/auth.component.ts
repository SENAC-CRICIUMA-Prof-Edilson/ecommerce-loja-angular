import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { RequisicaoService } from '../../service/requisicao.service';

declare var $:any;
export interface UserData{
  nome:string,
  email:string,
  documento:string,
  tipo:number
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {  
  public is_auth:boolean  = false;  
  @Input() context:string = '';

  constructor(
    public requisicao_service:RequisicaoService,    
    public auth_service:AuthService,
    public router:Router
  ) {
    this.auth_service.on_is_auth
    .subscribe((_is_auth:boolean) => {
      this.is_auth = _is_auth;
      if (_is_auth){
        if (this.context == 'checkout'){
          this.router.navigateByUrl('/checkout/autenticacao');
        }else{
          this.router.navigateByUrl('/dashboard');
        }
      }
    });
  }

  ngOnInit(): void {
    this.is_auth = this.auth_service.isAuth();    
  }
}