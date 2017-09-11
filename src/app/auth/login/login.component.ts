import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
               private flashMessages: FlashMessagesService,
              private router: Router) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const user = {
      username: form.value.username,
      password: form.value.password
    };

    this.authService.authenticateUser(user)
      .subscribe(res => {
        console.log(res);
        if (res.success) {
          this.authService.storeUserData(res.token, res.user);
          this.flashMessages.show('You are now logged in', {cssClass: 'alert-success'});
          this.router.navigate(['/dashboard']);
          console.log(this.authService.loggedIn());
        } else {
          this.flashMessages.show(res.message, {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['login']);
        }
      });
  }

}
