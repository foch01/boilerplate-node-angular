import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenPayload} from '../../shared/interfaces/TokenPayload';
import {AuthenticationService} from '../../shared/auth/authentication.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    /*    for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }*/
    const credentials: TokenPayload = {
      email: this.validateForm.value.email,
      password: this.validateForm.value.password
    };
    this.auth.login(credentials).subscribe(() => {
      this.router.navigateByUrl(`/profile`);
    }, (err) => {
      console.error(err);
    });
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
