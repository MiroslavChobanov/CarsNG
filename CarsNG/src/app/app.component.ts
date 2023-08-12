import { Component } from '@angular/core';
import { CarService } from './services/car.service';
import { Car } from './models/car'
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngApp.UI';
  cars: Car[] = [];
  carToEdit?: Car;
  user = new User();
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: number = 1;

  constructor(private carService: CarService, private authService: AuthService){}

  ngOnInit() : void {
    this.carService
    .getCars()
    .subscribe((result: Car[]) => (this.cars = result));

  }

}
