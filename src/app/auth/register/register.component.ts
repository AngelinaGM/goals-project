import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
              private flashMessages: FlashMessagesService,
              private router: Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const user = {
      name: form.value.name,
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    };
    // this.authService.signinUser(email, pass);
    console.log(user);

    this.authService.registerUser(user)
      .subscribe( (res) => {
        if (res.success) {
          this.flashMessages.show('You are now registered and can login', {cssClass: 'alert-success'});
          this.router.navigate(['/login']);
        } else {
          this.flashMessages.show('Something went wrong', {cssClass: 'alert-danger'});
          this.router.navigate(['/register']);
        }
      });
  }

}
