import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessGuard } from 'src/service/guard/business.guard';
import { ActivityBusinessComponent } from './activity-business/activity-business.component';
import { FinanceBusinessComponent } from './finance-business/finance-business.component';
import { InventaryBusinessComponent } from './inventary-business/inventary-business.component';
import { MyBusinessComponent } from './my-business.component';
import { PremiumBusinessComponent } from './premium-business/premium-business.component';
import { ProductsBusinessComponent } from './products-business/products-business.component';
import { RegisterBusinessComponent } from './register-business/register-business.component';

const routes: Routes = [
  {
    path: '',component:MyBusinessComponent, 
    children: [
      {
        path: 'register', component: RegisterBusinessComponent
      },
      {
        path: 'inventary', component: InventaryBusinessComponent, canActivate:[BusinessGuard] 
      },
      {
        path: 'activity', component: ActivityBusinessComponent
      },
      {
        path: 'finance', component: FinanceBusinessComponent, canActivate:[BusinessGuard] 
      },
      {
        path: 'products', component: ProductsBusinessComponent, canActivate:[BusinessGuard] 
      },
      {
        path: 'premium', component: PremiumBusinessComponent, canActivate:[BusinessGuard] 
      },
      { 
        path: '**', redirectTo: 'register'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyBusinessRoutingModule { }
