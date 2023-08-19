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
      this.carService.getCarDetails(carId).subscribe({
        next: (car: Car | undefined) => {
          if (car) {
            this.carDetails = car;
          } else {
            console.log('Car details not found.');
          }
        },
        error: (error) => {
          console.error('Error fetching car details:', error);
        },
        complete: () => {
          console.log('Car details subscription complete.');
        }
      });
    });
  }
}
