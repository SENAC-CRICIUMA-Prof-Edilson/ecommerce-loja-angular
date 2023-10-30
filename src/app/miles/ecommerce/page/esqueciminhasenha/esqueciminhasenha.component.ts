import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EsqueciminhasenhaService } from '../../service/esqueciminhasenha.service';

declare var $:any;
@Component({
  selector: 'app-esqueciminhasenha',
  templateUrl: './esqueciminhasenha.component.html',
  styleUrls: ['./esqueciminhasenha.component.css']
})
export class EsqueciminhasenhaComponent implements OnInit {
  public email_esqueciminhasenha:string = '';
  constructor(
    public esqueciminhasenha_service:EsqueciminhasenhaService,
    private message_service: MessageService
  ) {}

  ngOnInit(): void {

  }

  verifica(){
    if (this.email_esqueciminhasenha != ''){
      this.resetCampo();
    }
  }

  send(){
     if (this.email_esqueciminhasenha == ''){
       $('.esqueciminhasenha-input').css('border','2px solid #FF0000');
       $('.esqueciminhasenha-input').css('background-color','#FFEEDD');
       this.message_service.add({key:'esqueciminhasenha',severity:'error', summary:'Ops!', detail:'Você precisa digitar um e-mail.'});
       return;
     }
     this.esqueciminhasenha_service.send(this.email_esqueciminhasenha)
     .subscribe(
       (_res:any)=>{
         if (_res.status == 'success'){
           this.message_service.add({key:'esqueciminhasenha',severity:'success', summary:'Tudo Certo!', detail:'Cadastro realizado com sucesso.'});
           this.limparCampo();
         }else{
           this.message_service.add({key:'esqueciminhasenha',severity:'error', summary:'Ops!', detail:_res.msg});
         }
       }
     );
  }  

  resetCampo(){
    $('.esqueciminhasenha-input').css('border','1px solid #CCC');
    $('.esqueciminhasenha-input').css('background-color','#FFF');    
  }

  limparCampo(){
    this.email_esqueciminhasenha = '';
    this.resetCampo();    
  }
}
