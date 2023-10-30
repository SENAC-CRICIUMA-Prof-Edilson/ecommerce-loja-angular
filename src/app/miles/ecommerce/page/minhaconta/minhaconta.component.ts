import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/miles/service/local-storage.service';

@Component({
  selector: 'app-minhaconta',
  templateUrl: './minhaconta.component.html',
  styleUrls: ['./minhaconta.component.css']
})
export class MinhacontaComponent implements OnInit {
  public is_auth:boolean = false;
  @Input() context:string = '';
  constructor(
    public local_storage:LocalStorageService,
    public router:Router
  ) {
    
  }

  ngOnInit(): void {
    this.is_auth = this.local_storage.get('_is_auth');
  }

  redirectTo(){
    if (this.is_auth) this.router.navigate(['/minhaconta/dados']);
  }

}