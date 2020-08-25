import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RestService } from './rest.service';

import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CategoryBrowserComponent } from './category-browser/category-browser.component';
import {
  HttpClient,
  HttpHandler,
  HttpClientModule,
} from '@angular/common/http';
import { ThreadBrowserComponent } from './thread-browser/thread-browser.component';

@NgModule({
  declarations: [AppComponent, MainNavComponent, CategoryBrowserComponent, ThreadBrowserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatCardModule,
  ],
  providers: [RestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
