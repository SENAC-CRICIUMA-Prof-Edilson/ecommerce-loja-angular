import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { miles } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {

  constructor(
    public http:HttpClient
  ) { }

  get(_service:string,_params:any = {}){
    // Adiciona token da requisição
    _params._token    = miles.token; 
    // Adiciona o pacote da requisição
    //_params._package  = miles.package;
    // Adiciona o end point da requisição
    _params._service  = _service;

    // Efetua e retorna a requisição
    return this.http.get(miles.api,{
      params:_params,
      responseType:'json'
    });
  }
}