import { Component, OnInit , ViewChildren, AfterContentInit} from '@angular/core';
import { LocalStorageService } from 'src/app/miles/service/local-storage.service';
import { CartService } from '../../../service/cart.service';
import { PagseguroService } from '../../../service/pagseguro.service';
import { Validar } from '../../../service/validar.service';
import { PoliticaPrivacidadeService } from '../../../service/politica-privacidade.service';
declare var $:any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit,AfterContentInit {
  public nome                 = '';
  public numero_cartao        = '';
  public validade             = '';
  public cvc                  = '';
  public cpf                  = '';
  public data_nascimento      = '';
  public telefone             = '';
  public politicaprivacidade  = '';

  // Inicializa o valor do crédito
  public valor_total      = this.cart_service.getTotal();

  @ViewChildren('required')  obrigatorios: any;
  
  public display_subtotal:any = '';
  public display_frete:any    = '';
  public display_total:any    = '';
  constructor(
    public pagseguro_service:PagseguroService,
    public _validar:Validar,
    public cart_service:CartService,
    public local_storage:LocalStorageService,
    public politica_service:PoliticaPrivacidadeService
  ) {

    this.pagseguro_service.on_finish_order
    .subscribe(
      (_res) => {
        this.showMessageFinishOrder(_res);
      }
    );



  }

  ngOnInit(): void {
    this.setValores();
    this.setCartoes();
    this.loadPolitica();
  }

  setValores(){
    this.display_subtotal = this.cart_service.getValorFormatado(this.cart_service.getTotal());
    this.display_frete    = this.cart_service.getValorFormatado(this.cart_service.getValorFrete());
    this.display_total    = this.cart_service.getValorFormatado(this.cart_service.getSubTotal());
  }
  ngAfterContentInit(): void {
	 	$("#btn-checkout-pagamento").removeClass("btn-default");
	 	$("#btn-checkout-pagamento").addClass("btn-warning");
  
     $("#cpf-cartao,#div-pagamento-boleto #cpftiular").mask("999.999.999-99");
     $("#telefone-cartao,#div-pagamento-boleto #telefone").mask("(99) 99999-9999");
     $("#datanascimento-cartao").mask("99/99/9999");
    
     $('#numerocartao').payment('formatCardNumber');
     $('#validade').payment('formatCardExpiry');
     $('#codigoseguranca').payment('formatCardCVC');

     this.setDadosCliente();
  }

  setDadosCliente(){
    let _cliente:any      = this.local_storage.get('_cart').cliente_obj;
    this.nome             = _cliente.nome;
    this.cpf              = _cliente.cpf;
    this.data_nascimento  = _cliente.datanascimento_formated;
    this.telefone         = _cliente.telefone;
  }
  setCartoes (){
     this.pagseguro_service.getBandeirasCartaoCredito();
  }

   loadParcelamento():boolean
   {
    this.pagseguro_service.valor_total  = this.valor_total;
    let numero_cartao           = this.numero_cartao;
	 	if (numero_cartao == "") {
       $('#numerocartao').parent().removeClass("has-error");
       $('#numerocartao').css("background-color","#FFFFFF");
       $("#msg-erro-numerocartao").hide();
       $("#parcelamento").attr("readonly",true);
     }else {
       if (!$.payment.validateCardNumber(numero_cartao)) {
           $('#numerocartao').parent().addClass("has-error");
           $('#numerocartao').css("background-color", "#ffe6e6");
           $("#msg-erro-numerocartao").html("Número do Cartão de Crédito é Inválido !");
           $("#msg-erro-numerocartao").show();
           return false;
       } else {
           $('#numerocartao').parent().removeClass("has-error");
           $('#numerocartao').css("background-color", "#FFFFFF");
           $("#msg-erro-numerocartao").hide();
       }
     }
     this.pagseguro_service.setParcelamento();
     this.pagseguro_service.getBrand(numero_cartao);
     return true;
   }

   checkValidade(){
     this.pagseguro_service.setValidade(this.validade);
   }

   checkCodigoSeguranca(){
     this.pagseguro_service.setCVC(this.cvc);
   }

   checkCPF(){
      if (!this._validar.isValidCPF(this.cpf) && this.cpf != ''){
        $(this).parent().addClass("has-error");
        $(this).css("background-color","#ffe6e6");
        $("#msg-erro-cpf-cartao").html("Número do Cartão de Crédito é Inválido !");
        $("#msg-erro-cpf-cartao").show();
      }else{
        $(this).parent().removeClass("has-error");
        $(this).css("background-color","#333");
        $("#msg-erro-cpf-cartao").hide();
      }
   }

   checkDataNascimento(){
      if (!this._validar.isValidData(this.data_nascimento) && this.data_nascimento != ''){
        $(this).parent().addClass("has-error");
        $(this).css("background-color","#ffe6e6");
        $("#msg-erro-datanascimento-cartao").html("Data de Nascimento é Inválido !");
        $("#msg-erro-datanascimento-cartao").show();
      }else{
        $(this).parent().removeClass("has-error");
        $(this).css("background-color","#333");
        $("#msg-erro-datanascimento-cartao").hide();
      }
   }
   checkTelefone(){
      if (!this._validar.isVvalidTelefone(this.telefone) && this.telefone != ''){
        $(this).parent().addClass("has-error");
        $(this).css("background-color","#ffe6e6");
        $("#msg-erro-telefone-cartao").html("Telefone é Inválido !");
        $("#msg-erro-telefone-cartao").show();
      }else{
        $(this).parent().removeClass("has-error");
        $(this).css("background-color","#333");
        $("#msg-erro-telefone-cartao").hide();
      }
   }

   finalizarCartao(){
      if (this._validar.isRequired(this.obrigatorios)){
         if (!$("#chktermo").is(":checked")){
          $("#msg-erro-politicaprivacidade").html("Você precisa aceitar os termos da <b>Política de Privacidade</b>.");
          $('#msg-erro-politicaprivacidade').show();
         }else{
          this.pagseguro_service.tokenCartao();
          $('#msg-erro-politicaprivacidade').hide();
         }
      }
   }  
   showMessageFinishOrder(_res:any){
    if (_res.status_code == 1 || _res.status_code == 2 || _res.status_code == 3){
      $('#retorno-pagamento-cartao').html('Compra Realizada com Sucesso !');  
      $('#retorno-pagamento-cartao').addClass('alert-success');
    }else{
      $('#retorno-pagamento-cartao').html('Erro na transação com Pagseguro.');
      $('#retorno-pagamento-cartao').addClass('alert-error');
    }
    $('#retorno-pagamento-cartao').show();
    $('.pagamento-cartaocredito').hide();
   }

  loadPolitica(){
    this.politica_service.load()
    .subscribe(
      (_res:any) => this.politicaprivacidade = _res.data.texto
    );
  }
}
