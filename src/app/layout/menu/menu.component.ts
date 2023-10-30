import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/miles/ecommerce/service/menu.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public data:Array<any> = [];
  public on_change:Subject<number> = new Subject<number>();
  constructor(
	  public menuPrincipal:MenuService,
    public router:Router
  ) { }

  ngOnInit(): void {

    // Carregando do Miles
    this.menuPrincipal.all().subscribe(
      (res:any) => {
        this.data = res.data.map(
          (d:any) => {
            d.active = d.id == 1 ? 'active' : ''
            return d;
          }
        );
      }
    );
  }

  goPage(_menu:any){    
    this.setActive(_menu.id);
    let path = '';
    if (_menu.fixo == 'home'){
      path = '/home';
    }else{
      path = _menu.fixo + '/' + _menu.descricao + '/' + _menu.link;
    }
    this.router.navigateByUrl(path);
  }

  setActive(_id:number){    
    this.data.forEach(
      (d:any) => {
        d.active = d.id == _id ? 'active' : '';
      }
    );
  } 
}