import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/miles/service/local-storage.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  public username:string = this.localstorage_service.get('_user').nome;
  constructor(
    public localstorage_service:LocalStorageService
  ) { }

  ngOnInit(): void {
  }

}
