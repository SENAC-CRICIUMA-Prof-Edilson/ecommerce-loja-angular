import { Component, OnInit } from '@angular/core';
import { CartService } from './miles/ecommerce/service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(
    public cart_service:CartService
  ){

  }
  ngOnInit(){
    this.cart_service.update();
  }
}