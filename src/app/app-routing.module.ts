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
import { NoLoggedGuard } from 'src/service/guard/no-logged.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate:[LoggedGuard] },
  { path: "register", component: RegisterComponent, canActivate:[LoggedGuard] },
  { path: "header", component: HeaderComponent },
  { path: "myPerfil", component: MyPerfilComponent },
  { path: 'myBusiness', loadChildren: () => import(`./Components/my-business/my-business.module`).then(m => m.MyBusinessModule), canActivate:[NoLoggedGuard]},
  { path: "allBusiness", component: AllBusinessComponent },
  { path: "home", component: MenuAccessComponent},  
  { path: "**", redirectTo: 'home'}  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
