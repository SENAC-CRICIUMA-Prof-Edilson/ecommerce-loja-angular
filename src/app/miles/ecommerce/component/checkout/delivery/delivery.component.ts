import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}



// let retorno = JSON.parse(ret.responseText);
// let dados = retorno[0].dados;
// let servico = dados.CalcPrecoPrazoResult.Servicos.cServico;

// instancia.setValores(servico);
// $(instancia.selector_loading).hide();