import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  token = new FormControl('');
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
  }

  onSubmit(): void {
    this.authService.setToken(this.token.value);
    this.router.navigate(['/']);
  }

}
