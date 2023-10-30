import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  constructor(
    public requisicao:RequisicaoService
  ) { }

  all(){
    return this.requisicao.get('website.slider.get');
  }
}