import { Component } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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

  updateCarList(cars: Car[]) {
    this.cars = cars;
  }

  initNewCar() {
    this.carToEdit = new Car;
  }

  editCar(car: Car){
    this.carToEdit = car;
  }

  get filteredCars(): Car[] {
    if (!this.searchTerm) {
      return this.cars;
    } else {
      return this.cars.filter(car =>
        car.make.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      );
    }
  }

  sortCars(property: string): void {
    if (this.sortColumn === property) {
      this.sortDirection = -this.sortDirection;
    } else {
      this.sortColumn = property;
      this.sortDirection = 1;
    }

    this.cars.sort((a, b) =>
      a[property] > b[property] ? this.sortDirection : -this.sortDirection
    );
  }
}
