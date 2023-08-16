import { Component } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Car } from 'src/app/models/car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.css']
})
export class MyCarsComponent {
  title = 'AngApp.UI';
  cars: Car[] = [];
  carToEdit?: Car;
  user = new User();
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: number = 1;
  sortOrder = 'asc';

  constructor(private carService: CarService, private authService: AuthService, private router: Router){}

  ngOnInit() : void {
    this.carService
    .getCars()
    .subscribe((result: Car[]) => (this.cars = result));

  }
  updateCarList(cars: Car[]) {
    this.cars = cars;
    console.log(cars);
  }

  initNewCar() {
    this.carToEdit = new Car;
  }
  

  editCar(car: Car) {
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

  sort(property: string) {
    if (property === 'price') {
      if (this.sortOrder === 'asc') {
        this.cars.sort((a, b) => a.price - b.price);
      } else {
        this.cars.sort((a, b) => b.price - a.price);
      }
    } else {
      // Handle other properties for sorting
    }
  }

  onSortChange(value: string) {
    if (value === 'lowestPrice') {
      this.sortOrder = 'asc';
      this.sort('price');
    } else if (value === 'highestPrice') {
      this.sortOrder = 'desc';
      this.sort('price');
    } else {
      // Handle default or other sorting options
    }
  }
}
