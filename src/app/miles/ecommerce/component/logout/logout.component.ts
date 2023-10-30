import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    public auth_service:AuthService,
    public router:Router

  ) { }

  ngOnInit(): void {
    this.auth_service.logOut();
    this.router.navigate(['/minhaconta']);
  }
}
