import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { MyCarsComponent } from './components/my-cars/my-cars.component';
import { AuthGuard } from './auth.guard';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit-car', component: EditCarComponent },
  { path: 'car-details/:id', component: CarDetailsComponent },
  { path: 'my-cars', component: MyCarsComponent, canActivate: [AuthGuard] },
  { path: 'add-car', component: AddCarComponent, canActivate: [AuthGuard] },
  { path: 'edit-listing/:id', component: EditListingComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
