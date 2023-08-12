import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {
  @Input() car?: Car;
  @Output() carsUpdated = new EventEmitter<Car[]>();

  carForm: FormGroup;

  constructor(private carService: CarService, private fb: FormBuilder) {
    this.carForm = this.fb.group({
      make: ['', [Validators.required, Validators.minLength(2)]],
      model: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(500)]],
      mileage: [0, [Validators.required, Validators.min(1000)]],
      category: ['', [Validators.minLength(3)]],
      numberOfDoors: [0, [Validators.required, Validators.min(2)]],
      fuelType: ['', [Validators.minLength(3)]],
      yearOfCreation: [0, [Validators.required, Validators.min(1960), Validators.max(new Date().getFullYear())]],
      color: ['', [Validators.minLength(3)]],
      horsepower: [0, [Validators.required, Validators.min(40)]],
      place: ['', [Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit(): void {
    if (this.car) {
      this.carForm.patchValue(this.car);
    }
  }

  onSubmit() {
    if (this.carForm.valid) {
      const updatedCar: Car = {
        ...this.car!,
        ...this.carForm.value
      };
  
      if (this.car && this.car.id) {
        this.updateCar(updatedCar);
      } else {
        this.createCar(updatedCar);
      }
    }
  }

  updateCar(car: Car) {
    this.carService.updateCar(car).subscribe(
      (cars: Car[]) => this.carsUpdated.emit(cars),
      error => console.error('Error updating car:', error)
    );
  }

  deleteCar(car: Car) {
    this.carService
      .deleteCar(car)
      .subscribe((cars: Car[]) => this.carsUpdated.emit(cars));
  }

  createCar(car: Car) {
    this.carService
      .createCar(car)
      .subscribe((cars: Car[]) => this.carsUpdated.emit(cars));
  }
}
