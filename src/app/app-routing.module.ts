import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HeaderComponent } from './Components/header/header.component';
import { MenuAccessComponent } from './Components/menu-access/menu-access.component';
import { MyPerfilComponent } from './Components/my-perfil/my-perfil.component';
import { LoggedGuard } from 'src/service/guard/logged.guard';
import { MyBusinessComponent } from './Components/my-business/my-business.component';
import { AllBusinessComponent } from './Components/all-business/all-business.component';

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate:[LoggedGuard], pathMatch: "full" },
  { path: "register", component: RegisterComponent, canActivate:[LoggedGuard], pathMatch: "full" },
  { path: "header", component: HeaderComponent, pathMatch: "full" },
  { path: "myPerfil", component: MyPerfilComponent, pathMatch: "full" },
  { path: "", component: MenuAccessComponent, pathMatch: "full" },
  { path: "myBusiness", component: MyBusinessComponent, pathMatch: "full" },
  { path: "allBusiness", component: AllBusinessComponent, pathMatch: "full" },
  { path: "", component: MenuAccessComponent, pathMatch: "full" }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
