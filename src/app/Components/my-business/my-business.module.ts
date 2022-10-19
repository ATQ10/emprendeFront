import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBusinessRoutingModule } from './my-business-routing.module';
import { RegisterBusinessComponent } from './register-business/register-business.component';
import { InventaryBusinessComponent } from './inventary-business/inventary-business.component';
import { ActivityBusinessComponent } from './activity-business/activity-business.component';
import { ProductsBusinessComponent } from './products-business/products-business.component';
import { FinanceBusinessComponent } from './finance-business/finance-business.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PremiumBusinessComponent } from './premium-business/premium-business.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaypalComponent } from './paypal/paypal.component';

@NgModule({
  declarations: [
    RegisterBusinessComponent,
    InventaryBusinessComponent,
    ActivityBusinessComponent,
    ProductsBusinessComponent,
    FinanceBusinessComponent,
    PremiumBusinessComponent,
    PaypalComponent
  ],
  imports: [
    CommonModule,
    MyBusinessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxPayPalModule
  ]
})
export class MyBusinessModule { }
