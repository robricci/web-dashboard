import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('content') modal: ElementRef;
  private modalReference: NgbModalRef;

  markers: Array<any> = [];
  center = {
    lat: 45.757430,
    lng: 4.840735
  };

  constructor(private modalService: NgbModal,
              private apiService: ApiService) {}

  ngOnInit(): void {
    this.markers.push({
      position: {
        lat: 45.6196233 + ((Math.random() - 0.5) * 2) / 10,
        lng: 4.6848782 + ((Math.random() - 0.5) * 2) / 10,
      },
      /*label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.DROP },*/
    });
  }

  ngAfterViewInit(): void {
    this.open(this.modal);
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
          this.apiService.routes().subscribe(res => {
              console.log(res);
            },
            error => {
              console.log(error);
            });
        },
        error => {
          console.log(error);
        });
  }
}
