import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginDto } from 'src/app/Dto/login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailveryfy = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  password: string;
  email: string;

  getErrorMessage() {
    return this.emailveryfy.hasError('required') ? 'You must enter a value' :
        this.emailveryfy.hasError('email') ? 'Not a valid email' :
            '';
  }
  
  constructor(private authService: AuthService,) { }

  ngOnInit() {
  }
  doLogin() {
    const loginDto = new LoginDto(this.email, this.password);
    this.authService.login(loginDto).subscribe(loginResp => {
      console.log(loginResp);
      this.authService.setLoginData(loginResp);
    }, error => {
  console.log('Error en petición de login');
  console.log(error);
}
);
}
}
