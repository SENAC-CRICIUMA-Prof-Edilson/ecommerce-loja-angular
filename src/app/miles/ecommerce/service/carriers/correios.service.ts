import { Injectable } from '@angular/core';
import { RequisicaoService } from '../requisicao.service';

declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class CorreiosService {
  public project            = 1;
  public cep_origem         = '';
  public cep_destino        = '';
  public selector_loading   = '.media-correios .loading2-view-calculo-frete';
  public elemento           = '';

  constructor(
    public requisicao_service:RequisicaoService
  ) { }

  calcularFrete(cep_destino:string){
    return this.requisicao_service.get('ecommerce.correios.calcularfrete',{
      cep:cep_destino
    });
  }

  setValores(servico:any){
    $("#correios-servico").html(this.getServicoDescricao(servico.Codigo));
    $("#correios-prazo").html(servico.PrazoEntrega + ' dia' + (servico.PrazoEntrega == 1 ? '' : 's'));
    $("#correios-valortotal").html(servico.Valor.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }));
    let valorfrete = servico.Valor.replace('.', '').replace(',', '.');
    //carrinho.setValorFrete(parseFloat(valorfrete));
    //carrinho.setValorTotal();
  }

  setElemento(elemento:any) {
    var instancia = this;
    this.elemento = elemento;
    elemento.change(() => {
        //this.calcularFrete();
    });
  }

  getServicoDescricao(codigo:number){
    switch (codigo) {
        case 40010:
        case 4014:
          return 'SEDEX';
        default:
          return codigo;
    }
  }
}