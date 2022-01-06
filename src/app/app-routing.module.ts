import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { SignupComponent } from './components/signup/signup.component';
import { EgitimdetayComponent } from './components/egitimdetay/egitimdetay.component';
import { FavoriteeducationComponent } from './components/favoriteeducation/favoriteeducation.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const redirectLogin = () => redirectUnauthorizedTo(['giris']);
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  {
    path: 'favori-egitimlerim',
    component: FavoriteeducationComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  {
    path: 'sepet',
    component: ShoppingcartComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  { path: 'kaydol', component: SignupComponent },
  { path: 'giris', component: LoginComponent },
  { path: 'egitim-detay/:key', component: EgitimdetayComponent },
  { path: '**', redirectTo: "", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }