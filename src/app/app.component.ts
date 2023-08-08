import { Component } from '@angular/core';
import { CarService } from './services/car.service';
import { Car } from './models/car'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngApp.UI';
  cars: Car[] = [];

  constructor(private carService: CarService){}

  ngOnInit() : void {
    this.carService
    .getCars()
    .subscribe((result: Car[]) => (this.cars = result));
  }
}
