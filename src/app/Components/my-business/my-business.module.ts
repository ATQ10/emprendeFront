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


@NgModule({
  declarations: [
    RegisterBusinessComponent,
    InventaryBusinessComponent,
    ActivityBusinessComponent,
    ProductsBusinessComponent,
    FinanceBusinessComponent
  ],
  imports: [
    CommonModule,
    MyBusinessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class MyBusinessModule { }
