import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {GoogleMapsModule} from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import {AuthInterceptor} from './auth.interceptor';
import { ConfigurationComponent } from './configuration/configuration.component';
import { RemoveVehicleComponent } from './remove-vehicle/remove-vehicle.component';
import { InsertVehicleComponent } from './insert-vehicle/insert-vehicle.component';
import { ManualDisplacementComponent } from './manual-displacement/manual-displacement.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ConfigurationComponent,
    RemoveVehicleComponent,
    InsertVehicleComponent,
    ManualDisplacementComponent,
    ManualDisplacementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GoogleMapsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
