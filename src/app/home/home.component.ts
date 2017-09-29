import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('loginModal') loginModal: ElementRef;
  openModalRef: NgbModalRef;
  public loginFailed = false;
  public email: string;
  public password: string;

  constructor(public authService: AuthService, public modalService: NgbModal, public router: Router) { }

  openLoginModal(): void {
    this.loginFailed = false;
    this.email = '';
    this.password = '';
    this.openModalRef = this.modalService.open(this.loginModal, { windowClass: 'modal-wrapper-sm' });
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    if (this.email === '' || this.password === '') {
      this.loginFailed = true;
      return;
    }
    this.authService.login(this.email, this.password)
      .then(value => {
        this.email = this.password = '';
        this.openModalRef.close();
        this.router.navigate(['./suggestions']);
        this.loginFailed = false;
      }, error => {
        this.loginFailed = true;
      });
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
