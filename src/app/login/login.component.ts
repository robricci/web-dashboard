import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @Output() loggedIn: EventEmitter<any> = new EventEmitter();

  @ViewChild('content') modal: ElementRef;
  private modalReference: NgbModalRef;

  constructor(private modalService: NgbModal,
              private apiService: ApiService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const jwt: string = localStorage.getItem('loggedInUser');
    if (localStorage.getItem('loggedInUser')) {
      this.loggedIn.emit(jwt);
    } else {
      this.open(this.modal);
    }
  }

  open(content) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      size: 'sm',
      ariaLabelledBy: 'modal-basic-title'
    };
    this.modalReference = this.modalService.open(content, ngbModalOptions);
  }

  login(username: string, password: string) {
    this.apiService.login(username, password)
      .subscribe(response => {
          localStorage.setItem('loggedInUser', response.jwt);
          this.modalReference.close();
          this.loggedIn.emit(response.jwt);
        },
        error => {
          console.log(error);
        });
  }
}
