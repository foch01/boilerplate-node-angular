import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/auth/authentication.service';
import { Router } from '@angular/router';
import { TokenPayload } from '../../shared/interfaces/TokenPayload';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',

  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
/*    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }*/
    console.log(this.validateForm.value);

    const credentials: TokenPayload = {
      email: this.validateForm.value.email,
      password: this.validateForm.value.password
    };

    this.auth.register(credentials).subscribe(() => {
      this.router.navigateByUrl(`/profile`);
    }, (err) => {
      console.error(err);
    });
  }

  updateConfirmValidator(): void {
/*    /!** wait for refresh value *!/
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());*/
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
