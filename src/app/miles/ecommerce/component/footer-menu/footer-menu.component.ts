import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.css']
})
export class FooterMenuComponent implements OnInit {
  public menu:Array<any> = [];
  constructor(
    public menu_service:MenuService
  ) { }

  ngOnInit(): void {
    this.menu_service.footer()
    .subscribe(
      (_res:any)=>{
        this.menu = _res.data;
      }
    );
  }

  getIcone(fixo:string = ''){
    let retorno:string = '';
    switch(fixo){
      case 'telefone':
        retorno = 'fa fa-phone';
      break;
      case 'email':
        retorno = 'fa fa-envelope-o';
      break;
      case 'endereco':
        retorno = 'fa fa-map-marker';
      break;
    }
    return retorno;
  }
}
