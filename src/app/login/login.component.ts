import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../services/api.service';
import {SessionResponse} from '../dto/SessionResponse';

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
    if (jwt) {
      this.apiService.validateSession(jwt).subscribe((response: SessionResponse) => {
        if (response.authenticated) {
          this.loggedIn.emit(jwt);
        } else {
          this.openModal();
        }
        },
        error => {
          this.openModal();
        });
    } else {
      this.openModal();
    }
  }

  private openModal() {
    localStorage.clear();
    const ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      size: 'sm',
      ariaLabelledBy: 'modal-basic-title'
    };
    this.modalReference = this.modalService.open(this.modal, ngbModalOptions);
  }

  login(username: string, password: string, event: Event) {
    event.preventDefault();
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
