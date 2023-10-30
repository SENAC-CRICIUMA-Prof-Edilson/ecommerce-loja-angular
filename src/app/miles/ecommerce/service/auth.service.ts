import { Injectable } from '@angular/core';
import { ls } from 'src/environments/environment';
import { RequisicaoService } from './requisicao.service';
import { Subject } from 'rxjs';
import { CartService } from './cart.service';

declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public on_is_auth:Subject<boolean> = new Subject<boolean>();
  constructor(
    public requisicao_service:RequisicaoService,
    public cart_service:CartService
  ) { }

  logon(_email:string,_senha:string){
    return this.requisicao_service.get('ecommerce.logon.auth',{
      email: _email,
      senha: _senha
    });
  }

  setAuth(_data:any){
    ls.set('_user',_data.user);
    ls.set('_user_id',_data.user.id);
    ls.set('_is_auth',true);
    ls.set('tipo',_data.tipo)
    this.setAccessToken(_data._token_access);
    this.cart_service.addCliente(_data.user.id);
    this.on_is_auth.next(true);
  }

  setAccessToken(_token:string){
    ls.set('_token_access',_token);
  }

  getAccessToken(){
    return ls.get('_token_access');
  }

  isAuth():boolean{
    return ls.get('_is_auth');
  }

  logOut(){
    ls.set('_user_id',0);
    ls.set('_user',{});
    ls.set('_is_auth',false);
    ls.set('_token_access','');
    this.on_is_auth.next(false);
  }
}