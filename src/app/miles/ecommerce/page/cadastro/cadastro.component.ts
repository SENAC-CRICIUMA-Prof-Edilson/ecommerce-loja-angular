import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AddressService } from '../../service/address.service';
import { AuthService } from '../../service/auth.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { PoliticaPrivacidadeService } from '../../service/politica-privacidade.service';
import { RegisterService } from '../../service/register.service';

declare var $:any;

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit,AfterViewInit {

  public label_name       = 'Nome';
  public email:string     = '';
  public cpf:string       = '';
  public cnpj:string      = '';
  public required_fields  = new Array("nome","endereco","cep","endereco","bairro","cidade","estado","telefone","email","senha","csenha");
  constructor(
    public address_service: AddressService,
    public register_service:RegisterService,
    public politica_privacidade_service:PoliticaPrivacidadeService,
    public local_storage:LocalStorageService,
    private message_service: MessageService,
    public router:Router,
    public auth_service:AuthService
  ) { }

  ngOnInit(): void {
    this.chanceTipo();
    this.mask();
    this.loadPoliticaPrivacidade();
  }

  ngAfterViewInit(): void {
    this.onblurRequired();
  }
  chanceTipo(){
    $("#tipo").change((event:any) => {
      if (parseInt($(event.target).val()) == 1){
        $("#pessoafisicacadastro").show();
        $("#pessoajuridicacadastro").hide();
        this.label_name = 'Nome';
       }else{
        $("#pessoafisicacadastro").hide();
        $("#pessoajuridicacadastro").show();
        this.label_name = 'Razão Social';
      }
    });
  }

  mask(){
    $("#telefone").mask("(99) 9999-99999");
    $("#cnpj")    .mask("99.999.999/9999-99");
    $("#cep")     .mask("99999-999");
    $("#cpf")     .mask("999.999.999-99");
  }

  verify(op:string){
    let selector = '#' + op;
    let value = $(selector).val();
    if (value != ''){
      this.register_service.verify(op,value)
      .subscribe(
        (res:any) => {
          if (res.status == 'error'){
            this.setError(op,res.msg);
          }else{
            this.setDefault(op);
          }
        }
      );
    }else{
      this.setDefault(op);
    }    
  }

	validar():boolean {
    let is_valid  = true;
		this.required_fields.forEach((campo:string) => {
			if ($("#" + campo).val() == '' && is_valid){
        this.setError(campo);
			 	setTimeout(function(){
			 		$("#" + campo).focus();
			 	},100);
        is_valid = false;
        return;
			}
    });

    if (!is_valid) return false;
		if ($("#senha").val() != $("#csenha").val()){
      this.setError('senha','Senhas não coincidem');
      return false;
		}

		if ($("#senha").val().length < 8){

      this.setError('senha','Senha precisa ter pelo menos 8 digitos.');
      return false;
		}
    if (!$('#chktermo').is(':checked')){
      $('.politicaprivacidade-box').css("border","2px solid #DD0000");
      return false;
    }
		return true;
	}

  setError(field:string,msg:string = ''){
    $('#' + field).parents(".form-group").addClass("has-error");
    $('#' + field).css("background-color","#ffe7e7");
    if (msg != ''){
      $('#error-' + field).show(300);
      $('#error-' + field).html(msg);
    }
  }

  setDefault(field:string){
    $('#' + field).parents(".form-group").removeClass("has-error");
    $('#' + field).css("background-color","#FFF");
    $('#error-' + field).hide(100);
    $('#error-' + field).html('');
  }

  addTipoPessoa(){
    $('#tipo').val() == 1 ? this.required_fields.push('cpf') : this.required_fields.push('cnpj');
  }

  salvar():boolean {
    this.addTipoPessoa();
		if(!this.validar()){
			return false;
		}else{
      $('#aceite-checkbox').removeClass('nao-aceite');
    this.register_service.add({
      tipo:$("#tipo").val(),
      nome:$("#nome").val(),
      telefone:$("#telefone").val(),
      cpf:$("#cpf").val(),
      cnpj:$("#cnpj").val(),
      email:$("#email").val(),
      senha:$("#senha").val(),
      csenha:$("#csenha").val(),
      endereco:$("#endereco").val(),
      bairro:$("#bairro").val(),
      numero:$("#numero").val(),
      cep:$("#cep").val(),
      cidade:$("#cidade").val(),
      estado:$("#estado").val(),
      complemento:$("#complemento").val()
    })
    .subscribe((_res:any) => {
      if (_res.status == 'success'){
        this.auth_service.setAuth(_res.data);
        this.message_service.add({key:'cadastro',severity:'success', summary:'Tudo Certo!', detail:'Cadastro realizado com sucesso.'});
        // this.sendAddress();
        this.router.navigate(['/dashboard']);
      }
    });
    return true;
  }}

  sendAddress(){
    this.address_service.saveAddress({
      endereco:$("#endereco").val(),
      bairro:$("#bairro").val(),
      numero:$("#numero").val(),
      cep:$("#cep").val(),
      cidade:$("#cidade").val(),
      estado:$("#estado").val(),
      complemento:$("#complemento").val(),
    });
  }

  onblurRequired(){
		this.required_fields.forEach((campo:string) => {
      $("#" + campo).blur(
        (element:any) => {
          if ($(element.target).val() != ''){
            this.setDefault(campo);
          }
        }
      );
    });
  }

  loadPoliticaPrivacidade(){
    this.politica_privacidade_service.load()
    .subscribe(
      (response:any) => {
        $('#politicaprivacidade-text').html(response.data.texto);
      }
    );
  }
}