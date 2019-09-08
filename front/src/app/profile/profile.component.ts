import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../shared/auth/authentication.service';
import {UserDetails} from '../shared/interfaces/UserDetails';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   details: UserDetails;
  constructor(private auth: AuthenticationService) {}

  async ngOnInit(): void {
    this.auth.profile().subscribe( (user) => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
    console.log(this.details);
  }
}
