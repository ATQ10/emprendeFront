import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MenuAccessComponent } from './Components/menu-access/menu-access.component';
import { HeaderComponent } from './Components/header/header.component';
import { AuthInterceptorService } from 'src/service/intercept/auth-interceptor.service';
import { MyPerfilComponent } from './Components/my-perfil/my-perfil.component';
import { MyBusinessComponent } from './Components/my-business/my-business.component';
import { AllBusinessComponent } from './Components/all-business/all-business.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './Components/footer/footer.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { ProductsComponent } from './Components/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MenuAccessComponent,
    HeaderComponent,
    MyPerfilComponent,
    MyBusinessComponent,
    AllBusinessComponent,
    CarouselComponent,
    FooterComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgxPayPalModule,
    ToastrModule.forRoot()
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }