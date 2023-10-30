import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-delivery',
  templateUrl: './self-delivery.component.html',
  styleUrls: ['./self-delivery.component.css']
})
export class SelfDeliveryComponent implements OnInit {
  public selectedValue = '';
  constructor() { }

  ngOnInit(): void {
  }

}
