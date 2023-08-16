import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AddCarComponent {
  @Input() car?: Car;
  @Output() carsUpdated = new EventEmitter<Car[]>();
  carForm: FormGroup;
  showSuccessMessage: boolean = false;

  constructor(private carService: CarService, private fb: FormBuilder) {
    this.carForm = this.fb.group({
      make: ['', [Validators.required, Validators.minLength(2)]],
      model: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(500)]],
      mileage: [0, [Validators.required, Validators.min(1000)]],
      category: ['', [Validators.required, Validators.minLength(3)]],
      numberOfDoors: [0, [Validators.required, Validators.min(2)]],
      fuelType: ['', [Validators.required, Validators.minLength(3)]],
      yearOfCreation: [0, [Validators.required, Validators.min(1960), Validators.max(new Date().getFullYear())]],
      color: ['', [Validators.minLength(3)]],
      horsepower: [0, [Validators.required, Validators.min(40)]],
      place: ['', [Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      description: ['', [Validators.required, Validators.minLength(20)]]
    });
  }
  
  onSubmit() {
    if (this.carForm.valid) {
      const updatedCar: Car = {
        ...this.car!,
        ...this.carForm.value
      };
        this.createCar(updatedCar);
        this.showSuccessMessage = true;
        this.carForm.reset();
    }
    else{
      this.showSuccessMessage = false;
    }
  }

  createCar(car: Car) {
    this.carService
      .createCar(car)
      .subscribe((cars: Car[]) => this.carsUpdated.emit(cars));
  }
}
