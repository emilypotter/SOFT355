import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(private validateService: ValidateService, private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

   public onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // required fields
    if (!this.validateService.validateRegister(user)) {
      return false;
    }

    // validate email
    if (!this.validateService.validateEmail(user.email)) {
      return false;
    }

    // // register user
    this.authService.registerUser(user).subscribe(() => {
      this.flashMessage.show('Registration successful', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['']);
    }, error => {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
      console.log(error);
    });

    // NEXT: flash messages and navigation not working

    // this.authService.registerUser(user).subscribe((data: any) => {
    //   if (data.success) {
    //     this.router.navigate(['/#']);
    //   } else {
    //     this.router.navigate(['/register']);
    //   }
    // });

  }
}
