import { Injectable } from '@angular/core';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

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
}