import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NewsletterService } from '../../service/newsletter.service';

declare var $:any;

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  public email_newsletter:string = '';
  constructor(
    public newsletter_service:NewsletterService,
    private message_service: MessageService
  ) {}

  ngOnInit(): void {
  }

  add(){
    if (this.email_newsletter == ''){
      $('.newsletter-input,.newsletter-btn').css('border','2px solid #FF0000');
      $('.newsletter-input').css('background-color','#FFEEDD');
      this.message_service.add({key:'newsletter',severity:'error', summary:'Ops!', detail:'Você precisa digitar um e-mail.'});
      return;
    }
    this.newsletter_service.add(this.email_newsletter)
    .subscribe(
      (_res:any)=>{
        if (_res.status == 'success'){
          this.message_service.add({key:'newsletter',severity:'success', summary:'Tudo Certo!', detail:'Cadastro realizado com sucesso.'});
          this.email_newsletter = '';
        }else{
          this.message_service.add({key:'newsletter',severity:'error', summary:'Ops!', detail:_res.msg});
        }
      }
    );
  }

}