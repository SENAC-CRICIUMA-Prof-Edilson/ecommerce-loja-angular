import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/miles/service/local-storage.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {
  @Input() context:string = 'logon';
  public is_auth:boolean = false;
  constructor(
    public local_storage:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.is_auth = this.local_storage.get('_is_auth');
  }
  
}
