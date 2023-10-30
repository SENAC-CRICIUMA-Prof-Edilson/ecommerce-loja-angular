import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-correios',
  templateUrl: './correios.component.html',
  styleUrls: ['./correios.component.css']
})
export class CorreiosComponent implements OnInit {
  public logo         = '';
  public nome         = '';
  public loading2     = '';
  public cep_destino  = '';

  constructor() { }

  ngOnInit(): void {
  }

}
