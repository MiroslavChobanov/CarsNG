import { Component } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Car } from 'src/app/models/car';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomeComponent {
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

  navigateToDetails(carId: number) {
    this.router.navigate(['/car-details', carId]);
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
    }
    if (property === 'yearOfCreation') {
      if (this.sortOrder === 'asc') {
        this.cars.sort((a, b) => a.yearOfCreation - b.yearOfCreation);
      } else {
        this.cars.sort((a, b) => b.yearOfCreation - a.yearOfCreation);
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
    } else if (value === 'oldestYear') {
      this.sortOrder = 'asc';
      this.sort('yearOfCreation');
    } else if (value === 'newestYear') {
      this.sortOrder = 'desc';
      this.sort('yearOfCreation');
    }
    else {
      // Handle default or other sorting options
    }
  }
}
