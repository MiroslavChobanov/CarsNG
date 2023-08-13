import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  carDetails: Car | null = null;  
  
  constructor(private route: ActivatedRoute, private carService: CarService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const carId = params['id'];
      console.log('CarDetailsComponent ngOnInit');
      console.log('carId:', carId);
      this.carService.getCarDetails(carId).subscribe({
        next: (car: Car | undefined) => {
          console.log('Car details subscription next:', car);
          if (car) {
            this.carDetails = car;
            console.log('enters the if')
          } else {
            console.log('Car details not found.');
            // Handle the case when car details are not found
          }
        },
        error: (error) => {
          console.error('Error fetching car details:', error);
          // Handle the error if needed
        },
        complete: () => {
          console.log('Car details subscription complete.');
        }
      });
    });
  }
}
