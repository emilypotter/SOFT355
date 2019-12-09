import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, public toastr: ToastrService) { }

  ngOnInit() {
  }

  public logout() {
    this.authService.logout();
    this.toastr.success('Successfully Logged Out', 'Success');
  }

}
