import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DashboardService } from '../../../service/dashboard.service';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.css']
})
export class DashboardSenhaComponent implements OnInit {
  public password:string = '';
  public cpassword:string = '';
  constructor(
    public dashboard_service:DashboardService,
    private message_service: MessageService
  ) {}

  ngOnInit(): void {
  }

  alterarSenha(){
    if (this.password != this.cpassword){
      this.message_service.add({key:'dashboard-senha',severity:'error', summary:'Ops!', detail:'As senhas não coincidem.'});
      return;
    }
    if (this.password == '' || this.cpassword == ''){
      this.message_service.add({key:'dashboard-senha',severity:'warn', summary:'Ops!', detail:'O campo senha não pode ser vazio.'});
      return;      
    }
    this.dashboard_service.alterarSenha(this.password).subscribe(
      (_res:any)=>{
        if (_res.status == 'success'){
          this.message_service.add({key:'dashboard-senha',severity:'success', summary:'Tudo Certo!', detail:'Senha alterada com sucesso.'});
        }
      }
    );
  }

}