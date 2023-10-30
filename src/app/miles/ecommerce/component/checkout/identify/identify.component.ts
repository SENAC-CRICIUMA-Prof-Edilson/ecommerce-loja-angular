import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/miles/service/local-storage.service';
import { ls } from 'src/environments/environment';
import { UserData } from '../../auth/auth.component';

@Component({
  selector: 'app-identify',
  templateUrl: './identify.component.html',
  styleUrls: ['./identify.component.css']
})
export class IdentifyComponent implements OnInit {
  public user_data:UserData;
  public is_auth:boolean = false;
  constructor(
    public local_storage:LocalStorageService
  ) {
    this.user_data = {
      nome:'',
      email:'',
      documento:'',
      tipo:0
    };    
  }

  ngOnInit(): void {
    this.is_auth = this.local_storage.get('_is_auth');
    this.setUserData(ls.get('_user'));
  }

  // TIPOS DE USUARIO
  // 1. Fisica
  // 2. Juridica

  setUserData(user_data:any){
    console.log(ls.get('_user'));
    this.user_data ={
      nome: user_data.nome,
      email:user_data.email,
      documento:(user_data.cpf + user_data.cnpj),
      tipo:user_data.tipo
    }
    console.log('CPF=>' + user_data.cpf);
    console.log('CNPJ=>' + user_data.cnpj);
    this.user_data.tipo == 1 ? this.user_data.documento = user_data.cpf : this.user_data.documento = user_data.cnpj; 
    this.testaTipo();
  }

  testaTipo(){
  
  }
}