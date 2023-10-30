import { Component, OnInit } from '@angular/core';
import { RedessociaisService } from '../../service/redessociais.service';

@Component({
  selector: 'app-redessociais',
  templateUrl: './redessociais.component.html',
  styleUrls: ['./redessociais.component.css']
})
export class RedessociaisComponent implements OnInit {
  public redes_sociais:Array<any> = [];
  constructor(
    public redessociais_service:RedessociaisService
  ) { }

  ngOnInit(): void {
    this.redessociais_service.listar()
    .subscribe(
      (_res:any)=>{
        this.redes_sociais = _res.data;
      }
    );
  }

}
