import { Component, OnInit, AfterContentInit  } from '@angular/core';
import { LocalStorageService } from 'src/app/miles/service/local-storage.service';
import { ls } from 'src/environments/environment';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header-logon',
  templateUrl: './header-logon.component.html',
  styleUrls: ['./header-logon.component.css']
})
export class HeaderLogonComponent implements AfterContentInit   {
  public is_auth:boolean = this.local_storage.get('_is_auth');
  public logged_on:string = 'inline';
  public logged_off:string = 'none';
  public usuario:any = {
    nome:''
  }; 
  constructor(
    public local_storage:LocalStorageService,
    public auth_service:AuthService
  ) {

    this.auth_service.on_is_auth
    .subscribe((_is_auth:boolean) => this.chanceLogged(_is_auth));
  }

    ngAfterContentInit(): void {
    this.chanceLogged(this.local_storage.get('_is_auth'));
  }

  chanceLogged(is_logged:boolean){
    this.logged_on  = is_logged ? 'inline'  : 'none';
    this.logged_off = is_logged ? 'none'    : 'inline';
    this.setUsuario();
  }

  setUsuario(){
    let _user = this.local_storage.get('_user')
    if (_user != null){
      this.usuario = _user;
    }
  }
  
}