import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SliderService } from 'src/app/miles/ecommerce/service/slider.service';

declare var $:any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit,AfterViewInit {

  public data:Array<any> = [];
  constructor(
	public slider:SliderService
  ) { }

  ngOnInit(): void {
    this.slider.all().subscribe(
      (res:any) => {
        this.data = res.data;
      }
    );
  }

  ngAfterViewInit(): void {
    $('.carousel').carousel();
  }
}