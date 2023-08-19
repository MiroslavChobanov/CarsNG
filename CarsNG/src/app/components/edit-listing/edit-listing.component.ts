import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  car: Car | undefined;
  carForm: FormGroup;
  showSuccessMessage: boolean = false;
  @Output() carsUpdated = new EventEmitter<Car[]>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private fb: FormBuilder
  ) {
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
      place: ['', [Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      description: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit(): void {
    const carIdParam = this.route.snapshot.paramMap.get('id');
    if (carIdParam !== null) {
      const carId = +carIdParam;
      this.carService.getCarDetails(carId).subscribe(car => {
        if (car) {
          this.car = car;
          this.carForm.patchValue(car);
        } else {
          // Handle error or redirect
        }
      });
    } else {
      // Handle error or redirect
    }
  }
  

  onSubmit() {
    if (this.carForm.valid) {
      const updatedCar: Car = { ...this.car, ...this.carForm.value };
      this.carService.updateCar(updatedCar).subscribe(() => {
        this.router.navigate(['/my-cars']);
      });
    }
  }

  deleteCar(car: Car | undefined) {
    if (car) {
      this.carService
        .deleteCar(car)
        .subscribe((cars: Car[]) => this.carsUpdated.emit(cars));
        this.router.navigate(['/my-cars']);
    }
  }
  

  
}
